import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  const classes = inputs.flat(Infinity).filter(Boolean).join(" ");
  return twMerge(classes);
}
