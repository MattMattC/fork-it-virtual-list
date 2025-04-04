import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react";

interface RowPlaceholderProps {
  dayCount?: number;
}

export const EmptyCell = () => {
  return (
    <Box 
      border="1px solid #444" 
         w="50px"
      h="50px"
      opacity={0.2}
      bg="gray.700"
    />
  );
};

const UserPlaceholder = () => {
  return (
    <Box 
      bg="gray.700" 
      p={3} 
      h="full" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center"
    >
      <Skeleton height="14px" width="80%" mb={1} />
      <Skeleton height="10px" width="60%" />
    </Box>
  );
};

const RowPlaceholder = ({ dayCount = 30 }: RowPlaceholderProps) => {
  // Créer un tableau des jours vides
  const emptyCells = Array.from({ length: dayCount }, (_, index) => index);

  return (
    <Box
      height="70px"
      border="1px solid gray"
      w="full"
      opacity={0.7}
    >
      <Grid
        templateColumns="200px repeat(30, 50px)"
        gap={2}
        alignItems="center"
        w="full"
      >
        <GridItem style={{ position: "sticky", left: 0 }} zIndex={5}>
          <UserPlaceholder />
        </GridItem>
        
        {emptyCells.map((_, index) => (
          <GridItem key={index} zIndex={4}>
            <EmptyCell />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default RowPlaceholder; 