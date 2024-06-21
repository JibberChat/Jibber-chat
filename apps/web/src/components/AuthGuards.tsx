import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";

type AuthGuardsProps = {
  children: React.ReactNode;
};

export const AuthGuards = ({ children }: AuthGuardsProps) => {
  const { user } = useUser();
  const [showSignUp, setShowSignUp] = useState(false);

  if (!user) {
    return (
      <>
        {showSignUp ? <SignUp /> : <SignIn />}
        <div className="mt-4 text-center text-sm">
          {showSignUp ? (
            <>
              Already have an account?{" "}
              <button className="underline" onClick={() => setShowSignUp(false)}>
                Sign in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button className="underline" onClick={() => setShowSignUp(true)}>
                Sign up
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  return <>{children}</>;
};
