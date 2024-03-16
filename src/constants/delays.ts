import { resolve } from "path";

export const DELAY_IN_MS = 1000;
export const SHORT_DELAY_IN_MS = 500;

export const delay = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
