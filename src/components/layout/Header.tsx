import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

import { ThemeToggle } from "components/layout";
import { WalletConnect } from "components/wallet";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Flex direction="column">
          <Link href="/">Full dApp Workshop (StarknetCC)</Link>
          <Text mt={2} fontSize="sm" fontWeight="normal">By Alpha Road team</Text>
        </Flex>
      </Heading>

      <Box marginLeft="auto">
        <ThemeToggle />
        <WalletConnect />
      </Box>
    </Flex>
  );
};

export default Header;
