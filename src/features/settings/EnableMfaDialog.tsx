import type { MfaSetupData } from '@/types/Auth';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from '@/libs/I18nNavigation';
import { EnableMfaTotpForm } from './EnableMfaTotpForm';
import { SaveBackupCodesForm } from './SaveBackupCodesForm';

export const EnableMfaDialog = (props: {
  onClose: () => void;
  mfaSetupData: MfaSetupData;
}) => {
  const t = useTranslations('EnableMfaDialog');
  const [dialogStep, setDialogStep] = useState<1 | 2>(1);
  const router = useRouter();

  const handleDialogDismiss = () => {
    props.onClose();

    // Reset to the first step when closing or opening the dialog
    setDialogStep(1);
  };

  return (
    <Dialog open={props.mfaSetupData.totpURI !== '' && props.mfaSetupData.backupCodes.length > 0} onOpenChange={handleDialogDismiss}>
      <DialogContent showCloseButton={dialogStep !== 2} onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
        {dialogStep === 1
          ? (
              <EnableMfaTotpForm
                totpURI={props.mfaSetupData.totpURI}
                onSuccess={() => setDialogStep(2)}
              />
            )
          : (
              <SaveBackupCodesForm
                backupCodes={props.mfaSetupData.backupCodes}
                onClose={() => {
                  toast.success(t('success_toast'));
                  router.refresh();
                  handleDialogDismiss();
                }}
              />
            )}
      </DialogContent>
    </Dialog>
  );
};
