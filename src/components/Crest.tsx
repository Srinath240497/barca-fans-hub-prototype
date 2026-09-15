import { cn } from "@/lib/utils";

export function Crest({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path
        d="M32 2.5c8.2 4.4 16.8 6.2 25.5 6.2v24.7c0 16.4-10.2 30.6-25.5 36.1C16.7 63.9 6.5 49.8 6.5 33.4V8.7C15.2 8.7 23.8 6.9 32 2.5Z"
        fill="#001E42"
        stroke="#EDBB00"
        strokeWidth="2.2"
      />
      <path d="M8.2 22h47.6v22H8.2V22Z" fill="#A50044" />
      <path
        d="M8.2 22h47.6v22H8.2V22Z"
        fill="url(#crest-stripes)"
      />
      <path d="M8.2 9.4h47.6V22H8.2V9.4Z" fill="#F4F7FB" />
      <path d="M32 9.4h23.8V22H32V9.4Z" fill="#A50044" />
      <path d="M8.2 9.4H32v6.3H8.2V9.4Z" fill="#004D98" />
      <circle cx="20" cy="16.2" r="2.1" fill="#EDBB00" />
      <path d="M8.2 44h47.6v12.2C50.2 64.4 41.6 70 32 72.8 22.4 70 13.8 64.4 8.2 56.2V44Z" fill="#004D98" />
      <path
        d="M22 52.5c3.4 4.2 7.2 6.6 10 7.4 2.8-.8 6.6-3.2 10-7.4"
        stroke="#EDBB00"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <defs>
        <pattern id="crest-stripes" width="10" height="22" patternUnits="userSpaceOnUse">
          <rect width="5" height="22" fill="#004D98" />
          <rect x="5" width="5" height="22" fill="#A50044" />
        </pattern>
      </defs>
    </svg>
  );
}
