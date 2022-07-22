import { Contract, json } from "starknet";

import accessControllerAbi from "../../contracts/abis/AccessController.json";
import ERC20Abi from "../../contracts/abis/ARF_ERC20.json";
import { ACCESS_CONTROLLER_CONTRACT_ADDRESS } from "../../contracts/addresses";

// TODO: use 'json' from StarknetJS to parse the ERC20 & AccessController ABI's
const compiledERC20 = json.parse("[]")/*TODO REPLACE ME*/;
const compiledAccessController = json.parse("[]")/*TODO REPLACE ME*/;

export interface ContractState {
  erc20Contract: Contract;
  accessControllerContract: Contract;
}

// Init the state with bot erc20 & access controller contracts
export const CONTRACT_INITIAL_STATE: ContractState = {
  erc20Contract: new Contract(compiledERC20, ""),
  accessControllerContract: new Contract(
    compiledAccessController,
    ACCESS_CONTROLLER_CONTRACT_ADDRESS
  ),
};
