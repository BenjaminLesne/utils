const array1 = [1, 2, 1, 1, 1, 2, 3, 2];
const array2 = [
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 3 },
  { value: 2 },
  { value: 1 },
];

type FilterUniqueItemProps = {
  values: (number | string | object)[];
  path?: null | string;
};
/**
 * Filter only the non duplicated items from an array meaning [1, 2, 1] wil return [2].
 *
 * You can also provide a path to the value you want to compare
 * example: "user.id" will check in  the given array of objects each yourObject.user.id value with the rest of the array.
 */
function filterUniqueItem({ values, path = null }: FilterUniqueItemProps) {
  const hasPath = typeof path === 'string';
  if (path && values.some((value) => isObject(value) === false))
    throw Error("You can't pass a path if your values are not objects");
  if (values.length === 0) return values;

  let result: (string | number | object)[] = [];
  const indexesToSkip: number[] = [];
  const lastIndex = values.length - 1;

  for (let index1 = 0; index1 <= lastIndex; index1++) {
    const item1 = values[index1];
    const value1 = hasPath
      ? getValueOfPath({ obj: item1 as object, path })
      : (item1 as (string | number)[]);

    if (indexesToSkip.includes(index1)) continue; // we know this is duplicated, no need to check.
    if (index1 === lastIndex && indexesToSkip.includes(index1) === false)
      result.push(item1); // if last item is not a known duplicated then we don't need to check since we compared it with all the previous items.
    indexesToSkip.push(index1); // allow us to not compare indexN with indexN and skip to the next index with a condition in the second loop
    let isDuplicate = false;

    for (let index2 = 0; index2 <= lastIndex; index2++) {
      if (indexesToSkip.includes(index2) && index2 !== lastIndex) continue; // we don't want to continue on last index otherwise [1, 2, 1] return []
      const item2 = values[index2];
      const value2 = hasPath
        ? getValueOfPath({ obj: item2 as object, path })
        : item2;
      if (value1 === value2) {
        // same value meaning duplicate
        isDuplicate = true;
        indexesToSkip.push(index2);
        continue; // necessary to not break here otherwise it won't catch the third 1 here: [1, 1, 2, 1]
      }

      if (index2 === lastIndex && isDuplicate === false) result.push(item1); //  is last index and not a duplicate, we filter it
    }
  }
  return result;
}
console.log(array2);
console.log(filterUniqueItem({ values: array2, path: "value" }));
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
/**
 *
 * return true if argument is an object 
 */
function isObject(item: any) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
