'use server';
import { ErrorMessages, ResponseStatus } from '@/enums';
import { ApiResponse } from '@/interfaces';
import { prisma } from '@/lib';
import { Idea } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getProfile } from '../auth/get-profile';

const IdeaFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .trim(),
  content: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .trim(),
  published: z.boolean({
    required_error: 'Published is required',
    invalid_type_error: 'Published must be a boolean',
  }),
});

export type FormSchema = z.infer<typeof IdeaFormSchema>;

export async function addIdeaAction(state: any, formData: FormData): Promise<ApiResponse> {
  const user = await getProfile();
  let response: ApiResponse;

  const validatedFields = IdeaFormSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    published: formData.get('published') === 'on',
  });

  if (!validatedFields.success) {
    response = {
      status: ResponseStatus.ERROR,
      errorFields: validatedFields.error.flatten().fieldErrors,
    };

    return response;
  } else {
    if (user) {
      return await prisma.idea
        .create({
          data: {
            title: validatedFields.data.title,
            content: validatedFields.data.content,
            published: validatedFields.data.published,
            userId: user?.id,
          },
        })
        .then((createdIdea) => {
          response = {
            status: ResponseStatus.SUCCESS,
            data: createdIdea as Idea,
          };

          revalidatePath('/');
          return response;
        })
        .catch((error) => {
          response = {
            status: ResponseStatus.ERROR,
            message: error.message,
          };
          return response;
        });
    } else {
      response = {
        status: ResponseStatus.ERROR,
        message: ErrorMessages.USER_NOT_FOUND,
      };
      return response;
    }
  }
}
