import { connect } from "get-starknet";
import { toast } from "material-react-toastify";
import React from "react";

// Here we import the needed Interfaces of the StarknetJS & default provider
import { AccountInterface, defaultProvider, ProviderInterface } from "starknet";

import { StarknetState } from "./model";

// Internal state management
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

// Internal reducer
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

// Start of Starknet manager
const useStarknetManager = (): StarknetState => {
  // Init the reducer, & set the provider to default one
  // TODO: set the default provider as initial provider
  const [state, dispatch] = React.useReducer(reducer, {
    provider: ProviderInterface.prototype /* TODO REPLACE ME */,
  });

  const { account, connected, provider } = state;

  // Connect the user wallet
  // Display the "Wallet chooser" modal
  // TODO: use 'connect' & 'enable' function of get-starknet lib to let user choose a wallet to connect
  // TODO: get account & provider after connection
  // TODO: see https://github.com/starknet-community-libs/get-starknet#readme
  const connectBrowserWallet = React.useCallback(async () => {
    try {
      // TODO FILL ME
      dispatch({
        type: "set_account",
        account: undefined /* TODO REPLACE ME */,
      });
      dispatch({
        type: "set_provider",
        provider: undefined /* TODO REPLACE ME */,
      });
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

  // Set state as connected
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
