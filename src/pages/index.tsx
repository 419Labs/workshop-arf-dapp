import { Flex, Box } from "@chakra-ui/react";

import Block from "../components/wallet/Block";
import CTASection from "components/samples/CTASection";
import HelloText from "components/samples/HelloText";
import { RegisterWhitelist, Transactions } from "components/wallet";
import MultiMint from "../components/wallet/MultiMint";

const Home = () => {
  return (
    <Flex mb={8} w="full" h="full" flexDirection="column">
      <HelloText />
      <Box flex="1 1 auto">
        <Block />
        <Transactions />
        <RegisterWhitelist />
        <MultiMint />
      </Box>
      <CTASection />
    </Flex>
  );
};

export default Home;
