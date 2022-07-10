import { Box, Text, useColorMode } from "@chakra-ui/react";

import { useBlock } from "context";

const Transactions = () => {
  const { blockHash, blockNumber, gasPrice } = useBlock();
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Text as="h2" mt={4} fontSize="2xl">
        Current Block
      </Text>
      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        p={4}
        mt={4}
        borderRadius={4}
        fontSize="md"
      >
        <Text>Hash: {blockHash}</Text>
        <Text>Number: {blockNumber}</Text>
        <Text>Gas price: {gasPrice}</Text>
      </Box>
    </Box>
  );
};

export default Transactions;
