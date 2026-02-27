import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article'
}

export function GlassCard({ children, className, hover = true, as: Tag = 'div' }: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'bg-white/[0.03] border border-white/[0.06] rounded-xl',
        hover && 'transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40',
        className
      )}
    >
      {children}
    </Tag>
  )
}
