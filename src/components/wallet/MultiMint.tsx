import {
  Box,
  Button,
  Code,
  Flex,
  Link,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useState } from "react";
import {
  AccountInterface,
  AddTransactionResponse,
  CallContractResponse,
  Invocation,
} from "starknet";
import { toFelt } from "starknet/utils/number";
import { bnToUint256, uint256ToBN } from "starknet/utils/uint256";

import { useContract } from "../../context/ContractProvider";
import {
  ARF_BTC_ERC20_CONTRACT_ADDRESS,
  ARF_ETH_ERC20_CONTRACT_ADDRESS,
} from "../../contracts/addresses";
import { useStarknet, useTransactions } from "context";

interface TokenState {
  address: string;
  balance: number;
  // Here you can fetch infos from token on-chain
}

// Multi mint component
const MultiMint = () => {
  // Get account & connection status from Starknet Manager
  const { connected, account } = useStarknet();
  const { colorMode } = useColorMode();
  // Get erc20 contract
  const { erc20Contract } = useContract();
  const { addTransaction } = useTransactions();

  // Init the local state of the component
  // Is the transaction loading
  const [isLoading, setLoading] = useState(false);
  // Balance of tokens
  const [balances, setBalances] = useState<TokenState[]>([
    {
      address: ARF_BTC_ERC20_CONTRACT_ADDRESS,
      balance: -1,
    },
    {
      address: ARF_ETH_ERC20_CONTRACT_ADDRESS,
      balance: -1,
    },
  ]);

  // Update the local state balance of the given token by newBalance
  const updateBalance = (tokenAddress: string, newBalance: number) => {
    // Update state balances
    const idx = balances.findIndex((token) => token.address === tokenAddress);
    if (idx > -1) {
      const newBalances = balances;
      newBalances[idx].balance = newBalance;
      setBalances(newBalances);
    }
  };

  // Fetch balance of a token address for a specific account & update the state as well
  // TODO: use the 'erc20Contract' to call 'balanceOf' function of the tokenAddress contract for the accountAddress
  // TODO: Update the local state with the response (setLoading) & call updateBalance to update to balances state
  // TODO: see https://www.starknetjs.com/docs/API/contract#creating-an-instance
  // TODO: see https://github.com/419Labs/workshop-arf-dapp#helps
  const getBalance = async (tokenAddress: string, accountAddress: string) => {
    setLoading(true);
    // TODO FILL ME
  };

  // Mint 1k tokens for each token in tokenAddresses as multicall
  // TODO: use the 'erc20Contract' to execute 'freeMint' function of each tokenAddress contract for the given account
  // TODO: Update the local state with the response (setLoading)
  // TODO: Add transaction to the transaction manager (addTransaction)
  // TODO: see https://github.com/0xs34n/starknet.js/blob/8969decf73cb62096da8804c37be135f624ac777/src/account/interface.ts#L63
  const mint = async (
    accountToUse: AccountInterface,
    tokenAddresses: string[]
  ) => {
    setLoading(true);
    // TODO FILL ME
  };

  // UI part, you don't need to touch it (but you can if you want to improve :D)
  return (
    <Box>
      <Text as="h2" marginTop={4} fontSize="2xl">
        Multi-call mint tokens
      </Text>
      <Flex direction="column">
        <Text mt={4}>arfBTC balance: {balances[0].balance} | Contract:</Text>
        <Code mt={2} w="fit-content">
          <Link
            isExternal
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            href={`https://voyager.online/contract/${ARF_BTC_ERC20_CONTRACT_ADDRESS}`}
          >
            {ARF_BTC_ERC20_CONTRACT_ADDRESS}
          </Link>
        </Code>
        <Text mt={4}>arfETH balance: {balances[1].balance} | Contract:</Text>
        <Code mt={2} w="fit-content">
          <Link
            isExternal
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            href={`https://voyager.online/contract/${ARF_ETH_ERC20_CONTRACT_ADDRESS}`}
          >
            {ARF_ETH_ERC20_CONTRACT_ADDRESS}
          </Link>
        </Code>
        <Box mt={4}>
          {isLoading && <Spinner />}
          {connected && account && (
            <Flex direction="row" my={4}>
              <Button
                mr={4}
                w="fit-content"
                onClick={() => {
                  // When user click on arfBTC getBalance
                  getBalance(ARF_BTC_ERC20_CONTRACT_ADDRESS, account.address);
                }}
              >
                Fetch arfBTC balance
              </Button>
              <Button
                mr={4}
                w="fit-content"
                onClick={() => {
                  // When user click on arfETH getBalance
                  getBalance(ARF_ETH_ERC20_CONTRACT_ADDRESS, account.address);
                }}
              >
                Fetch arfETH balance
              </Button>
              <Button
                w="fit-content"
                onClick={() => {
                  mint(account, [
                    ARF_ETH_ERC20_CONTRACT_ADDRESS,
                    ARF_BTC_ERC20_CONTRACT_ADDRESS,
                  ]);
                }}
              >
                Mint arfBTC & arfETH in 1 TX
              </Button>
            </Flex>
          )}
        </Box>
        {!connected && (
          <Box
            backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
            padding={4}
            marginTop={4}
            borderRadius={4}
          >
            <Box fontSize="md">Connect your wallet to see your balances.</Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default MultiMint;
