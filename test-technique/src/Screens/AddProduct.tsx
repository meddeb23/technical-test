import React, { useEffect } from "react";
import { AxiosError } from "axios";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Center,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Button,
  HStack,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Api } from "../axiosConfig";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Product } from "../models/Product";
interface Props {}

const AddProduct: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUpdateMode = pathname.split("/")[2] === "update";
  const [name, setName] = React.useState("");
  const [error, seterror] = React.useState(null);
  const [price, setprice] = React.useState(0);
  const [qt, setqt] = React.useState(0);

  const { name: nameParam } = useParams();

  useEffect(() => {
    if (isUpdateMode) {
      Api.get(`/${nameParam}`)
        .then(({ data }: { data: Product }) => {
          setName(data.name);
          setprice(data.unitPrice);
          setqt(data.quantity);
        })
        .catch((err) => console.error(err));
    }
  }, [nameParam]);

  const addProduct = () => {
    Api.post("/", {
      name,
      unitPrice: price,
      quantity: qt,
    })
      .then(() => {
        seterror("");
        navigate("/");
      })
      .catch((err: AxiosError) => {
        seterror(err.response?.data.error);
      });
  };
  const updateProduct = () => {
    Api.put(`/${name}`, {
      name,
      unitPrice: price,
      quantity: qt,
    })
      .then(() => {
        seterror(null);
        navigate("/" + name);
      })
      .catch((err: AxiosError) => {
        seterror(err.response?.data.error);
      });
  };

  return (
    <Center>
      <Container maxWidth="container.md" mt="4rem">
        <VStack spacing={10}>
          <FormControl isRequired isInvalid={!!error}>
            <FormLabel>Product name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
            />
            <FormHelperText>Product name should be unique</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>unit price</FormLabel>
            <NumberInput
              value={price}
              onChange={(_, v) => setprice(v)}
              max={50}
              min={10}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>quantity</FormLabel>
            <NumberInput value={qt} onChange={(_, v) => setqt(v)} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <HStack width="full">
            <Text>{error}</Text>
            {!isUpdateMode ? (
              <Button mt={4} colorScheme="teal" onClick={addProduct}>
                Submit
              </Button>
            ) : (
              <Button mt={4} colorScheme="teal" onClick={updateProduct}>
                update
              </Button>
            )}
          </HStack>
        </VStack>
      </Container>
    </Center>
  );
};

export default AddProduct;
