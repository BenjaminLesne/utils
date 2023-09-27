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

/*
 * Get required properties types from object type.
 */

type GetRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K]
    ? K
    : never]: T[K];
};

type Person = {
  name: string;
  age: number;
  comment?: string;
}

// on hover only shows name and age properties
type PersonRequiredFields = GetRequired<Person> 

// /GetRequired


type GetOptional<T> = Omit<T, keyof GetRequired<T>>;

// on hover shows only optional comment property type
type PersonOptionalFields = GetOptional<Person> 


// /GetOptional

/*
 *  object should have at least one property. 
 */
type Split<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  };
}[keyof T];

type Interests = {
  music: boolean;
  book: boolean;
  programming: boolean;
}

const getInterest = (interests: Split<Interests>) => interests

// interests object should have at least one interest
const JohnInterest = getInterest({})

// does not error
const DoeInterest = getInterest({music: true})

// /Split
