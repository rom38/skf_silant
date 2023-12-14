// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderComp from "./HeaderComp";
import MainPage from "./MainPage";
import { Footer } from "./FooterComp";
import { Box, Button, Center } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useState } from "react";
import { HStack, Flex } from "@chakra-ui/react";
import { useGetIsAuthQuery } from "../services/apiScan";

export const Layout = () => {
    const [page, setPage] = useState("main")
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();

    return (
        <Flex flexDir="column" gap="1rem">
            <HeaderComp />
            <Center>
                <HStack >
                    <Button colorScheme="silant-b" onClick={() => setPage("swagger")}>Swagger</Button>
                    <Button colorScheme="silant-b" onClick={() => setPage("main")}>Главная страница</Button>
                    <Button colorScheme="silant-b"  >Общая информация </Button>
                    <Button colorScheme="silant-b" >Техническое обслуживание </Button>
                    <Button colorScheme="silant-b"  >Рекламации </Button>
                </HStack>
            </Center>
            {page === "main" &&
                <MainPage />}
            {page === "swagger" &&
                <SwaggerUI url="/api/openapi" />
            }

            <Footer />
        </Flex>

    )
}

