import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'עכשיו',
  xSeconds: 'עכשיו',
  halfAMinute: 'עכשיו',
  lessThanXMinutes: 'עכשיו',
  xMinutes: '{{count}} דקות',
  aboutXHours: '{{count}} שעות',
  xHours: '{{count}} שעות',
  xDays: '{{count}} ימים',
  aboutXWeeks: '{{count}} שבועות',
  xWeeks: '{{count}} שבועות',
  aboutXMonths: '{{count}} חודשים',
  xMonths: '{{count}} חודשים',
  aboutXYears: '{{count}} שנים',
  xYears: '{{count}} שנים',
  overXYears: '{{count}} שנים',
  almostXYears: '{{count}} שנים',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'בתוך ' + result
    } else {
      if (result === 'עכשיו') return result
      return 'לפני ' + result
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}