type GetValueOfPathProps = {
  obj: object;
  path: string;
};

/**
 * Get the value of a variable in an object based on a path.
 *
 * Example: obj = {user:{name: 'John'}}, path = 'user.name' returns 'John'
 */
function getValueOfPath({ obj, path }: GetValueOfPathProps) {
  return path.split(".").reduce((result, key) => result[key], obj);
}

function isObject(item: unknown) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
