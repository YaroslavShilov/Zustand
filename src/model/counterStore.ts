import { create } from "zustand/react";
import type { StateCreator } from "zustand/vanilla";

type CounterStoreState = {
  counter: number;
};

type CounterStoreActions = {
  increase: () => void;
  decrease: () => void;
  changeByAmount: (value: number) => void;
};

type CounterStore = CounterStoreState & CounterStoreActions;

const counterSlice: StateCreator<CounterStore> = (set, get) => ({
  counter: 0,
  increase: () => {
    set({ counter: ++get().counter });
  },
  decrease: () => {
    set({ counter: --get().counter });
  },
  changeByAmount: (value) => {
    set({ counter: get().counter + value });
  },
});

export const useCounterStore = create<CounterStore>(counterSlice);
