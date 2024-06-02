'use client';
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <section className="grid min-h-screen w-full place-content-center">
      <Card className="w-[320px]">
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?&auto=format&fit=crop&w=600&q=80"
              alt="Bold typography"
              width={600}
              height={600}
              className="rounded-t-lg"
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--gray-5)',
              }}
            />
          </AspectRatio>
        </CardContent>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please sign in to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={'outline'} onClick={() => signIn('google', { callbackUrl: '/' })}>
            Sign In With Google
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
