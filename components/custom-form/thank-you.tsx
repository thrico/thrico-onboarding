import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <Card className="bg-green-50 border-green-200 text-center">
      <CardContent className="pt-8 pb-8">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-700 mb-2">Thank You!</h1>
          <p className="text-lg text-green-600 max-w-xl mx-auto">
            We've received your request. Our sales team will review your
            requirements and contact you within 24 hours.
          </p>
        </div>

        <Card className="bg-background text-left mb-8 max-w-xl mx-auto">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">What happens next:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  Our enterprise specialist will review your requirements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  We'll prepare a custom proposal tailored to your needs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Schedule a demo and technical discussion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  Provide detailed pricing and implementation timeline
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
