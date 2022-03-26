import {
  Flex,
  Box,
  Text,
  Icon,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

export function PreviewPost({ uid, first_publication_date, data }: Post) {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Link href={`/post/${uid}`}>
      <Box maxW={720} m="0 auto" mb="14">
        <Text fontSize="2xl" fontWeight="700">
          {data.title}
        </Text>
        <Text mt="0.5" mb="4">
          {data.subtitle}
        </Text>
        <Flex flexDirection={isWideVersion ? 'row' : 'column'}>
          <Flex alignItems="center" mr="5">
            <Icon as={RiCalendarLine} mr="1" />
            <Text>
              {format(new Date(first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={RiUserLine} mr="1" />
            <Text>{data.author}</Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
