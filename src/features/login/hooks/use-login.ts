import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "@/services/http/auth";
import { LoginRequest } from "@/services/http/types/auth";
export function useLogin() {
  const navigate = useNavigate();
  const form = useForm<LoginRequest>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return { form, mutate, isPending };
}
