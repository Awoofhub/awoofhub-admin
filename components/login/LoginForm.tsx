"use client"
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/form/InputField';
import { useLogin } from '@/features/auth/useLogin';
import { LoginData } from '@/types/auth';
import { LoginFormProps } from '@/types/form-props';
import {  Lock, Mail } from 'lucide-react';
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
        <div className="relative z-10 mx-auto w-full">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Admin Login
                </h1>
                <p className="mx-auto mt-4 max-w-xl md:max-w-[636px] md:text-2xl font-medium text-center  font-montserrat text-base leading-relaxed text-slate-500 sm:text-xl">
                    Please enter your email address or <br /> username and password to continue
                </p>
            </div>

            <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    label="Email/Username"
                    placeholder="abc@awoofhub.ng"
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

                <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                    <label className="flex cursor-pointer items-center gap-2 text-slate-500">
                        <input type="checkbox" className="peer sr-only appearance-none" />
                        <span
                            aria-hidden="true"
                            className="flex h-5 w-5 items-center justify-center rounded border-2 border-[#FFD5C3] text-xs font-bold text-white transition-colors peer-checked:border-orange-600 peer-checked:bg-orange-600 peer-checked:after:content-['✓'] peer-focus-visible:ring-2 peer-focus-visible:ring-orange-300 peer-focus-visible:ring-offset-2"
                        />
                        Remember me
                    </label>
                    <Link href="/forgot-password" className="font-medium text-orange-600 transition-colors hover:text-orange-700">
                        Forgot Password?
                    </Link>
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
