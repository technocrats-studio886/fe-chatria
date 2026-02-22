import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Link, useNavigate } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { registerUser } from "@/api/authApi"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate({from: "/signup"});
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    identity_card: null as File | null,
    loading: false,
    error: [] as string[],  
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, loading: true }));
    try {
      if (values.identity_card) {
        const data = await registerUser(values.username, values.fullname, values.email, values.identity_card);
        if (data.message) {
          navigate({
            to: "/otp?email=" + values.email
          });
        }
      } else {
        setValues((prev) => ({ ...prev, error: ["Identity card is required"] }));
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      setValues((prev) => ({ ...prev, error: [error.message || "Registration failed"] }));
    } finally {
      setValues((prev) => ({ ...prev, loading: false }));
    }
  };
  return (
    <div className="flex flex-col gap-6 w-1/4 max-md:w-full" {...props}>
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input value={values.fullname} onChange={(e) => setValues((prev) => ({ ...prev, fullname: e.target.value }))} name="fullname" id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input value={values.username} onChange={(e) => setValues((prev) => ({ ...prev, username: e.target.value }))} name="username" id="username" type="text" placeholder="johndoe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="identity_card">Identity Card</FieldLabel>
              <Input value={values.identity_card ? undefined : ""} onChange={(e) => setValues((prev) => ({ ...prev, identity_card: e.target.files ? e.target.files[0] : null }))} name="identity_card" id="identity_card" type="file" accept="image/*" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                value={values.email}
                onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {values.loading ? (
                  <Button disabled>Creating Account...</Button>
                ) : (
                  <Button type="submit">Create Account</Button>
                )}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
