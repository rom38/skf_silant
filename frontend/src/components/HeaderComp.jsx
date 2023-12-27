
import { Link, Flex, Box, Text, Button, Image, HStack, VStack } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
// import style from "../styles/HeaderComp.module.css";
import logoTypeAccentRed from "../media/logotype_accent_r.svg"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetCSRFQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { FaTelegram } from "./SilantIcons";

import LoginButton from "./LoginButton";

const HeaderComp = () => {
    //const accessToken = useSelector(selectAuthAccessToken);
    const [isAuth, setIsAuth] = useState(false);
    const { data: csrf, isError: isErrorCSRF, isLoading: isLoadingCSRF, refetch: refetchCSRF, error: errorCSRF } = useGetCSRFQuery();
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();

    console.log('AuthData from header comp', dataAuth?.isAuthenticated)
    console.log('AuthError from header comp', errorAuth)
    console.log('AuthIsError from header comp', isErrorAuth)
    console.log('CSRF from header', csrf)

    return (
        <Flex as="header" bg="sil-b" color="sil-w" justifyContent="space-between"  >

            {/* <header> */}
            <Image w={["50px", "100px", "130px"]} src={logoTypeAccentRed} alt="" />
            <Flex gap="10px" alignItems="center">
                <Flex flexDir="column" alignItems="center">
                    <HStack>
                        <Text fontSize={["0.4rem", "0.6rem", "1.4rem"]}>
                            +7-8352-20-12-09, telegram
                        </Text>
                        <FaTelegram width={["0.4rem", "0.7rem", "1.5rem"]} />
                        {/* <Image w="100px" src={FaTelegram} alt="" color="sil-w/> */}

                    </HStack>
                    <Text textAlign="center" fontSize={["0.6rem", "0.8rem", "1.6rem"]} fontWeight="500">Электронная сервисная книжка "Мой Силант"</Text>
                </Flex>
            </Flex>

            {/* <div className={`${style.headerLinks} ${style.headerCol3}`}> */}
            <Center mx="5px">
                {errorAuth == undefined ?
                    <LogoutButton />
                    : <LoginButton />}

                {/* </div> */}
            </Center>
        </Flex>
    )
}

export default HeaderComp;
