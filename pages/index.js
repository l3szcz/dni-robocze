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
import Head from "next/head";

const Index = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays } = current.context;
  return (
    <Box p={6} h="100vh" bg="gray.50">
      <Head>
        <title>Kalkulator Dni Roboczych</title>
      </Head>
      <Box width={{ base: "100%", md: "lg" }} mx="auto">
        <Heading as="h1" mb={8}>
          Kalkulator Dni Roboczych
        </Heading>
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
    </Box>
  );
};

export default Index;
