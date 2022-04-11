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

export default function Character({ character }) {
  console.log(character);
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
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
          <Text fontSize="2xl" fontWeight="700" cursor="pointer" mx="10">
            Personagens
          </Text>
        </ActiveLink>
        <Text fontSize="2xl" fontWeight="700">
          /
        </Text>
        <ActiveLink href={`/characters/${character.uid}`}>
          <Text fontSize="2xl" fontWeight="700" cursor="pointer" mx="10">
            {character.data.name}
          </Text>
        </ActiveLink>
      </Flex>
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

  console.log(response);

  const character = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      name: response.data.name,
      breed: response.data.breed,
      category: response.data.category,
      thumbnail: response.data.thumbnail,
    },
  };

  return {
    props: { character },
    revalidate: 60 * 30, // 30 Minutos
  };
};
