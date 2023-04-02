const pick = (...props: string[]) => (obj: any) =>
  props.reduce((acc:any, prop:any) => {
    if (obj.hasOwnProperty(prop)) {
      acc[prop] = obj[prop];
    }
    return acc;
  }, {});

const removeUndefinedOrNullProps = (obj:any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      value !== undefined && value !== null
    )
  )
};

const wait = (t_ms: number) => new Promise((res) => setTimeout(res, t_ms))

export default {
  pick,
  removeUndefinedOrNullProps,
  wait,
};
