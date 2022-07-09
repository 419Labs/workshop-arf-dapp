import {
  Box,
  Button,
  Code,
  Flex,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { useStarknet } from "context";

const RegisterWhitelist = () => {
  const CONTRACT_ADDRESS =
    "0x06a09ccb1caaecf3d9683efe335a667b2169a409d19c589ba1eb771cd210af75";

  const { connected } = useStarknet();
  const { colorMode } = useColorMode();

  // const { getSelectorFromName } = stark;
  // const selector = getSelectorFromName("mint");

  const mintTokens = async () => {
    /* const mintTokenResponse = await library.addTransaction({
      type: "INVOKE_FUNCTION",
      contract_address: CONTRACT_ADDRESS,
      entry_point_selector: selector,
      calldata: [
        "25337092028752943692105536859798085962999747221745650943814125673320853150",
        "10000000000000000000",
        "0",
      ],
    }); */
    // eslint-disable-next-line no-console
    console.log("mintTokenResponse");
  };

  return (
    <Box>
      <Text as="h2" marginTop={4} fontSize="2xl">
        Register for whitelist
      </Text>
      <Flex direction="column">
        <Text>Access controller Contract:</Text>
        <Code marginTop={4} w="fit-content">
          <Link
            isExternal
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            href={`https://voyager.online/contract/${CONTRACT_ADDRESS}`}
          >
            {CONTRACT_ADDRESS}
          </Link>
        </Code>
        {connected && (
          <Button
            my={4}
            w="fit-content"
            onClick={() => {
              mintTokens();
            }}
          >
            Mint Tokens
          </Button>
        )}
        {!connected && (
          <Box
            backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
            padding={4}
            marginTop={4}
            borderRadius={4}
          >
            <Box fontSize="md">Connect your wallet to mint test tokens.</Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default RegisterWhitelist;
