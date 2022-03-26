import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
