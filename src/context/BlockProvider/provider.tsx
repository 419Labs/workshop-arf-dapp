import React from "react";
import { toFelt } from "starknet/utils/number";

import { useStarknet } from "../StarknetProvider";

import { BlockHashContext } from "./context";
import { BLOCK_STATE_INITIAL_STATE, BlockState } from "./model";

interface BlockHashProviderProps {
  children: React.ReactNode;
  interval?: number;
}

export function BlockHashProvider({
  interval,
  children,
}: BlockHashProviderProps): JSX.Element {
  // Get current provider
  const { provider } = useStarknet();

  // Init the reducer with initial data
  // TODO: use setBlock to update the local state
  const [block, setBlock] = React.useState<BlockState>(
    BLOCK_STATE_INITIAL_STATE
  );

  // Called each time the provider change
  // TODO: get new block from the current provider
  // TODO: set block_hash, block_number & gas_price to the local state
  const fetchBlockHash = React.useCallback(() => {
    // TODO FILL ME
  }, [provider]);

  React.useEffect(() => {
    fetchBlockHash();
    // Fetch the block infos at each interval (here 5sec)
    const intervalId = setInterval(() => {
      fetchBlockHash();
    }, interval ?? 5000);
    return () => clearInterval(intervalId);
  }, [interval, fetchBlockHash]);

  return (
    <BlockHashContext.Provider value={block}>
      {children}
    </BlockHashContext.Provider>
  );
}
