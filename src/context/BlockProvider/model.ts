export interface BlockState {
  blockHash: string;
  blockNumber: string;
  gasPrice: string;
}

export const BLOCK_STATE_INITIAL_STATE: BlockState = {
  blockHash: "",
  blockNumber: "",
  gasPrice: "",
};
