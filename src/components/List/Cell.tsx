import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const CELL_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E67E22",
  "#2ECC71",
];

interface ColorCellProps {
  text?: string;
  colorIndex?: number;
  startTime?: string;
  stopTime?: string;
}

export const Cell = ({
  text = "",
  colorIndex = 0,
  startTime,
  stopTime,
}: ColorCellProps) => {
  const safeColorIndex = colorIndex % CELL_COLORS.length;

  const displayText = text.slice(0, 3);

  return (
    <Box
      w="50px"
      h="50px"
      bg={CELL_COLORS[safeColorIndex]}
      borderRadius="md"
      _hover={{ bg: "gray.200" }}
      style={{ cursor: "pointer" }}
      position="relative"
    >
      <div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          style={{ userSelect: "none" }}
        >
          <Text color="white" fontSize="sm" fontWeight="bold">
            {displayText}
          </Text>

          {/* <Marker color="blue" /> */}

          {/* <MarkerList>
            <Marker color="blue" />
            <Marker color="red" />
            <Marker color="green" />
          </MarkerList> */}

          {/* <Box display="flex" flexDirection="column">
            <Text fontSize="10px">{startTime}</Text>
            <Text fontSize="10px">{stopTime}</Text>
          </Box>  */}
        </Box>
      </div>
    </Box>
  );
};

const MarkerList: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDirection="row" position="absolute" top="4px" left="4px">
      {children}
    </Flex>
  );
};

const Marker: FC<{ color?: string }> = ({ color }) => {
  return <Box w="4px" h="4px" bg={color} borderRadius="full" />;
};
