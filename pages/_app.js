import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";

const theme = {
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.50",
      },
    },
  },
};

const extededTheme = extendTheme(theme);

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={extededTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
