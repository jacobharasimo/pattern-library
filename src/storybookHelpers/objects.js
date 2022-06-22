export const toFlatPropertyMap = (obj, keySeparator = '.') => {
  const flattenRecursive = (o, parentProperty, propertyMap = {}) => {
    const result = propertyMap;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(o)) {
      const property = parentProperty ? `${parentProperty}${keySeparator}${key}` : key;
      if (value && typeof value === 'object') {
        flattenRecursive(value, property, result);
      } else {
        result[property] = value;
      }
    }
    return result;
  };
  return flattenRecursive(obj);
};
