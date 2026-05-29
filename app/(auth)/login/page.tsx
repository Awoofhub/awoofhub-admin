'use client'
import { LoginForm } from '@/components/login/LoginForm';
import { Seo } from '@/components/seo/Seo';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


function Login() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSuccess = () => {
    const redirect = searchParams.get("redirect") || "/";
    router.push(redirect);
  }

  return (
    <div className="space-y-6 px-4 md:px-0">
      <Seo title="Sign In" />
      <LoginForm onSuccess={onSuccess} />
    </div>
  )
}


export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}