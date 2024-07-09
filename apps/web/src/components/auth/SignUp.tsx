import { useMutation } from "@apollo/client";
import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";

import { CREATE_USER } from "@/http/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInProps {
  setShowSignUp: () => void;
}

export const SignUp: React.FC<Readonly<SignInProps>> = ({ setShowSignUp }: { setShowSignUp: () => void }) => {
  const { signUp, isLoaded } = useSignUp();

  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createUser] = useMutation(CREATE_USER);

  if (!isLoaded) {
    return null;
  }

  const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const code = form.code?.value;

    if (!code) {
      setError("Verification code is required");
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log(result);
      if (result.status === "complete") {
        console.log("Sign up successful");
        createUser({
          variables: {
            input: {
              name: result.username as string,
              email: result.emailAddress as string,
            },
          },
        }).then(() => {
          window.location.reload();
        });
      } else {
        setError("Error during sign up");
      }
    } catch (err) {
      console.error("Error during sign up", err);
      // @ts-ignore
      if (err?.errors instanceof Array) {
        // @ts-ignore
        setError(err.errors[0].message);
      } else {
        setError("An error occurred while sending the verification code");
      }
    }
  };

  const handleSubmitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const email = form.email?.value;
    const username = form.firstName?.value;
    const password = form.password?.value;

    if (!email || !username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        username,
        password,
      });
      await signUp.prepareEmailAddressVerification();
      setVerificationInProgress(true);
    } catch (err: unknown) {
      console.error("Error sending verification code", err);
      // @ts-ignore
      if (err?.errors instanceof Array) {
        // @ts-ignore
        setError(err.errors[0].message);
      } else {
        setError("An error occurred while sending the verification code");
      }
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground">Enter your email below to create your account</p>
      </div>
      <form onSubmit={(e) => (verificationInProgress ? handleSubmitCode(e) : handleSubmitUser(e))}>
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
                <Label htmlFor="firstName">Name</Label>
                <Input id="firstName" type="text" name="firstName" placeholder="jibber" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </>
          )}
          {error && <div className="text-red-500">{error}</div>}
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
};
