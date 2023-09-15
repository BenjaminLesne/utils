/**
 * Hover the PrettifyOn type and the PrettifyOff type.
 * It is much easier to understand what the nested type is in PrettifyOn compared to PrettifyOff type
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
};

type PrettifyCore = {
  name: string;
};

type PrettifyOff = PrettifyCore & { age: number };

type PrettifyOn = Prettify<PrettifyCore & { age: number }>;

// /Prettify type
