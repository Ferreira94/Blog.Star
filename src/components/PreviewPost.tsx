import { Flex, Box, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';

export function PreviewPost() {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Box maxW={720} m="0 auto" mb="14">
      <Text fontSize="2xl" fontWeight="700">
        Como utilizar Hooks
      </Text>
      <Text mt="0.5" mb="4">
        Pensando em sincronização em vez de ciclos de vida.
      </Text>
      <Flex flexDirection={isWideVersion ? 'row' : 'column'}>
        <Flex alignItems="center" mr="5">
          <Icon as={RiCalendarLine} mr="1" />
          <Text>15 Mar 2022</Text>
        </Flex>
        <Flex alignItems="center">
          <Icon as={RiUserLine} mr="1" />
          <Text>Joseph Oliveira</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
