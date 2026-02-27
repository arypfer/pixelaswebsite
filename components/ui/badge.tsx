import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'category' | 'featured'
  className?: string
}

export function Badge({ children, variant = 'category', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        variant === 'category' && 'text-white/40',
        variant === 'featured' && 'bg-orange-500/10 text-orange-400',
        className
      )}
    >
      {children}
    </span>
  )
}
