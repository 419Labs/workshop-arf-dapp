import { Flex, Box } from "@chakra-ui/react";

import CTASection from "components/samples/CTASection";
import HelloText from "components/samples/HelloText";
import { MintTokens, Transactions } from "components/wallet";

const Home = () => {
  return (
    <Flex mb={8} w="full" h="full" flexDirection="column">
      <HelloText />
      <Box flex="1 1 auto">
        <Transactions />
        <MintTokens />
      </Box>
      <CTASection />
    </Flex>
  );
};

export default Home;
