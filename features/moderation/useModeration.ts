"use client"
import ModerationService from '@/services/moderation-service';
import { CreateModerationData, Moderation } from '@/types/moderation';
import { useMutation } from '@tanstack/react-query';

export const moderation = async (data: CreateModerationData): Promise<Moderation> => {
  const result = await ModerationService.create(data);
  return result.data;
};

type UseModerationOptions = {
  onSuccess?: (moderation: Moderation) => void;
};

export const useModeration = ({ onSuccess }: UseModerationOptions = {}) => {
    
  const { mutate: submit, isPending } = useMutation({
    mutationFn: moderation,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return { submit, isPending};
};
