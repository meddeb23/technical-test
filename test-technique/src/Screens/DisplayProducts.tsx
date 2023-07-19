import React, { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { Api } from "../axiosConfig";
import { Product } from "../models/Product";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

const DisplayProducts: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchTerm, setsearchTerm] = useState<string>("");

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    Api.get("/all").then(({ data }) => setProducts(data.products as Product[]));
  };

  const deleteProduct = (p: Product) => {
    Api.delete(`/${p.name}`, { data: p }).then(() => {
      const list = products?.filter((i) => i.name !== p.name) as Product[];
      setProducts(list);
    });
  };

  return (
    <>
      <HStack m={10}>
        <Input
          placeholder="Search for a product"
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <Button
          colorScheme="teal"
          onClick={() => {
            searchTerm.length !== 0 && navigate("/search/" + searchTerm);
          }}
        >
          Search
        </Button>
      </HStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>product name</Th>
              <Th isNumeric>unit price</Th>
              <Th isNumeric>Quantity</Th>
              <Th>Action</Th>
              <Th>
                <Link to="/add">
                  <Button colorScheme="green">new</Button>
                </Link>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map((p, idx) => (
                <Tr key={`${p.name + idx}`}>
                  <Td>{idx}</Td>
                  <Td>
                    <Link to={`/${p.name}`}>{p.name}</Link>
                  </Td>
                  <Td isNumeric>{p.unitPrice}</Td>
                  <Td isNumeric>{p.quantity}</Td>
                  <Td>
                    <HStack>
                      <Link to={`/${p.name}/update`}>
                        <Button colorScheme="blue">update</Button>
                      </Link>

                      <Button
                        colorScheme="red"
                        onClick={() => deleteProduct(p)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayProducts;
