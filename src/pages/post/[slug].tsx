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
        <title>post.title | Blog.Star</title>
      </Head>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={isWideVersion ? 20 : 10}>
        <Image src={post.data.banner.url} m="0 auto" />

        <Box as="article">
          <Text>{post.data.title}</Text>
          <Box>
            <Box>
              <Flex>
                <Icon as={RiCalendarLine} />
                <Text>{post.first_publication_date}</Text>
              </Flex>
              <Flex>
                <Icon as={RiUserLine} />
                <Text>{post.data.author}</Text>
              </Flex>
              <Box>
                {post.data.content.map(content => (
                  <>
                    <Text>{content.heading}</Text>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: RichText.asHtml(content.body),
                      }}
                    ></Box>
                  </>
                ))}
              </Box>
            </Box>
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

  console.log(paths);

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

  console.log(post);

  return {
    props: { post },
    revalidate: 60 * 30, // 30 Minutos
  };
};
