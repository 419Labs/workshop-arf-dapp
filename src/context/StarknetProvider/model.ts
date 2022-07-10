import { AccountInterface, defaultProvider, ProviderInterface } from "starknet";

export interface StarknetState {
  account?: AccountInterface;
  connected?: boolean;
  connectBrowserWallet: () => void;
  setConnected: (con: boolean) => void;
  provider: ProviderInterface;
}

export const STARKNET_STATE_INITIAL_STATE: StarknetState = {
  account: undefined,
  connected: false,
  connectBrowserWallet: () => undefined,
  setConnected: () => undefined,
  provider: defaultProvider,
};
