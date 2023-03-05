
/**
 *
 * return true if argument is an object 
 */
export function isObject(item: unknown) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
