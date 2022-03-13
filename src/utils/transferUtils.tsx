export const previewData = (
  targetKeys: any,
  transformKeys: any,
  dataHouse: any
) => {
  const newPayload: any = {};

  targetKeys.forEach((item: string) => {
    const hasKey = transformKeys.get(item);

    if (hasKey) {
      newPayload[hasKey] = dataHouse[item];
    } else {
      newPayload[item] = dataHouse[item];
    }
  });

  return newPayload;
};
