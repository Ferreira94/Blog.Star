import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';

import { Header } from '../components/Header';
import { PreviewPost } from '../components/PreviewPost';
import { ActiveLink } from '../components/ActiveLink';

import { createClient } from '../services/prismic';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostProps {
  posts: Post[];
}

export default function Home({ posts }: PostProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <>
      <Head>
        <title>Página Inicial | Blog.Star</title>
      </Head>
      <Header />

      <Flex
        justifyContent="center"
        alignItems="center"
        mx="auto"
        px={isWideVersion ? 10 : 5}
        py={6}
        as="header"
      >
        <ActiveLink href={'/'}>
          <Text
            fontSize={isWideVersion ? 'xl' : 'md'}
            fontWeight="700"
            cursor="pointer"
          >
            Histórias
          </Text>
        </ActiveLink>
        <Text fontSize={isWideVersion ? 'xl' : 'md'} fontWeight="700" mx="3">
          /
        </Text>
        <ActiveLink href={'/characters'}>
          <Text
            fontSize={isWideVersion ? 'xl' : 'md'}
            fontWeight="700"
            cursor="pointer"
          >
            Personagens
          </Text>
        </ActiveLink>
      </Flex>

      <Box
        maxW={1120}
        px={isWideVersion ? 20 : 5}
        mx="auto"
        my={isWideVersion ? 10 : 5}
      >
        {posts.map(post => {
          return (
            <PreviewPost
              key={post.uid}
              data={post.data}
              first_publication_date={post.first_publication_date}
              uid={post.uid}
            />
          );
        })}
      </Box>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const postsResponse = await client.getAllByType('posts');

  const posts = postsResponse.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: { posts },
  };
}
