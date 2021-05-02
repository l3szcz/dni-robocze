import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMachine } from "@xstate/react";
import Head from "next/head";
import React from "react";
import { workDaysMachine } from "../src/workDaysMachine";

const Index = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays } = current.context;
  console.log(
    "🚀 ~ file: index.js ~ line 25 ~ Index ~ dateStart, dateEnd, workDays",
    dateStart,
    dateEnd,
    workDays
  );
  return (
    <Box p={6} h="100vh" bg="gray.50">
      <Head>
        <title>Kalkulator Dni Roboczych</title>
        <meta
          name="description"
          content="Dzięki kalkulatorowi dowiesz się ile jest dni roboczych pomiędzy dwoma podanymi datami lub kiedy wypada data końcowa od określonej liczby dni roboczych. Policz dni robocze!"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Box width={{ base: "100%", md: "2xl" }} mx="auto">
        <Heading as="h1" mb={2}>
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
            <NumberInput
              id="work-days"
              name="work-days"
              type="text"
              placeholder="Dni robocze"
              value={workDays}
              onChange={(_, valueAsNumber) =>
                send("WORK_DAYS", { value: valueAsNumber })
              }
            >
              <NumberInputField />
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
        <Stack color="gray.500" mt={4} spacing={4}>
          <Text>
            Kalkulator dni roboczych powstał aby w łatwy i szybki sposób można
            było wyliczyć wszystkie dni robocze w danym przedziale czasu. Dniami
            odpoczynku są soboty i niedziele, a dni robocze - od poniedziałku do
            piątku. Kalkulator dni roboczych to bardzo dobre narzędzie do
            ustalania wszelkiego rodzaju informacji dotyczących naszych dni
            pracujących.
          </Text>
          <Heading as="h2" size="md">
            Licznik dni roboczych
          </Heading>
          <Text>
            Licznik dni roboczych liczy jako dni robocze wszystkie dni od
            poniedziałku do piątku, niezależnie od tego, czy w któryś z nich
            wypada święto. Jeśli chcesz wiedzieć, ile dni pracy pozostało Ci do
            końca roku, wystarczy wpisać datę początkową i końcową okresu, który
            Cię interesuje. Wynik pokaże Ci wszystkie dni do tego terminu, z
            wyłączeniem weekendów. Na przykład, jeśli musisz dostarczyć projekt
            do 1 grudnia 2020 r., wprowadź tę datę w polu "data końcowa", a
            jeśli zaczynasz od dzisiaj, pozostaw pole "data początkowa" tak, jak
            jest domyślnie. Ilość dni roboczych pomiędzy datami pojawi się
            automatycznie. W ten sposób dowiesz się, ile dni roboczych masz do
            wykonania. Jeśli będziesz mógł pracować nad tym projektem dopiero od
            1 listopada, po prostu wprowadź go jako datę początkową.
          </Text>
          <Heading as="h2" size="md">
            Kalkulator dni pracujących
          </Heading>
          <Text>
            Dzień roboczy, zwany również dniem pracującym to każdy oficjalny
            dzień roboczy. W większości regionów obejmuje to dni od poniedziałku
            do piątku (włącznie). Nie obejmuje weekendów i dni ustawowo wolnych
            od pracy; mogą to być święta religijne lub narodowe. W miesiącu jest
            około 20 dni roboczych.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Index;
