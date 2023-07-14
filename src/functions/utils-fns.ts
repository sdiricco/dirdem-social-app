const removeUndefinedOrNullProps = (obj:any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      value !== undefined && value !== null
    )
  )
};

const logger = (label: any) => (data: any) => { console.log(`${label} -> ${JSON.stringify(data)}`); return data };

export default {
  removeUndefinedOrNullProps,
  logger
};
