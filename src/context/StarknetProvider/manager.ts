import { connect } from "get-starknet";
import { toast } from "material-react-toastify";
import React from "react";
import { AccountInterface, defaultProvider, ProviderInterface } from "starknet";

import { StarknetState } from "./model";

interface StarknetManagerState {
  account?: AccountInterface;
  connected?: boolean;
  provider: ProviderInterface;
}

interface SetAccount {
  type: "set_account";
  account?: AccountInterface;
}

interface SetProvider {
  type: "set_provider";
  provider: ProviderInterface;
}

interface SetConnected {
  type: "set_connected";
  con: boolean;
}

type Action = SetAccount | SetProvider | SetConnected;

function reducer(
  state: StarknetManagerState,
  action: Action
): StarknetManagerState {
  switch (action.type) {
    case "set_account": {
      return { ...state, account: action.account };
    }
    case "set_provider": {
      return { ...state, provider: action.provider };
    }
    case "set_connected": {
      return { ...state, connected: action.con };
    }
    default: {
      return state;
    }
  }
}

const useStarknetManager = (): StarknetState => {
  const [state, dispatch] = React.useReducer(reducer, {
    provider: defaultProvider,
  });

  const { account, connected, provider } = state;

  const connectBrowserWallet = React.useCallback(async () => {
    try {
      const starknet = await connect({ modalOptions: { theme: "dark" } }); // Let the user pick a wallet
      if (!starknet) return;
      await starknet.enable(); // connect the wallet
      if (
        starknet.isConnected &&
        starknet.provider &&
        starknet.account.address
      ) {
        dispatch({ type: "set_account", account: starknet.account });
        dispatch({ type: "set_provider", provider: starknet.provider });
      }
    } catch (e) {
      toast.error("⚠️ Argent-X wallet extension missing!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  const setConnected = React.useCallback(async (con: boolean) => {
    dispatch({ type: "set_connected", con });
    if (!con) {
      dispatch({ type: "set_account", account: undefined });
      dispatch({ type: "set_provider", provider: defaultProvider });
    }
  }, []);

  return {
    account,
    connected,
    setConnected,
    connectBrowserWallet,
    provider,
  };
};

export default useStarknetManager;
