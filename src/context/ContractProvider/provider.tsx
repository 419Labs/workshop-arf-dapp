import type React from "react";

import { ContractContext } from "./context";
import useContractManager from "./manager";

export interface ContractProviderProps {
  children: React.ReactNode;
}

export function ContractProvider({
  children,
}: ContractProviderProps): JSX.Element {
  const state = useContractManager();
  return (
    <ContractContext.Provider value={state}>
      {children}
    </ContractContext.Provider>
  );
}
