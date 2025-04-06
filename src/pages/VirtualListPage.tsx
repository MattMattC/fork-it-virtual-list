import { TableVirtuoso } from "react-virtuoso";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import RowStateManager from "../components/List/RowStateManager";
import { useUserDays } from "../contexts/UserDaysContext";

const StickyHeader = () => (
  <thead style={{ zIndex: 20 }}>
    <Grid
      bg="white"
      height="50px"
      templateColumns="200px repeat(30, 50px)"
      gap={2}
      alignItems="center"
      w="full"
    >
      <GridItem style={{ position: "sticky", left: 0 }} zIndex={5}>
        <Box
          w="200px"
          h="50px"
          pr={2}
          pl={2}
          borderRadius="md"
          boxShadow="md"
          bg="white"
          color="black"
        >
          Users
        </Box>
      </GridItem>

      {Array.from({ length: 30 }, (_, i) => (
        <GridItem key={i} zIndex={4}>
          <Box
            w="50px"
            h="50px"
            borderRadius="md"
            _hover={{ bg: "gray.200" }}
            style={{ cursor: "pointer" }}
            position="relative"
          >
            {i}
          </Box>
        </GridItem>
      ))}
    </Grid>
  </thead>
);

const VirtualListPage = () => {
  const { users } = useUserDays();

  return (
    <Box height="100%" width="100%">
      <TableVirtuoso
        style={{ height: "100%", width: "100%" }}
        totalCount={users?.length}
        fixedItemHeight={80}
        overscan={{ main: 10, reverse: 10 }}
        fixedHeaderContent={() => <StickyHeader />}
        itemContent={(index) => (
          <RowStateManager
            userId={index}
            nom={users[index].nom}
            prenom={users[index].prenom}
            colors={users[index].colors}
            days={users[index].days}
          />
        )}
      />
    </Box>
  );
};

export default VirtualListPage;
