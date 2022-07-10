import React from "react";

import { useStarknet } from "../StarknetProvider";

import { BlockHashContext } from "./context";
import { BLOCK_STATE_INITIAL_STATE, BlockState } from "./model";
import {toFelt} from "starknet/utils/number";

interface BlockHashProviderProps {
  children: React.ReactNode;
  interval?: number;
}

export function BlockHashProvider({
  interval,
  children,
}: BlockHashProviderProps): JSX.Element {
  const { provider } = useStarknet();
  const [block, setBlock] = React.useState<BlockState>(
    BLOCK_STATE_INITIAL_STATE
  );

  const fetchBlockHash = React.useCallback(() => {
    provider.getBlock().then((newBlock) => {
      setBlock({
        blockHash: newBlock.block_hash,
        blockNumber: toFelt(newBlock.block_number),
        gasPrice: newBlock.gas_price,
      });
    });
  }, [provider]);

  React.useEffect(() => {
    fetchBlockHash();
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
