import * as React from 'react'
import { cn } from '@/lib/utils'
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn('rounded-xl border border-white/10 bg-card/55 backdrop-blur-xl', className)} {...p} />))
Card.displayName = 'Card'
