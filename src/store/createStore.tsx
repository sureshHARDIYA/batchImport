import create from "zustand";

const useStore = create((set: any) => ({
  dataHouse: 0,
  columnNames: [],
  updateDataHouse: (newDataHouse: any) => set({ dataHouse: newDataHouse }),
  updateColumnNames: (newCols: string[]) => set({ columnNames: newCols }),
}));

export default useStore;
