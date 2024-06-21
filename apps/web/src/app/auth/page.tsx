import { useSignIn } from "@clerk/clerk-react";

export default function SignInStep() {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) {
    // Add logic to handle loading state
    return null;
  }

  return <div>The current sign in attempt status is {signIn.status}.</div>;
}