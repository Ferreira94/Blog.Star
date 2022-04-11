import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';

import { ActiveLink } from '../../components/ActiveLink';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { createClient } from '../../services/prismic';

interface Character {
  uid: string;
  data: {
    name: string;
    breed: string;
    category: string;
    thumbnail: string;
  };
}

interface CharacterProps {
  characters: Character[];
}

export default function Home({ characters }: CharacterProps) {
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
        maxW={500}
        mx="auto"
        px={isWideVersion ? 10 : 5}
        py={6}
        as="header"
      >
        <ActiveLink href={'/'}>
          <Text fontSize="2xl" fontWeight="700" cursor="pointer" mx="10">
            Histórias
          </Text>
        </ActiveLink>
        <Text fontSize="2xl" fontWeight="700">
          /
        </Text>
        <ActiveLink href={'/characters'}>
          <Text fontSize="2xl" fontWeight="700" cursor="pointer" mx="10">
            Personagens
          </Text>
        </ActiveLink>
      </Flex>

      <Flex
        maxW={1120}
        px={isWideVersion ? 20 : 5}
        mx="auto"
        my={isWideVersion ? 10 : 5}
        justifyContent="center"
        flexWrap="wrap"
      >
        {characters.map(character => {
          return (
            <Card
              key={character.uid}
              uid={character.uid}
              data={character.data}
            />
          );
        })}
      </Flex>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const charactersResponse = await client.getAllByType('characters');

  const characters = charactersResponse.map(character => {
    return {
      uid: character.uid,
      data: {
        name: character.data.name,
        breed: character.data.breed,
        category: character.data.category,
        thumbnail: character.data.thumbnail.url,
      },
    };
  });

  console.log(characters);

  return {
    props: { characters },
  };
}
