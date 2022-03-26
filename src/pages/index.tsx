import { Box, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { PreviewPost } from '../components/PreviewPost';
import { createClient } from '../services/prismic';

export default function Home({ posts }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  console.log(posts);

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

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const posts = await client.getAllByType('posts');

  console.log(posts);

  return {
    props: { posts },
  };
}
