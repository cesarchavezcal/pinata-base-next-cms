'use client';

import { addIdeaAction } from '@/actions';
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  Input,
  ProgressIndicator,
  Separator,
  Switch,
  Textarea,
} from '@/components';
import { ResponseStatus } from '@/enums';
import { AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export interface AddIdeaFormProps {
  children?: React.ReactNode;
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? <ProgressIndicator color="text-foreground" /> : 'Share Idea'}
    </Button>
  );
}

const InputError = ({ error }: { error: string }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-small">{error}</AlertDescription>
    </Alert>
  );
};

export const AddIdeaForm = ({}: Readonly<AddIdeaFormProps>) => {
  const [state, action] = useFormState(addIdeaAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log(state);
    if (state?.status === ResponseStatus.SUCCESS) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Card className="min-h-max p-4">
      <form action={action} ref={formRef} className="grid gap-4">
        <section className="flex flex-col gap-1">
          <label className="text-sm font-bold" htmlFor="title">
            💡 Idea Title
          </label>
          <Input name="title" placeholder="Search the docs…" />
          {state?.errorFields?.title && <InputError error={state?.errorFields?.title[0]} />}
        </section>
        <section className="flex flex-col gap-1">
          <label className="text-sm font-bold" htmlFor="content">
            💬 Idea Description
          </label>
          <Textarea placeholder="Type your message here." name="content" />
          {state?.errorFields?.content && <InputError error={state?.errorFields?.content[0]} />}
        </section>
        <section className="flex flex-col gap-1">
          <label className="text-sm font-bold" htmlFor="published">
            🚀 Should be published?
          </label>
          <Switch name="published" />
          {state?.errorFields?.published && <InputError error={state?.errorFields?.published[0]} />}
        </section>
        <Separator className="my-2" />
        <section className="flex flex-col gap-1">
          <Submit />
          {state?.status === ResponseStatus.ERROR && !state?.errorFields && (
            <InputError error={state.message?.toString() as string} />
          )}
        </section>
      </form>
    </Card>
  );
};
