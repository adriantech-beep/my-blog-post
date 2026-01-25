import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import LoginFields from "./LoginFields";
import { FormProvider, useForm } from "react-hook-form";
import type { LoginFormSchema } from "./loginSchema";
import { useLogin } from "./useLogin";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useLogin();

  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    login({ ...data });
  };
  return (
    <FormProvider {...form}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => navigate("/registration-page")}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <LoginFields />
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full mt-4">
                Login to your account
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationForm;
