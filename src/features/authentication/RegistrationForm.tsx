// import { Label } from "@radix-ui/react-label";
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
// import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import type { RegistrationFormSchema } from "./registrationSchema";
import RegistrationFields from "./RegistrationFields";
import { useSignup } from "./useSignup";

const RegistrationForm = () => {
  const { signup } = useSignup();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormSchema>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegistrationFormSchema) => {
    signup({ ...data });
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your own account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login-page")}
            >
              Sign In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RegistrationFields />
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full mt-4">
                Create an account
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationForm;
