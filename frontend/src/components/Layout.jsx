// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderComp from "./HeaderComp";
import MainPage from "./MainPage";
import MainPageUnAuth from "./MainPageUnAuth";
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

            {errorAuth === undefined ?
                <MainPage /> :
                <MainPageUnAuth />
            }

            {/* <SwaggerUI url="/api/openapi" /> */}

            <Footer />
        </Flex>

    )
}

