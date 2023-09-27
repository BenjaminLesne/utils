/*
 * Hover the PrettifyOn types and the PrettifyOff type.
 * It is much easier to understand what the nested type is in PrettifyOn compared to PrettifyOff type, or even better, check DeepPrettify type out!
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
};

type DeepPrettify<T> = T extends object
  ? {
      [K in keyof T]: DeepPrettify<T[K]>;
    }
  : T;

type Address = {
  city: string;
  stree: string;
};

type PrettifyCore = {
  name: string;
  address: Address;
};

type PrettifyOff = PrettifyCore & { age: number };

type PrettifyOn = Prettify<PrettifyCore & { age: number }>;

type DeepPrettifyOn = DeepPrettify<PrettifyCore & { age: number }>;

// /Prettify type

/*
 * Inside a switch, we trigger this function in the default case, whenever we forget to exhaust all options this will error in TypeScript
 * see: 3.3. Exhaustiveness Checking with the Assert never Technique #1 from TypeScript cookbook
 */
function assertNever(value: never) {
  console.error("Unknown value", value);
  throw Error("Not possible");
}
