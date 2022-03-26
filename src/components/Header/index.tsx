import { Box, Flex } from '@chakra-ui/react';
import { HeaderButton } from './Button';
import { Logo } from './Logo';

export function Header() {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      maxW={1120}
      mx="auto"
      px={10}
      py={6}
      as="header"
    >
      <Logo />

      <HeaderButton />
    </Flex>
  );
}
