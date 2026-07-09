import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AppConfig } from '@/utils/AppConfig';
import { VerifyNewEmailForm } from './VerifyNewEmailForm';

export const VerifyNewEmailDialog = (props: {
  newEmail: string;
  onClose: () => void;
}) => {
  const t = useTranslations('VerifyNewEmailDialog');

  const handleOpenChange = () => {
    props.onClose();
  };

  return (
    <Dialog open={props.newEmail !== ''} onOpenChange={handleOpenChange}>
      <DialogContent onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t('dialog_title')}</DialogTitle>
          <DialogDescription className="whitespace-pre-wrap">
            {t.rich('dialog_description', {
              otpLength: AppConfig.auth.OTPLength,
              email: () => (
                <span className="font-bold break-all">
                  {props.newEmail}
                </span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>

        <VerifyNewEmailForm
          newEmail={props.newEmail}
        />
      </DialogContent>
    </Dialog>
  );
};
