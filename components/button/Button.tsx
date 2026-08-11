import { Button as ChakraButton } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';

const variants = {
  solid: "cursor-pointer w-full mx-auto flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm xs:text-base font-medium text-white bg-orange-600 hover:bg-orange-3  Q00 active:scale-[0.98] transition-all",
  outline: "cursor-pointer w-full mx-auto flex items-center justify-center gap-3 py-2.5 px-4 border border-orange-600 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm",
};

export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof typeof variants;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string; // optional extra Tailwind classes
};

export const Button = ({
  variant = 'solid',
  type = 'button',
  children,
  className = "font-roboto",
  ...props
}: ButtonProps) => {
  return (
    <ChakraButton
      {...props}
      type={type}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </ChakraButton>
  );
};