import { ResponseStatus } from '@/enums';
import { Idea } from '@prisma/client';

export interface ApiResponse {
  status: ResponseStatus;
  message?: string;
  errorFields?: {
    title?: string[];
    content?: string[];
    published?: string[];
  };
  data?: Idea;
}
