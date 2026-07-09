import { AlertCircleIcon } from 'lucide-react';
import { useFormState } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * Reads the root error message from the current form context
 * and displays a top-level alert for non-field form errors like errors returned by the server.
 * @returns Alert with the root error message when present, otherwise null.
 */
export function FormRootError() {
  const { errors } = useFormState();

  if (!errors.root?.message) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertDescription>{errors.root.message}</AlertDescription>
    </Alert>
  );
}
