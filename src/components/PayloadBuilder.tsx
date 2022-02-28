const PayloadBuilder = ({ useStore }: any) => {
  const { dataHouse, columnNames } = useStore();

  console.log(columnNames);

  return <div>Payload Building</div>;
};

export default PayloadBuilder;
