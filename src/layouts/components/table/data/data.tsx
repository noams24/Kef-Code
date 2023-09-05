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
    value: "stuck",
    label: "תקוע",
    icon: QuestionMarkCircledIcon,
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
