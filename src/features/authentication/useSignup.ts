import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({
      userName,
      email,
      password,
    }: {
      userName: string;
      email: string;
      password: string;
    }) => signupApi({ userName, email, password }),
    onSuccess: (data) => {
      navigate("/all-posts", { replace: true });
      queryClient.setQueryData(["user"], data);
      toast.success("Signup successful");
    },
    onError: (error) => {
      toast.error("Signup failed. Please try again.");
      console.error("Signup failed:", error);
    },
  });
  return { signup, isPending };
}
