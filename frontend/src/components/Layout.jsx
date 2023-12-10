// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import style from "../styles/Layout.module.css";
import imageLogo1 from "../media/scan_logo_1.svg";
import imageLogo2 from "../media/scan_logo_2.svg";
import HeaderComp from "./HeaderComp";
import MainPage from "./MainPage";
import { Footer } from "./FooterComp";
import { Box } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const Layout = () => {
    const classActive = ({ isActive }) => isActive ? style.active : "";

    return (<>
        <HeaderComp />
        <MainPage />
        <Box mb='5' bg='sil-b' w='100%' p={4} ></Box >
        <SwaggerUI url="/api/openapi" />
        <Footer />
    </>
    )
}

