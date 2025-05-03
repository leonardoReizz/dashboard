import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { authService } from "@/services/http/auth";
import { LoginRequest } from "@/services/http/types/auth";

export function useLogin() {
  const form = useForm<LoginRequest>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });

  return { form, mutate, isPending };
}
