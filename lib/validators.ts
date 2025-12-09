// Input validation and sanitization utilities

export interface FormSubmissionData {
  teamRequirements: {
    memberSize: string;
    currentSolution: string;
    painPoints: string[];
    communityOnboarding: string;
  };
  features: {
    features: string[];
  };
  timeLine: {
    budget: string;
    timeline: string;
    decisionMakers: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    contactMethod: string;
  };
  security: {
    technicalRequirements: string;
    additionalInfo: string;
    referral: string;
  };
}

// Sanitize string input to prevent XSS
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, 1000) // Limit length
    .replace(/[<>]/g, ""); // Remove potential HTML tags
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone number (basic validation)
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;
  return phoneRegex.test(phone);
}

// Validate the entire form submission
export function validateFormSubmission(data: unknown): {
  valid: boolean;
  errors: string[];
  sanitizedData?: FormSubmissionData;
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const formData = data as Record<string, unknown>;

  // Validate teamRequirements
  if (
    !formData.teamRequirements ||
    typeof formData.teamRequirements !== "object"
  ) {
    errors.push("Team requirements are required");
  } else {
    const tr = formData.teamRequirements as Record<string, unknown>;
    if (!tr.memberSize) errors.push("Member size is required");
    if (!tr.currentSolution) errors.push("Current solution is required");
  }

  // Validate features
  if (!formData.features || typeof formData.features !== "object") {
    errors.push("Features are required");
  }

  // Validate timeLine
  if (!formData.timeLine || typeof formData.timeLine !== "object") {
    errors.push("Timeline information is required");
  } else {
    const tl = formData.timeLine as Record<string, unknown>;
    if (!tl.budget) errors.push("Budget is required");
    if (!tl.timeline) errors.push("Timeline is required");
  }

  // Validate contact
  if (!formData.contact || typeof formData.contact !== "object") {
    errors.push("Contact information is required");
  } else {
    const contact = formData.contact as Record<string, unknown>;
    if (!contact.firstName) errors.push("First name is required");
    if (!contact.lastName) errors.push("Last name is required");
    if (!contact.email) {
      errors.push("Email is required");
    } else if (!isValidEmail(contact.email as string)) {
      errors.push("Invalid email format");
    }
    if (!contact.jobTitle) errors.push("Job title is required");
    if (contact.phone && !isValidPhone(contact.phone as string)) {
      errors.push("Invalid phone number format");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize and return data
  const tr = formData.teamRequirements as Record<string, unknown>;
  const ft = formData.features as Record<string, unknown>;
  const tl = formData.timeLine as Record<string, unknown>;
  const ct = formData.contact as Record<string, unknown>;
  const sc = (formData.security as Record<string, unknown>) || {};

  const sanitizedData: FormSubmissionData = {
    teamRequirements: {
      memberSize: sanitizeString(tr.memberSize as string),
      currentSolution: sanitizeString(tr.currentSolution as string),
      painPoints: Array.isArray(tr.painPoints)
        ? tr.painPoints.map((p) => sanitizeString(String(p))).slice(0, 20)
        : [],
      communityOnboarding: sanitizeString(tr.communityOnboarding as string),
    },
    features: {
      features: Array.isArray(ft.features)
        ? ft.features.map((f) => sanitizeString(String(f))).slice(0, 50)
        : [],
    },
    timeLine: {
      budget: sanitizeString(tl.budget as string),
      timeline: sanitizeString(tl.timeline as string),
      decisionMakers: sanitizeString(tl.decisionMakers as string),
    },
    contact: {
      firstName: sanitizeString(ct.firstName as string),
      lastName: sanitizeString(ct.lastName as string),
      email: sanitizeString(ct.email as string).toLowerCase(),
      phone: sanitizeString(ct.phone as string),
      jobTitle: sanitizeString(ct.jobTitle as string),
      contactMethod: sanitizeString(ct.contactMethod as string) || "email",
    },
    security: {
      technicalRequirements: sanitizeString(
        (sc.technicalRequirements as string) || ""
      ),
      additionalInfo: sanitizeString((sc.additionalInfo as string) || ""),
      referral: sanitizeString((sc.referral as string) || ""),
    },
  };

  return { valid: true, errors: [], sanitizedData };
}
