import { Box, Text, Link, Image, Flex } from '@chakra-ui/react';

interface Character {
  uid: string;
  data: {
    name: string;
    breed: string;
    category: string;
    thumbnail: string;
  };
}

export function Card({ uid, data }: Character) {
  return (
    <Link href={`/characters/${uid}`} textAlign="center" m="10">
      <Box maxW={200} bgColor="yellow.500" borderRadius="100">
        <Image
          src={data.thumbnail}
          maxW={200}
          h={250}
          borderRadius="100"
          p={0.5}
        />
      </Box>
      <Text color="gray.300">{data.name}</Text>
    </Link>
  );
}
