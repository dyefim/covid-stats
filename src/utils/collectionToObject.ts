const collectionToObject = (collection: Record<string, any>[], key: string) => {
  return collection.reduce((acc, item) => {
    const { [key]: _, ...rest } = item;

    return {
      ...acc,
      [item[key]]: rest,
    };
  }, {});
};

export default collectionToObject;
