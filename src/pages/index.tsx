import { Box, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { PreviewPost } from '../components/PreviewPost';
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
  console.log(posts);
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
