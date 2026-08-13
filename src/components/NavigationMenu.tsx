import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function cva(base: string) {
  return (props?: { className?: string }) => cn(base, props?.className);
}

export const NAVIGATION_MENU_TRIGGER_CLASSES = [
  'group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2',
  'font-mono text-[10px] uppercase tracking-[0.24em]',
  'transition-[color,background-color,border-color,box-shadow] duration-200',
  'border border-white/10 bg-white/[0.03] text-zinc-400',
  'hover:border-white/25 hover:bg-white/[0.06] hover:text-white',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
  'aria-expanded:border-blue-500/30 aria-expanded:bg-blue-500/10 aria-expanded:text-white',
].join(' ');

export function navigationMenuTriggerStyle(props?: { className?: string }) {
  return cn(NAVIGATION_MENU_TRIGGER_CLASSES, props?.className);
}

export function NavigationMenu({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  viewport?: boolean;
}) {
  return (
    <nav className={cn('relative flex max-w-max flex-1 items-center justify-center', className)}>
      {children}
    </nav>
  );
}

export function NavigationMenuList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ul className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}>
      {children}
    </ul>
  );
}

export function NavigationMenuItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <li
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen });
        }
        return child;
      })}
    </li>
  );
}

export function NavigationMenuTopLink({
  className,
  children,
  asChild,
  active,
}: {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  active?: boolean;
}) {
  return (
    <div className={cn(navigationMenuTriggerStyle({ className }), active && 'border-blue-500/30 bg-blue-500/10 text-white')}>
      {children}
    </div>
  );
}

export function NavigationMenuTrigger({
  className,
  children,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setIsOpen?.(!isOpen)}
      aria-expanded={isOpen}
      className={cn(navigationMenuTriggerStyle({ className }))}
    >
      {children}
      <ChevronDownIcon
        className={cn('relative top-[1px] ms-2 size-3.5 opacity-60 transition duration-300', isOpen && 'rotate-180')}
        aria-hidden="true"
      />
    </button>
  );
}

export function NavigationMenuContent({
  className,
  children,
  isOpen,
}: {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute top-full left-0 mt-2 z-50 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.85)] backdrop-blur transition-all duration-200 animate-in fade-in zoom-in-95',
        className
      )}
    >
      {children}
    </div>
  );
}

export function NavigationMenuLinkAsChild({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-xl border border-white/5 bg-black/40 p-3 text-left text-xs text-zinc-300 transition-colors hover:border-blue-500/25 hover:bg-blue-500/10 hover:text-white',
        className
      )}
    >
      {children}
    </div>
  );
}

export function NavigationMenuIndicator() {
  return null;
}
