import { ViewOptionEnum } from "@/types/enum"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "BEGIN",
    label: "לעשות",
    icon: CircleIcon,
  },
  {
    value: "ONGOING",
    label: "בתהליך",
    icon: StopwatchIcon,
  },
  {
    value: "FINISH",
    label: "הושלם",
    icon: CheckCircledIcon,
  },
  {
    value: "STUCK",
    label: "תקוע",
    icon: QuestionMarkCircledIcon,
  },
]

export const priorities = [
  {
    label: "קל",
    value: "EASY",
  },
  {
    label: "בינוני",
    value: "MEDIUM",
  },
  {
    label: "קשה",
    value: "HARD",
  },
]

export const hebrewColumnsFilter = [
  {
    value: 'status',
    label: 'סטטוס'
  },
  {
    value: 'difficulty',
    label: 'רמת קושי'
  }
]

export const sortingFilter = [
  {
    value: ViewOptionEnum.ASC,
    label: "סדר עולה"
  },
  {
    value: ViewOptionEnum.DESC,
    label: "סדר יורד"
  },
  {
    value: ViewOptionEnum.HIDE,
    label: "הסתר"
  }
]