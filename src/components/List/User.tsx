import { Box, HStack, Text, VStack } from "@chakra-ui/react";
interface UserProps {
  nom: string;
  prenom: string;
}

const User = ({ nom, prenom }: UserProps) => {
  return (
    <Box
      w="200px"
      h="70px"
      pr={2}
      pl={2}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      color="black"
    >
      <HStack h="100%" justify="space-between" w="full" alignItems="center">
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" color="black">
            {prenom}
          </Text>
          <Text color="black">{nom}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default User;
