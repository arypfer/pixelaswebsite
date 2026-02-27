import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  onClick?: () => void
}

export function Button({ children, variant = 'primary', size = 'md', className, href, onClick }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-xl'
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30',
    ghost: 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-white/[0.15]',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return <a href={href} className={classes}>{children}</a>
  }
  return <button onClick={onClick} className={classes}>{children}</button>
}
