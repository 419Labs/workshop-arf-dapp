import { Box, Button, Heading, useColorMode } from "@chakra-ui/react";
import Link from "next/link";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>
        <Box textAlign="center" marginTop={4}>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Let&apos;s Head Back
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
