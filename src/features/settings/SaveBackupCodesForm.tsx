import { zodResolver } from '@hookform/resolvers/zod';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { SaveBackupCodesValidation } from '@/validations/SettingsValidation';

export const SaveBackupCodesForm = (props: {
  backupCodes: string[];
  onClose: () => void;
}) => {
  const t = useTranslations('SaveBackupCodesForm');

  const form = useForm({
    resolver: zodResolver(SaveBackupCodesValidation),
    defaultValues: {
      saved: false,
    },
  });

  const handleCopyBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(props.backupCodes.join('\n'));
      toast.success(t('copy_success_toast'));
    } catch {
      toast.error(t('copy_error_toast'));
    }
  };

  const handleSubmit = form.handleSubmit(() => {
    props.onClose();
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('backup_title')}</DialogTitle>
        <DialogDescription>{t('backup_description')}</DialogDescription>
      </DialogHeader>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted p-3 text-xs">
          {props.backupCodes.map(code => (
            <div key={code} className="text-center">
              {code}
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleCopyBackupCodes}
          variant="outline"
          className="w-full"
        >
          <Copy />
          {t('backup_copy_button')}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate className="mt-3 space-y-6">
          <FormField
            control={form.control}
            name="saved"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormLabel>{t('saved_checkbox_label')}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {t('saved_submit_button')}
          </Button>
        </form>
      </Form>
    </>
  );
};
