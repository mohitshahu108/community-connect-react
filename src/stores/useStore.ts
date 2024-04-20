import { createContext, useContext } from "react";
import store, { Store } from "./store";

export const StoreContext = createContext<Store>(store);

const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export default useStore;
