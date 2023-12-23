// import { Link } from "react-router-dom";
// import { NavLink, Link } from "react-router-dom";
import { Link, Flex, Box, Text, Button, Image, HStack, VStack } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import style from "../styles/HeaderComp.module.css";
// import imageLogo1 from "../media/scan_logo_1.svg";
// import imageLogo2 from "../media/scan_logo_2.svg";
import logoTypeAccentRed from "../media/logotype_accent_r.svg"
import headerSpinner from "../media/header_spinner.png";
import HeaderUserImage from "../media/header_user_img.png";
//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { resetCredentials } from "../slicers/authSlice";
// import { useGetCompaniesQuery } from "../services/apiScan";
import { useGetCSRFQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetWhoAmIQuery } from "../services/apiScan";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { FaTelegram } from "./Telegram";

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

    const login = "Алексей А."
    const dispatch = useDispatch();

    let loginInfo = (
        <div className={style.login_info}>

            <Button colorScheme="silant-r" variant="solid" >Войти</Button>
        </div>
    );
    let userInfo = (
        <>
            <div className={style.header_user}>
                <span className="username">{login}</span>
                <button
                    className="logout"
                    onClick={() => {
                        dispatch(resetCredentials());
                    }}
                >
                    <Link className="header-nav__link" to="/">
                        Выйти
                    </Link>
                </button>
            </div>
            <img className={style.header_user_image} src={HeaderUserImage} alt="user avatar" />
        </>
    );

    return (
        <Flex as="header" bg="sil-b" color="sil-w" justifyContent="space-between"  >

            {/* <header> */}
            <Image w="100px" src={logoTypeAccentRed} alt="" />
            <Flex gap="10px" alignItems="center">
                <Flex flexDir="column" alignItems="center">
                    <HStack>
                        <Text>
                            +7-8352-20-12-09, telegram
                        </Text>
                        <FaTelegram />
                        {/* <Image w="100px" src={FaTelegram} alt="" color="sil-w/> */}

                    </HStack>
                    <Text fontSize="1.5rem" fontWeight="500">Электронная сервисная книжка "Мой Силант"</Text>
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
