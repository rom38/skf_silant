// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderComp from "./HeaderComp";
import MainPage from "./MainPage";
import { Footer } from "./FooterComp";
import { Box } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const Layout = () => {
    return (<>
        <HeaderComp />
        <MainPage />
        <Box mb='5' bg='sil-b' w='100%' p={4} ></Box >
        <SwaggerUI url="/api/openapi" />
        <Footer />
    </>
    )
}

