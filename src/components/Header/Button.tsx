import {
  Avatar,
  Button,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { RiCloseCircleLine } from 'react-icons/ri';

interface UserProps {
  name: string;
  image: string;
  email: string;
}

export function HeaderButton() {
  const { data: session } = useSession();

  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  if (session) {
    return (
      <Button
        bgColor="yellow.300"
        color="#000"
        onClick={() => signOut()}
        rightIcon={<Icon as={RiCloseCircleLine} h="6" w="6" />}
      >
        <Avatar
          size="sm"
          name={session.user.name}
          src={session.user.image}
          mr="2"
        />
        {isWideVersion && <Text>{session.user.name}</Text>}
      </Button>
    );
  }

  return (
    <Button
      bgColor="yellow.300"
      color="#000"
      variant="outline"
      onClick={() => signIn()}
      leftIcon={<Icon as={FcGoogle} w={5} h={5} />}
    >
      {isWideVersion && <Text>Entrar com Google</Text>}
    </Button>
  );
}
