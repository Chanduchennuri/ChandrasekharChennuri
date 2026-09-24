import { cn } from '@/lib/utils'
export const Badge = ({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('inline-flex rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-white/70', className)} {...p} />)
