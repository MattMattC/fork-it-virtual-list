// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import SimpleListPage from "./pages/SimpleListPage";
import VirtualListPage from "./pages/VirtualListPage";
import { Box, Button } from "@chakra-ui/react";
import { UserDaysProvider, useUserDays } from "./contexts/UserDaysContext";

const App = () => {
  return (
    <Router>
      <UserDaysProvider>
        <Box height="100vh" width="100vw" display="flex" flexDirection="column">
          <NavButtons />
          <Box width="100%" flex="1" overflow="auto">
            <Routes>
              <Route path="/simple-list" element={<SimpleListPage />} />
              <Route path="/virtual-list" element={<VirtualListPage />} />
            </Routes>
          </Box>
        </Box>
      </UserDaysProvider>
    </Router>
  );
};

const NavButtons = () => {
  const location = useLocation();
  const [nodeCount, setNodeCount] = React.useState(0);
  const { users } = useUserDays();

  React.useEffect(() => {
    const countNodes = () => {
      const count = document.querySelectorAll("*").length;
      setNodeCount(count);
    };

    const observer = new MutationObserver(countNodes);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    countNodes();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box p={4}>
      <Box mb={2} fontSize={60}>
        nodes: {nodeCount}
      </Box>

      <Box mb={2} fontSize={60}>
        People number: {users.length}
      </Box>
      <Button as={Link} to="/simple-list" mr={2} colorScheme={"blue"}>
        Simple List
      </Button>

      {/* TODO: deactive */}
      <Button
        as={Link}
        to="/virtual-list"
        colorScheme={location.pathname === "/virtual-list" ? "blue" : "gray"}
      >
        Virtual List
      </Button>
    </Box>
  );
};

export default App;
