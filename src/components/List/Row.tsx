import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Cell } from "./Cell";
import User from "./User";
import { useUserDays } from "../../contexts/UserDaysContext";
import React from "react";
import { EmptyCell } from "./RowPlaceholder";

interface RowProps {
  userId: number;
  nom: string;
  prenom: string;
  days?: Array<{
    colorIndex: number;
    code: string;
    startTime: string;
    stopTime: string;
  }>;
}

const DayWrapper = ({
  children,
  onClick,
  isVisible = true,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isVisible?: boolean;
}) => {
  return (
    <Box
      w="full"
      h="full"
      onClick={onClick}
      opacity={isVisible ? 1 : 0.3}
      cursor="pointer"
      transition="opacity 0.2s"
    >
      {children}
    </Box>
  );
};

const Row = React.memo(({ userId, nom, prenom, days = [] }: RowProps) => {
  const { deleteDay } = useUserDays();

  return (
    <Box height="80px" w="full" paddingTop="2px" paddingBottom="2px">
      <Grid
        templateColumns="200px repeat(30, 50px)"
        gap={2}
        alignItems="center"
        w="full"
      >
        <GridItem style={{ position: "sticky", left: 0 }} zIndex={1}>
          <User nom={nom} prenom={prenom} />
        </GridItem>

        {days.map((day, dayIndex) => {
          return (
            <GridItem key={dayIndex} zIndex={0}>
              <DayWrapper onClick={() => deleteDay(userId, dayIndex)}>
                {day?.code ? (
                  <Cell
                    text={day.code}
                    colorIndex={day.colorIndex}
                    startTime={day.startTime}
                    stopTime={day.stopTime}
                  />
                ) : (
                  <EmptyCell />
                )}
              </DayWrapper>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
});

export default Row;
