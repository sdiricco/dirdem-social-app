const pick = (...props: string[]) => (obj: any) =>
  props.reduce((acc, prop) => {
    if (obj.hasOwnProperty(prop)) {
      acc[prop] = obj[prop];
    }
    return acc;
  }, {});

const removeUndefinedOrNullProps = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      value !== undefined && value !== null
    )
  )
};

export default {
  pick,
  removeUndefinedOrNullProps
};
