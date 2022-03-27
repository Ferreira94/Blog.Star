import { Flex, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { HeaderButton } from './Button';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      maxW={970}
      mx="auto"
      px={isWideVersion ? 10 : 5}
      py={6}
      as="header"
    >
      <Link href="/">
        <Image src="/images/logo.svg" h="5" />
      </Link>

      <HeaderButton />
    </Flex>
  );
}
