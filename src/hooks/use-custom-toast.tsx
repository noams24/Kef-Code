import { toast } from '@/hooks/use-toast';
import LoginModal from '@/partials/LoginModal';

export const useCustomToasts = () => {
  const loginToast = (description?: string) => {
    const { dismiss } = toast({
      title: 'שגיאת התחברות',
      description: description ?? 'אתה צריך להיות מחובר כדי לשמור',
      variant: 'destructive',
      action: <LoginModal />,
    });
  };

  return { loginToast };
};
