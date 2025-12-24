import { type NextRequest, NextResponse } from "next/server";
import { rateLimit, generateFingerprint } from "@/lib/rate-limit";
import { validateFormSubmission } from "@/lib/validators";

// Rate limit configuration: 5 requests per minute per IP
const RATE_LIMIT_CONFIG = {
  windowMs: 60000, // 1 minute
  maxRequests: 5,
};

// Honeypot field names that bots might fill
const HONEYPOT_FIELDS = ["website", "url", "company_website"];

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const fingerprint = generateFingerprint(request.headers);
    const identifier = `${ip}-${fingerprint}`;

    // Check rate limit
    const rateLimitResult = rateLimit(identifier, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": RATE_LIMIT_CONFIG.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(
              rateLimitResult.resetIn / 1000
            ).toString(),
            "Retry-After": Math.ceil(rateLimitResult.resetIn / 1000).toString(),
          },
        }
      );
    }

    // Parse request body with size limit check
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number.parseInt(contentLength) > 50000) {
      return NextResponse.json(
        { success: false, error: "Request too large" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 }
      );
    }

    // Check for honeypot fields (bot detection)
    if (typeof body === "object" && body !== null) {
      const bodyObj = body as Record<string, unknown>;
      for (const field of HONEYPOT_FIELDS) {
        if (bodyObj[field]) {
          // Silently reject - don't let bots know they've been caught
          return NextResponse.json({
            success: true,
            message: "Submission received",
          });
        }
      }
    }

    // Validate and sanitize the form data
    const validation = validateFormSubmission(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Forward the validated data to the external API
    try {
      const externalRes = await fetch(
        "https://nysr255hb3.execute-api.ap-south-1.amazonaws.com/prod/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.sanitizedData),
        }
      );
      const externalData = await externalRes.json();
      return NextResponse.json(
        {
          success: externalRes.ok,
          external: externalData,
          message: externalRes.ok
            ? "Your plan request has been submitted successfully. Our team will contact you within 24-48 hours."
            : "There was an error submitting your request to the external service.",
        },
        {
          status: externalRes.ok ? 200 : 502,
          headers: {
            "X-RateLimit-Limit": RATE_LIMIT_CONFIG.maxRequests.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": Math.ceil(
              rateLimitResult.resetIn / 1000
            ).toString(),
          },
        }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to forward request to external API.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Error processing custom request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Block other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
