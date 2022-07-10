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
import { useCallback, useEffect, useState } from "react";
import { AddTransactionResponse, CallContractResponse } from "starknet";
import { toFelt } from "starknet/utils/number";

import { useContract } from "../../context/ContractProvider";
import { useBlock, useStarknet, useTransactions } from "context";

const RegisterWhitelist = () => {
  const { connected, account } = useStarknet();
  const { colorMode } = useColorMode();
  const { accessControllerContract } = useContract();
  const { addTransaction } = useTransactions();
  const { blockHash } = useBlock();
  const [isWhitelisted, setWhitelisted] = useState(false);
  const [freeSlots, setFreeSlots] = useState(-1);
  const [isLoading, setLoading] = useState(false);

  const checkWhitelisted = async (accountAddress: string) => {
    setLoading(true);
    accessControllerContract
      .isAllowed(accountAddress)
      .then((response: CallContractResponse) => {
        // eslint-disable-next-line
        // @ts-ignore
        setWhitelisted(parseInt(toFelt(response.is_allowed), 10) > 0);
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error while check for whitelist", e);
      });
  };

  const getFreeSlotsCount = useCallback(() => {
    setLoading(true);
    accessControllerContract
      .freeSlotsCount()
      .then((response: CallContractResponse) => {
        // eslint-disable-next-line
        // @ts-ignore
        setFreeSlots(parseInt(toFelt(response.free_slots_count), 10));
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error while get free slots", e);
      });
  }, [accessControllerContract]);

  // Fetch free slots on every block
  useEffect(() => {
    getFreeSlotsCount();
  }, [blockHash, getFreeSlotsCount]);

  const registerToWhitelist = async () => {
    setLoading(true);
    accessControllerContract
      .invoke("register", [])
      .then((response: AddTransactionResponse) => {
        // eslint-disable-next-line no-console
        addTransaction(response);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error while register for whitelist", e);
      });
  };

  return (
    <Box>
      <Text as="h2" marginTop={4} fontSize="2xl">
        Register for whitelist
      </Text>
      <Flex direction="column">
        <Text>Access controller Contract:</Text>
        <Code mt={4} w="fit-content">
          <Link
            isExternal
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            href={`https://voyager.online/contract/${accessControllerContract.address}`}
          >
            {accessControllerContract.address}
          </Link>
        </Code>
        <Text mt={4}>Free slots: {freeSlots > -1 ? freeSlots : "-"}</Text>
        {/* If user is whitelisted show congrats, else display button to register */}
        <Box mt={4}>
          {isWhitelisted && (
            <Box fontSize="md">Congrats! You are whitelisted</Box>
          )}
          {isLoading && <Spinner />}
          {connected && account && (
            <Flex direction="row" my={4}>
              <Button
                mr={4}
                w="fit-content"
                onClick={() => {
                  checkWhitelisted(account.address);
                }}
              >
                Check whitelisted
              </Button>
              <Button
                w="fit-content"
                onClick={() => {
                  registerToWhitelist();
                }}
              >
                Register to whitelist
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
            <Box fontSize="md">
              Connect your wallet to see your registration or register to
              whitelist.
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default RegisterWhitelist;
