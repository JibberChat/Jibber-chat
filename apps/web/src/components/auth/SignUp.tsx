import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUp({ setShowSignUp }: { setShowSignUp: () => void }) {
  const { signUp, isLoaded } = useSignUp();
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verificationInProgress) {
      // Verify the code and create the user account
      try {
        const result = await signUp.attemptEmailAddressVerification({
          code: e.currentTarget.code.value,
        });
        console.log(result);
        if (result.status === "complete") {
          console.log("Sign up successful");
          window.location.reload();
        } else {
          console.error("Error during sign up", result);
        }
      } catch (err) {
        console.error("Error during sign up", err);
      }
    } else {
      try {
        await signUp.create({
          emailAddress: e.currentTarget.email.value,
          firstName: e.currentTarget.firstName.value,
          password: e.currentTarget.password.value,
        });
        await signUp.prepareEmailAddressVerification();
        setVerificationInProgress(true);
      } catch (err) {
        console.error("Error sending verification code", err);
      }
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {verificationInProgress ? (
            <div className="grid gap-2">
              <Label htmlFor="code">Verification code</Label>
              <Input id="code" name="code" type="text" placeholder="Enter verification code" required />
            </div>
          ) : (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="jibber@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstname">Name</Label>
                <Input id="firstname" type="firstname" name="firstname" placeholder="jibber" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </>
          )}
          <Button type="submit" className="w-full">
            {verificationInProgress ? "Verify code" : "Sign up"}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <p>Already have an account?</p>
        <button className="underline" onClick={setShowSignUp}>
          Sign in
        </button>
      </div>
    </>
  );
}
