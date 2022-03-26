import { Box, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { PreviewPost } from '../components/PreviewPost';

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <>
      <Head>
        <title>Blog.Star | Página Inicial</title>
      </Head>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={isWideVersion ? 20 : 10}>
        <PreviewPost />
        <PreviewPost />
        <PreviewPost />
      </Box>
    </>
  );
}
