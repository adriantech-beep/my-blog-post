import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Login successful!");
      queryClient.setQueryData(["user"], data);
      navigate("/all-posts", { replace: true });
    },
    onError: (error) => {
      toast.error("Login failed. Please check your email and password.");
      console.error("Login failed:", error);
    },
  });

  return { login, isPending };
}
