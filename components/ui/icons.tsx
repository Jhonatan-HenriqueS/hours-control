import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5zM13 5.5A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v7A1.5 1.5 0 0 1 18.5 14h-4a1.5 1.5 0 0 1-1.5-1.5zM4 15.5A1.5 1.5 0 0 1 5.5 14h4A1.5 1.5 0 0 1 11 15.5v4A1.5 1.5 0 0 1 9.5 21h-4A1.5 1.5 0 0 1 4 19.5zM13 17.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 0 3h-4a1.5 1.5 0 0 1-1.5-1.5Z"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ListChecksIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M9.5 6.5h9M9.5 12h9M9.5 17.5h9M4.5 6.5l1.25 1.25L8 5.5M4.5 12l1.25 1.25L8 11M4.5 17.5l1.25 1.25L8 16.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.75 19.25h14.5M7.5 16.5V11M12 16.5V7.5M16.5 16.5V4.75"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CategoryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.75 7.25A2.5 2.5 0 0 1 7.25 4.75h3.18a2 2 0 0 1 1.42.59l.81.82a2 2 0 0 0 1.42.59h2.67a2.5 2.5 0 0 1 2.5 2.5v7.5a2.5 2.5 0 0 1-2.5 2.5H7.25a2.5 2.5 0 0 1-2.5-2.5z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m15 18-6-6 6-6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m9 6 6 6-6 6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m6 9 6 6 6-6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SlidersHorizontalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 7h8M16 7h4M4 17h4M12 17h8M10 4v6M14 14v6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="7" r="2" strokeWidth="1.8" />
      <circle cx="10" cy="17" r="2" strokeWidth="1.8" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="4.2" strokeWidth="1.8" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M20 15.4A8.5 8.5 0 1 1 8.6 4 7 7 0 0 0 20 15.4Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 5v14M5 12h14"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1ZM5.5 14l1.1 2.4L9 17.5l-2.4 1.1L5.5 21l-1.1-2.4L2 17.5l2.4-1.1L5.5 14Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M7 3.75v3.5M17 3.75v3.5M4.75 9.25h14.5M6 5.75h12A1.75 1.75 0 0 1 19.75 7.5V18A2.25 2.25 0 0 1 17.5 20.25h-11A2.25 2.25 0 0 1 4.25 18V7.5A1.75 1.75 0 0 1 6 5.75Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="8.25" strokeWidth="1.8" />
      <path
        d="M12 7.75v4.7l3.2 1.9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m5.5 12.5 4 4L18.5 7.5"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Trash2Icon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.75 6.75h14.5M9.25 3.75h5.5M8 3.75h8a1.25 1.25 0 0 1 1.25 1.25v1.75H6.75V5A1.25 1.25 0 0 1 8 3.75ZM8 9.25v7.5M12 9.25v7.5M16 9.25v7.5M7 20.25h10A1.75 1.75 0 0 0 18.75 18.5V6.75H5.25V18.5A1.75 1.75 0 0 0 7 20.25Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m4.75 16.75 8.9-8.9a1.75 1.75 0 0 1 2.47 0l1.03 1.03a1.75 1.75 0 0 1 0 2.47l-8.9 8.9-3.5.5zM12.75 8.75l2.5 2.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HourglassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M7 3.75h10M7 20.25h10M8.25 3.75c0 3.04 1.5 4.9 3.75 6.25-2.25 1.35-3.75 3.21-3.75 6.25M15.75 3.75c0 3.04-1.5 4.9-3.75 6.25 2.25 1.35 3.75 3.21 3.75 6.25M8.75 16.25h6.5M9.25 8.25h5.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogOutIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M14 7V5.75A1.75 1.75 0 0 0 12.25 4H6.75A1.75 1.75 0 0 0 5 5.75v12.5A1.75 1.75 0 0 0 6.75 20h5.5A1.75 1.75 0 0 0 14 18.25V17M10 12h10m-3.5-3.5L20 12l-3.5 3.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
