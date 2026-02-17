import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
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
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { loginUser } from "@/api/authApi"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate({from: "/login"});
  const [values, setValues] = useState({
    username: "",
    loading: false,
    error: [] as string[],
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setValues((prev) => ({ ...prev, loading: true }));
    try {
      const data = await loginUser(values.username);
      if (data.message ) {
        
        navigate({
          to: "/otp?email=" + values.username
        });
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setValues((prev) => ({ ...prev, error: [error.message || "Login failed"] }));
    }
    finally {
      setValues((prev) => ({ ...prev, loading: false }));
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className={cn("flex flex-col gap-6 w-1/4 max-md:w-full ", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                {values.loading ? (
                  <Button disabled>Loading...</Button>
                ) : (
                  <Button type="submit">Login</Button>
                )}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
