import { AuroraBackground } from "@/components/global/aurora-background";
import { SignUpForm } from "@/components/sign-up/sign-up-form";
import { Button } from "@/components/ui/button";
import { ChromeIcon, FacebookIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  return (
    <AuroraBackground>
      <section className="flex min-h-[100dvh] items-center justify-center px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-lg space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Creat your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                className="font-medium text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"
                href="/sign-in"
              >
                sign in
              </Link>
            </p>
          </div>
          <SignUpForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <Button className="w-full" variant="outline">
                  <ChromeIcon className="h-5 w-5" />
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </div>
              <div>
                <Button className="w-full" variant="outline">
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Sign up with Facebook</span>
                </Button>
              </div>
              <div>
                <Button className="w-full" variant="outline">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Sign up with Twitter</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
};

export default SignUp;
