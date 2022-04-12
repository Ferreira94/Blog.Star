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
import { ActiveLink } from '../../components/ActiveLink';
import { json } from 'stream/consumers';

interface Character {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string;
  data: {
    name: string;
    quote: { text: string }[];
    breed: string;
    category: string;
    author: string;
    thumbnail: {
      url: string;
    };
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface CharacterProps {
  character: Character;
}

export default function Character({ character }: CharacterProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Head>
        <title> {character.data.name} | Blog.Star</title>
      </Head>
      <Header />

      <Flex
        justifyContent="center"
        alignItems="center"
        mx="auto"
        px={isWideVersion ? 10 : 5}
        pt={6}
        as="header"
      >
        <ActiveLink href={'/characters'}>
          <Text
            fontSize={isWideVersion ? 'xl' : 'md'}
            fontWeight="700"
            cursor="pointer"
          >
            Personagens
          </Text>
        </ActiveLink>
        <Text fontSize={isWideVersion ? 'xl' : 'md'} fontWeight="700" mx="2">
          /
        </Text>
        <ActiveLink href={`/characters/${character.uid}`}>
          <Text
            fontSize={isWideVersion ? 'xl' : 'md'}
            fontWeight="700"
            cursor="pointer"
          >
            {character.data.name}
          </Text>
        </ActiveLink>
      </Flex>

      <Box
        maxW={1120}
        px={isWideVersion ? 20 : 5}
        mx="auto"
        my={isWideVersion ? 10 : 5}
      >
        <Flex justifyContent="center">
          <Image
            src={character.data.thumbnail.url}
            maxW={isWideVersion ? '300' : '150'}
            maxH={isWideVersion ? '450' : '250'}
          />

          <Box ml={isWideVersion ? '20' : '5'}>
            <Text fontSize={isWideVersion ? 'xl' : 'md'} fontWeight="700">
              {character.data.name}
            </Text>

            <Box>
              <Flex alignItems="center">
                <Icon as={RiCalendarLine} mr="1" />
                <Text fontSize={isWideVersion ? 'md' : 'sm'}>
                  {format(
                    new Date(character.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={RiUserLine} mr="1" />
                <Text fontSize={isWideVersion ? 'md' : 'sm'}>
                  {character.data.author}
                </Text>
              </Flex>
            </Box>

            <Box maxW={isWideVersion ? '250' : '230'} mt="10">
              {character.data.quote.map(content => (
                <Text fontSize={isWideVersion ? 'md' : 's'}>
                  {content.text}
                </Text>
              ))}
            </Box>
          </Box>
        </Flex>

        <Box as="article" mt="10">
          <Box textAlign="justify">
            {character.data.content.map(content => (
              <Box key={content.heading}>
                <Text fontSize="xl" fontWeight="700" mt="10" mb="2">
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
  const characters = await client.getAllByType('characters');

  const paths = characters.map(character => {
    return {
      params: {
        slug: character.uid,
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

  const response = await client.getByUID('characters', String(slug));

  console.log(JSON.stringify(response));

  const character = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      name: response.data.name,
      quote: response.data.quote,
      breed: response.data.breed,
      category: response.data.category,
      author: response.data.author,
      thumbnail: response.data.thumbnail,
      content: response.data.story,
    },
  };

  return {
    props: { character },
    revalidate: 60 * 30, // 30 Minutos
  };
};
