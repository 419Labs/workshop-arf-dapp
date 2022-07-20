import React from "react";

import type { ContractState } from "./model";
import { CONTRACT_INITIAL_STATE } from "./model";

export const ContractContext = React.createContext<ContractState>(
  CONTRACT_INITIAL_STATE
);

export function useContract() {
  return React.useContext(ContractContext);
}
