import { SvgProps } from "@/types";

export function ICHoriz3Dots(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 6 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
      <circle cx="2.5" cy="11.5" r="2.5" fill="currentColor" />
      <circle cx="2.5" cy="20.5" r="2.5" fill="currentColor" />
    </svg>
  );
}
