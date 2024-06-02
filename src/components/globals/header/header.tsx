import { getProfile } from '@/actions';
import { Skeleton } from '@/components';
import Image from 'next/image';
import { Suspense } from 'react';
import UserPopover from '../dropdown/user-dropdown';

export interface HeaderProps {
  children?: React.ReactNode;
}

const UserSkeleton = () => {
  return <Skeleton className="h-[66px] w-[66px] rounded-lg" />;
};
export async function Header() {
  const user = await getProfile();
  return (
    <section className="w-full border-b border-solid border-b-border bg-card/5 backdrop-blur-sm">
      <header className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">🪅 Piñata Template</h1>
          <Suspense fallback={<UserSkeleton />}>
            <div className="flex items-center">
              <UserPopover>
                <Image
                  src={user?.image as string}
                  alt={user?.name as string}
                  className="h-12 w-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div className="hidden items-start sm:flex sm:flex-col">
                  <p className="text-left text-sm font-bold">{user?.name}</p>
                  <p className="text-left text-sm">{user?.email}</p>
                </div>
              </UserPopover>
            </div>
          </Suspense>
        </div>
      </header>
    </section>
  );
}
