import React from "react";

import { Box } from "@chakra-ui/react";
import Row from "../components/List/Row";
import { useUserDays } from "@/contexts/UserDaysContext";

const SimpleListPage = () => {
  const { users } = useUserDays();

  return (
    <Box height="100%" width="100%" overflowX="auto">
      <Box height="100%" overflowX="auto" p={4}>
        {users.map((user, index) => (
          <Row
            key={index}
            userId={index}
            nom={user.nom}
            prenom={user.prenom}
            colors={user.colors}
            days={user.days}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SimpleListPage;
