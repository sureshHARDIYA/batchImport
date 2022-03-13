import create from "zustand";

const useStore = create((set: any) => ({
  dataHouse: 0,
  columnNames: [],
  transformKeys: new Map(),
  requests: [],
  updateDataHouse: (newDataHouse: any) => set({ dataHouse: newDataHouse }),
  updateColumnNames: (newCols: string[]) => set({ columnNames: newCols }),
  updateTransformKeys: (newKey: string, newValue: string) =>
    set((state: any) => {
      return {
        transformKeys: state.transformKeys.set(newKey, newValue),
      };
    }),
  updateRequests: (newRequests: any) =>
    set((state: any) => ({ requests: state.requests.concat(newRequests) })),
}));

export default useStore;
