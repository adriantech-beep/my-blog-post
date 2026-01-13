import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user: data, isAuthenticated: data ? true : false };
}
