import { useSignIn } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInProps {
  setShowSignUp: () => void;
}

export const SignIn: React.FC<Readonly<SignInProps>> = ({ setShowSignUp }) => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn.create({
        identifier: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });
      if (result.status === "complete") {
        console.log("Sign in successful");
        window.location.reload();
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error("Error during sign in", err);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="jibber@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <p>Don&apos;t have an account?</p>
        <button className="underline" onClick={setShowSignUp}>
          Sign up
        </button>
      </div>
    </>
  );
};
