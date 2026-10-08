import {
  type Icon,
  IconBook2,
  IconBriefcase,
  IconCalculator,
  IconCalendarEvent,
  IconGitBranch,
  IconLifebuoy,
  IconPackage,
  IconPlug,
  IconReceipt,
  IconServer,
  IconShieldCheck,
  IconTool,
  IconUsers,
} from '@tabler/icons-react'

const icons: Record<string, Icon> = {
  'lucide-receipt': IconReceipt,
  'lucide-calculator': IconCalculator,
  'lucide-users': IconUsers,
  'lucide-calendar-days': IconCalendarEvent,
  'lucide-shield-check': IconShieldCheck,
  'lucide-package': IconPackage,
  'lucide-git-branch': IconGitBranch,
  'lucide-server': IconServer,
  'lucide-wrench': IconTool,
  'lucide-life-buoy': IconLifebuoy,
  'lucide-plug': IconPlug,
  'lucide-book-open': IconBook2,
  'lucide-briefcase': IconBriefcase,
}

export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name]
  return Component ? <Component className={className} stroke={1.75} aria-hidden="true" /> : null
}
