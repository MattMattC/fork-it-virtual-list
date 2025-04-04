// src/ChakraProvider.js
import { ChakraProvider } from "@chakra-ui/react";

const MyChakraProvider = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default MyChakraProvider;
