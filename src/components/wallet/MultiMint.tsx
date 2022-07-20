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

const RegisterWhitelist = () => {
  const { connected, account } = useStarknet();
  const { colorMode } = useColorMode();
  const { erc20Contract } = useContract();
  const { addTransaction } = useTransactions();
  const [isLoading, setLoading] = useState(false);
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

  const updateBalance = (tokenAddress: string, newBalance: number) => {
    // Update state balances
    const idx = balances.findIndex((token) => token.address === tokenAddress);
    if (idx > -1) {
      const newBalances = balances;
      newBalances[idx].balance = newBalance;
      setBalances(newBalances);
    }
  };

  const getBalance = async (tokenAddress: string, accountAddress: string) => {
    setLoading(true);
    erc20Contract.attach(tokenAddress);
    erc20Contract
      .balanceOf(accountAddress)
      .then((response: CallContractResponse) => {
        updateBalance(
          tokenAddress,
          // eslint-disable-next-line
          // @ts-ignore
          formatEther(toFelt(uint256ToBN(response.balance)))
        );

        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error while get balance", e);
      });
  };

  const mint = async (
    accountToUse: AccountInterface,
    tokenAddresses: string[]
  ) => {
    setLoading(true);
    const amountToMint = bnToUint256(parseEther("1000").toString());
    const multiCall: Invocation[] = tokenAddresses.map((tokenAddress) => {
      return {
        contractAddress: tokenAddress,
        entrypoint: "freeMint",
        calldata: [amountToMint.low, amountToMint.high],
      };
    });
    accountToUse
      .execute(multiCall)
      .then((response: AddTransactionResponse) => {
        // eslint-disable-next-line no-console
        addTransaction(response);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error while mint tokens", e);
      });
  };

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
                  getBalance(ARF_BTC_ERC20_CONTRACT_ADDRESS, account.address);
                }}
              >
                Fetch arfBTC balance
              </Button>
              <Button
                mr={4}
                w="fit-content"
                onClick={() => {
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

export default RegisterWhitelist;
