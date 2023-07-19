import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Api } from "../axiosConfig";
import { Product } from "../models/Product";
interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>();

  const { name } = useParams();

  useEffect(() => {
    Api.get(`/${name}`)
      .then(({ data }) => setProduct(data as Product))
      .catch((err) => console.error(err));
  }, [name]);

  const deleteProduct = (p: Product) => {
    Api.delete(`/${p.name}`, { data: p }).then(() => {
      navigate("/");
    });
  };
  return (
    product && (
      <Card>
        <CardHeader>
          <Heading size="md">{product.name}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Quantity
              </Heading>
              <Text pt="2" fontSize="sm">
                {product.quantity}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Unit Price
              </Heading>
              <Text pt="2" fontSize="sm">
                {product.unitPrice}
              </Text>
            </Box>
            <Box>
              <HStack>
                <Link to={`/${product.name}/update`}>
                  <Button colorScheme="blue">update</Button>
                </Link>
                <Button
                  colorScheme="red"
                  onClick={() => deleteProduct(product)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    )
  );
};

export default ProductDetail;
