/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "@/services/category-service";
import { notificationsStore } from "@/store/notifications/notifications";

export const useCategoryMutations = () => {
  const queryClient = useQueryClient();

  const onSuccess = (message: string) => {
    notificationsStore
      .getState()
      .showNotification({
        type: "success",
        title: "Success",
        duration: 3000,
        message,
      });
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
  };

  const onError = (error: any) => {
    notificationsStore
      .getState()
      .showNotification({
        type: "error",
        title: "Error",
        duration: 5000,
        message: error?.message || "Operation failed.",
      });
  };

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategoryService(name),
    onSuccess: () => onSuccess("Category created successfully."),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategoryService(id, name),
    onSuccess: () => onSuccess("Category updated successfully."),
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategoryService(id),
    onSuccess: () => onSuccess("Category deleted successfully."),
    onError,
  });

  return {
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
