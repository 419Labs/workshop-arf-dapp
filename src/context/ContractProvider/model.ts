import { Contract, json } from "starknet";

import accessControllerAbi from "../../contracts/abis/AccessController.json";
import ERC20Abi from "../../contracts/abis/ARF_ERC20.json";
import { ACCESS_CONTROLLER_CONTRACT_ADDRESS } from "../../contracts/addresses";

const compiledERC20 = json.parse(JSON.stringify(ERC20Abi));
const compiledAccessController = json.parse(
  JSON.stringify(accessControllerAbi)
);

export interface ContractState {
  erc20Contract: Contract;
  accessControllerContract: Contract;
}

export const CONTRACT_INITIAL_STATE: ContractState = {
  erc20Contract: new Contract(compiledERC20, ""),
  accessControllerContract: new Contract(
    compiledAccessController,
    ACCESS_CONTROLLER_CONTRACT_ADDRESS
  ),
};
