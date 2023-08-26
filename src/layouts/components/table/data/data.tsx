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
    value: "backlog",
    label: "ממתין",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "לעשות",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "בתהליך",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "הושלם",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "בוטל",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "קל",
    value: "low",
  },
  {
    label: "בינוני",
    value: "medium",
  },
  {
    label: "קשה",
    value: "high",
  },
]

export const hebrewColumns = [
  {
    value: 'status',
    label: 'סטטוס'
  },
  {
    value: 'priority',
    label: 'רמת קושי'
  },
  {
    value: 'title',
    label: 'כותרת'
  }
]