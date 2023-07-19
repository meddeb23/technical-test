import { Container, HStack, Heading } from "@chakra-ui/react";
import React from "react";
interface Props {}

const NavBar: React.FC<Props> = () => {
  return (
    <Container bg={"blue.100"} width="full" height={80}>
      <HStack justifyContent="space-around">
        <Heading as="h3">Technical test</Heading>
        <HStack spacing="10"></HStack>
      </HStack>
    </Container>
  );
};

export default NavBar;
