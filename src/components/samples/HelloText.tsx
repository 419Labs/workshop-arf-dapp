import {
  Box,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

import { useStarknet } from "context";

const HelloText = () => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });
  const { account } = useStarknet();

  return (
    <>
      <Heading as="h2" fontSize="3xl">
        Hello,{" "}
        {account
          ? `${account.address.substring(0, 4)}...${account.address.substring(
              account.address.length - 4
            )}`
          : "anon"}
      </Heading>

      {!account && (
        <Box
          backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
          padding={4}
          marginTop={4}
          borderRadius={4}
        >
          <Box fontSize={textSize}>Connect your wallet to interact!</Box>
        </Box>
      )}
    </>
  );
};

export default HelloText;
