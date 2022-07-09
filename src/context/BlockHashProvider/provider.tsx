import React from "react";

import { useStarknet } from "../StarknetProvider";

import { BlockHashContext } from "./context";

interface BlockHashProviderProps {
  children: React.ReactNode;
  interval?: number;
}

export function BlockHashProvider({
  interval,
  children,
}: BlockHashProviderProps): JSX.Element {
  const { provider } = useStarknet();
  const [blockHash, setBlockHash] = React.useState<string | undefined>(
    undefined
  );

  const fetchBlockHash = React.useCallback(() => {
    provider.getBlock().then((block) => {
      setBlockHash(block.block_hash);
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
    <BlockHashContext.Provider value={blockHash}>
      {children}
    </BlockHashContext.Provider>
  );
}
