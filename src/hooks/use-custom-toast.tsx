import { buttonVariants } from '@/components/ui/Button2'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'שגיאת התחברות',
      description: 'אתה צריך להיות מחובר כדי לשמור',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/sign-in'
          className={buttonVariants({ variant: 'outline' })}>
          כניסה
        </Link>
      ),
    })
  }

  return { loginToast }
}
