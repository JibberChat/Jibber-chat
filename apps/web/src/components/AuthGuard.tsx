import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useState } from "react";

import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";

type AuthGuardsProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardsProps) => {
  const { user } = useUser();
  const [showSignUp, setShowSignUp] = useState(false);

  if (!user) {
    return (
      <div className="w-full h-screen overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            {showSignUp ? (
              <SignUp setShowSignUp={() => setShowSignUp(false)} />
            ) : (
              <SignIn setShowSignUp={() => setShowSignUp(true)} />
            )}
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
