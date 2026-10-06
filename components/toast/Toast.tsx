'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

const toastVariants: Record<ToastType,  (message: string) => void> = {
  info: toast.info,
  success: toast.success,
  warning: toast.warning,
  error: toast.error,
};

export const showToast = (type: ToastType, message: string) => {
  toastVariants[type](message);
};

export const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      newestOnTop
      draggable
    />
  );
};