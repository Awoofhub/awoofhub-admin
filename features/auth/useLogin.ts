"use client"
import { loginService } from '@/services/auth-service';
import { LoginData, LoginResponse } from '@/types/auth';
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const result = await loginService(data);
  return result.data;
};

type UseLoginOptions = {
  onSuccess?: (user: User) => void;
};

export const useLogin = ({ onSuccess }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending, isError, error} = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data.user);
      onSuccess?.(data.user);
    },
  });

  return { submit, isPending, isError, error};
};
