import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const v = cva('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors backdrop-blur', {
  variants: { variant: { default: 'bg-primary text-primary-foreground hover:bg-primary/85', outline: 'border border-white/15 bg-white/[.03] hover:bg-white/10' }, size: { default: 'h-10 px-4', sm: 'h-8 px-3 text-xs' } },
  defaultVariants: { variant: 'default', size: 'default' },
})
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof v> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...p }, ref) => {
  const C = asChild ? Slot : 'button'
  return <C ref={ref} data-target className={cn(v({ variant, size }), className)} {...p} />
})
Button.displayName = 'Button'
