import {
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from '../../components/Header';

import { createClient } from '../../services/prismic';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <>
      <Head>
        <title>{post.data.title} | Blog.Star</title>
      </Head>
      <Header />

      <Box
        maxW={1120}
        px={isWideVersion ? 20 : 5}
        mx="auto"
        my={isWideVersion ? 10 : 5}
      >
        <Image src={post.data.banner.url} m="0 auto" />

        <Box as="article" mt="10">
          <Text fontSize="3xl" fontWeight="700">
            {post.data.title}
          </Text>

          <Flex my="1">
            <Flex alignItems="center">
              <Icon as={RiCalendarLine} mr="1" />
              <Text>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={RiUserLine} mr="1" ml="6" />
              <Text>{post.data.author}</Text>
            </Flex>
          </Flex>

          <Box>
            {post.data.content.map(content => (
              <Box key={content.heading}>
                <Text fontSize="2xl" fontWeight="700" mt="10" mb="2">
                  {content.heading}
                </Text>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                ></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();
  const posts = await client.getAllByType('posts');

  const paths = posts.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const client = createClient();

  const response = await client.getByUID('posts', String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 Minutos
  };
};
