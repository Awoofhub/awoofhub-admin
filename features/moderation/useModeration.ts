"use client"
import ModerationService from '@/services/moderation-service';
import { CreateModerationData, Moderation } from '@/types/moderation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const moderation = async (data: CreateModerationData): Promise<Moderation> => {
  const result = await ModerationService.create(data);
  return result.data;
};

type UseModerationOptions = {
  onSuccess?: (moderation: Moderation) => void;
};

export const useModeration = ({ onSuccess }: UseModerationOptions = {}) => {
  
  const queryClient = useQueryClient();

  const { mutate: submit, isPending, reset } = useMutation({
    mutationFn: moderation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.(data);
    },
  });

  return { submit, isPending, reset };
};