import { User } from 'next-auth';
import 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    id: UserId;
  }
}

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
