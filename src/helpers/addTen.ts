import { useCounterStore } from "../model/counterStore.ts";

export const addTen = () => {
  const counter = useCounterStore.getState().counter;

  useCounterStore.getState().changeByAmount(counter > 0 ? 10 : -10);
};
