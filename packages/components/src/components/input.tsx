import { cn } from '../cn';
import { Severity } from '../types/severity';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  severity?: Severity;
  message?: string;
}

export function Input({ severity, message, ...props }: InputProps) {
  return (
    <div
      // todo: discuss colors with designers.
      //       dark mode colors are kinda bad, but we don't really need
      //       them just yet as this is used on yellow backgrounds
      className={cn(
        'rounded-[9px] border border-blue-400 bg-white outline-offset-2 focus-within:outline focus-within:outline-2 dark:border-neutral-400 dark:bg-neutral-800',
        'focus-visible:outline-green-800/40',
        '[&:focus-within:has([aria-invalid],:invalid)]:outline-critical-dark [&:has([aria-invalid],:invalid)]:border-critical-dark/50',
        severity === 'warning' &&
          'border-warning-bright/50 outline-warning-bright dark:border-warning-bright/50',
        severity === 'positive' &&
          'border-positive-dark/50 outline-positive-dark dark:border-positive-dark/50',
      )}
    >
      <input
        aria-invalid={severity === 'critical' ? true : undefined}
        className={cn(
          'w-full rounded-lg bg-white py-3 indent-4 font-medium transition-[background-color,padding] placeholder:text-green-800 placeholder-shown:bg-blue-100 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] autofill:[-webkit-text-fill-color:theme(colors.green.1000)] autofill:first-line:font-sans hover:bg-white focus:bg-white focus-visible:outline-none focus-visible:ring-0 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-300 dark:placeholder-shown:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
          message && 'rounded-b-none py-2',
          props.className,
        )}
        {...props}
      />
      <div
        style={{ height: message ? '25px' : '0px' }}
        className={cn(
          'overflow-hidden rounded-b-lg pl-4 pr-1 text-sm transition-all *:animate-in *:fade-in',
          severity === 'critical' && 'bg-critical-dark/10 dark:bg-critical-bright/20',
          severity === 'warning' && 'bg-warning-bright/10',
          severity === 'positive' && 'bg-positive-dark/10',
        )}
      >
        {message &&
          (severity === 'critical' ? (
            <p className="py-0.5 text-sm text-critical-dark dark:text-white">{message}</p>
          ) : severity === 'warning' ? (
            <p className="py-0.5 text-sm text-warning-bright">{message}</p>
          ) : (
            <p className="py-0.5 text-sm text-positive-dark">{message}</p>
          ))}
      </div>
    </div>
  );
}
