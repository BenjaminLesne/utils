const array1 = [1, 2, 1];
const array2 = [{ value: 1 }, { value: 2 }, { value: 1 }];

type FilterUniqueItemProps = {
  values: (number|string)[],
  key?: null|string
};
function filterUniqueItem({values, key = null }: FilterUniqueItemProps) {
  if (values.length === 0) return values;
  let result: (string|number)[] = [];
  const indexesToSkip: number[] = [];
  const lastIndex = values.length - 1;
  for (let index1 = 0; index1 <= lastIndex; index1++) {
    debugger;
    
    if (indexesToSkip.includes(index1)) continue;
    indexesToSkip.push(index1);

    for (let index2 = 0; index2 <= lastIndex; index2++) {

      if (indexesToSkip.includes(index2)) continue;

      if (values[index1] === values[index2]) {
        // same value meaning duplicate
        indexesToSkip.push(index2);
        continue;
      }
      //  is last index, meaning it's not a duplicate, we filter it
      if (index2 === lastIndex) result.push(values[index1]);
    }
  }
  return result;
};
console.log(filterUniqueItem({values: array1}));
type GetValueOfPathProps = {
  obj: object,
  path: string
}
/**
 * Get the value of a variable in an object based on a path.
 *
 * Example: obj = {user:{name: 'John'}}, path = 'user.name' returns 'John'
 * @param {object} obj
 * @param {string} path
 * @returns
 */
function getValueOfPath({obj, path}: GetValueOfPathProps) {
  return path.split(".").reduce((result, key) => result[key], obj);
}
