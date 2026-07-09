import type { SubmitHandler } from 'react-hook-form';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TodoValidation } from '@/validations/TodoValidation';

export const TodoForm = (props: {
  submitLabel: string;
  defaultValues?: z.infer<typeof TodoValidation>;
  onSubmit: SubmitHandler<z.infer<typeof TodoValidation>>;
}) => {
  const t = useTranslations('TodoForm');

  const form = useForm({
    resolver: zodResolver(TodoValidation),
    defaultValues: props.defaultValues ?? {
      title: '',
      message: '',
    }, // defaultValues needs to be defined to avoid warning: "A component is changing an uncontrolled input to be controlled"
  });

  useEffect(() => {
    form.setFocus('title');
  }, [form]);

  const handleSubmit = form.handleSubmit(props.onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('title_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('title_placeholder')}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>{t('title_description')}</FormDescription>
              <FormMessage errorMessage={t('title_error_message')} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message_title')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('message_placeholder')}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>{t('message_description')}</FormDescription>
              <FormMessage errorMessage={t('message_error_message')} />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {props.submitLabel}
        </Button>
      </form>
    </Form>
  );
};
