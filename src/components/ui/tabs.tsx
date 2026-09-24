import * as T from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
export const Tabs = T.Root
export const TabsList = ({ className, ...p }: T.TabsListProps) => <T.List className={cn('inline-flex gap-2', className)} {...p} />
export const TabsTrigger = ({ className, ...p }: T.TabsTriggerProps) => (
  <T.Trigger data-target className={cn('inline-flex items-center rounded-md border border-white/10 bg-white/[.03] px-5 py-2 text-sm text-white/60 transition data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:text-black', className)} {...p} />)
export const TabsContent = ({ className, ...p }: T.TabsContentProps) => <T.Content className={cn('mt-5 focus-visible:outline-none', className)} {...p} />
