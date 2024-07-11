import { GetMeQuery } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";

import { GET_ME } from "@/http/user";

type AuthGuardProps<T extends object> = {
  render: React.FC<{ user: GetMeQuery["getMe"] } & T>;
  props?: T;
};

export const AuthGuard = <T extends object>({ render: InnerComponent, props }: Readonly<AuthGuardProps<T>>) => {
  const { data: me, loading } = useQuery(GET_ME);

  const [showSignUp, setShowSignUp] = useState(false);

  if (loading) return null;

  if (!me) {
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
        <div className="hidden bg-muted lg:block overflow-hidden">
          <Image
            src="/splash.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    );
  }

  return <InnerComponent user={me.getMe} {...(props as T)} />;
};
