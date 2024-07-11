import { GetMeQuery } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";

import { GET_ME } from "@/http/user";

// Define the type for props that AuthGuard accepts
type AuthGuardProps<T extends object> = {
  render: React.FC<{ user: GetMeQuery["getMe"] } & T>; // The render prop accepts user and additional props T
  props?: T; // Optional props of type T
};

// Component definition for AuthGuard
const AuthGuard = <T extends object>({ render: InnerComponent, props }: AuthGuardProps<T>): JSX.Element => {
  const { data: me, loading } = useQuery<GetMeQuery>(GET_ME); // Use useQuery with GetMeQuery type

  const [showSignUp, setShowSignUp] = useState(false);

  if (loading) return <div>Loading...</div>; // Return loading indicator while fetching data

  // If user is not authenticated (me is falsy or me.getMe is falsy)
  if (!me?.getMe) {
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

  // If user is authenticated, render InnerComponent with user and props
  return <InnerComponent user={me.getMe} {...(props as T)} />;
};

export default AuthGuard;
