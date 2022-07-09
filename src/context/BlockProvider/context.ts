import React from "react";

import { BLOCK_STATE_INITIAL_STATE, BlockState } from "./model";

export const BlockHashContext = React.createContext<BlockState>(
  BLOCK_STATE_INITIAL_STATE
);

export function useBlock() {
  return React.useContext(BlockHashContext);
}
