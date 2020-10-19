import React from "react";
import { useMachine } from "@xstate/react";
import { workDaysMachine } from "../src/workDaysMachine";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  useColorMode,
} from "@chakra-ui/core";

const Index = () => {
  const [current, send] = useMachine(workDaysMachine);
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.800" };

  const { dateStart, dateEnd, workDays } = current.context;
  return (
    <Box p={6} h="100vh" bg={bgColor[colorMode]}>
      {/* <Box position="relative">
        <IconButton
          icon={colorMode === "dark" ? "sun" : "moon"}
          position="absolute"
          variant="ghost"
          right={0}
          onClick={toggleColorMode}
        />
      </Box> */}
      {/* <Stack isInline justifyContent="center"> */}
      <Heading as="h1" mb={8}>
        Kalkulator Dni Roboczych
      </Heading>
      {/* <IconButton
          variant="ghost"
          icon="close"
          type="button"
          color="gray.300"
          title="Wyczyść"
          onClick={() => send("CLEAR")}
        /> */}
      {/* </Stack> */}
      <Stack as="form" spacing={4}>
        <FormControl>
          <FormLabel htmlFor="date-start">Data początkowa</FormLabel>
          <Input
            id="date-start"
            name="date-start"
            type="date"
            placeholder="Data początkowa"
            value={dateStart}
            onChange={(e) => send("DATE_START", { value: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="work-days" w="full">
            Dni robocze{" "}
            <FormHelperText as="span" ml={4}>
              dni tygodnia bez sobót, niedziel i świąt państwowych
            </FormHelperText>
          </FormLabel>
          <NumberInput>
            <NumberInputField
              id="work-days"
              name="work-days"
              type="text"
              placeholder="Dni robocze"
              value={workDays}
              onChange={(e) => send("WORK_DAYS", { value: e.target.value })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="date-end">Data końcowa</FormLabel>
          <Input
            id="date-end"
            name="date-end"
            type="date"
            placeholder="Data końcowa"
            value={dateEnd}
            onChange={(e) => send("DATE_END", { value: e.target.value })}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Index;
