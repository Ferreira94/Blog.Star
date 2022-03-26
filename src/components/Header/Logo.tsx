import { Flex, Image, Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Flex alignItems="center">
      <Image src="logo.png" h="9" mr={3} />
      <Text fontSize="xl" fontWeight="bold">
        Blog
      </Text>
      <Text
        fontSize="xl"
        color="yellow.400"
        fontStyle="italic"
        fontWeight="bold"
      >
        .
      </Text>
      <Text fontSize="xl" color="yellow.400" fontStyle="italic">
        Star
      </Text>
    </Flex>
  );
}
