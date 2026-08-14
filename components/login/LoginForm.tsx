"use client"
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/form/InputField';
import { useLogin } from '@/features/auth/useLogin';
import { LoginData } from '@/types/auth';
import { LoginFormProps } from '@/types/form-props';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export const LoginForm = ({
    onSuccess,
}: LoginFormProps) => {
    const login = useLogin({ onSuccess });

    const { register, handleSubmit, formState } = useForm<LoginData>();

    const onSubmit = (data: LoginData) => {
        login.submit(data);
    };

    return (
        <div className="w-full mx-auto">
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Admin Login
                </h1>
                <p className="text-sm xxs:text-base mt-1 text-slate-500 md:text-lg font-medium">
                     Please enter your email address or <br /> username and password to continue
                </p>
            </div>

            <form className="mt-7 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    label="Email Address"
                    placeholder="johndebby@email.com"
                    compulsory={true}
                    type="email"
                    icon={<Mail size={18} color={"#FE4F04"} />}
                    {...register('email')}
                    error={formState.errors['email']}
                />

                <InputField
                    label="Password"
                    type="password"
                    compulsory={true}
                    icon={<Lock size={18} color={"#FE4F04"} />}
                    placeholder="***************"
                    {...register('password', {
                        required: 'Password field cannot be empty',
                    })}
                    error={formState.errors['password']}
                />

                <div className="flex justify-end items-center">

                    <div className="flex items-center">
                        <Link href="/forgot-password " className="ml-2 text-sm text-orange-600 hover:text-red-600 cursor-pointer">
                            Forgot Password ?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        isLoading={login.isPending}
                        isDisabled={login.isPending}
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form >
        </div>
    );
};