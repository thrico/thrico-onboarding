import CustomRequestForm from "@/components/custom-form/custom-request-form";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="https://thrico.com"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/thrico-logo.svg" alt="Thrico" className="h-20 w-40" />
          </a>
          {/* Centered Card */}
          {/* <div className="flex-1 flex justify-center">
            <Card className="bg-background border-0 shadow-none text-center">
              <CardContent className="pt-6 pb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  Your Community. Your Space.
                  <br />
                  Launching Soon.
                </h2>
                <p className="text-blue-600 italic text-lg flex justify-center items-center">
                  <span className="mx-auto text-sm md:text-base">
                    Signup for early access.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div> */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="https://thrico.com/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Products
            </a>
            <a
              href="https://thrico.com/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Solutions
            </a>
            <a
              href="https://thrico.com/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="https://thrico.com/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Resources
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <CustomRequestForm />
        </div>
      </main>

      <footer className="border-t bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025{" "}
            <a href="https://thrico.com" className="hover:text-foreground">
              Thrico
            </a>
            . All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
