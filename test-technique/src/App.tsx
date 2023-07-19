import {
  ChakraProvider,
  Center,
  Box,
  HStack,
  Heading,
  Link as CLink,
} from "@chakra-ui/react";
import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import {
  AddProduct,
  DisplayProducts,
  ProductDetail,
  ProductSearch,
} from "./Screens";

interface Props {}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DisplayProducts />,
  },
  {
    path: "/search/:searchTerm",
    element: <ProductSearch />,
  },
  {
    path: "/:name",
    element: <ProductDetail />,
  },
  {
    path: "/:name/update",
    element: <AddProduct />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
]);

const App: React.FC<Props> = () => {
  return (
    <ChakraProvider>
      <Box minHeight="100vh">
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
