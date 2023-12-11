// import { Link } from "react-router-dom";
// import { NavLink, Link } from "react-router-dom";
import { Link, Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import style from "../styles/HeaderComp.module.css";
import imageLogo1 from "../media/scan_logo_1.svg";
import imageLogo2 from "../media/scan_logo_2.svg";
import logoTypeAccentRed from "../media/logotype_accent_r.svg"
import headerSpinner from "../media/header_spinner.png";
import HeaderUserImage from "../media/header_user_img.png";
//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCredentials } from "../slicers/authSlice";
import { useGetCompaniesQuery } from "../services/apiScan";
import { useGetCSRFQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import MenuComp from "./MenuComp";




const HeaderComp = () => {
    //const accessToken = useSelector(selectAuthAccessToken);
    const [isAuth, setIsAuth] = useState(false);
    const { data: csrf, error: errorCSRF, isLoading: isLoadingCSRF, refetch: refetchCSRF } = useGetCSRFQuery();
    const { data: dataAuth, error, isLoading } = useGetIsAuthQuery();


    console.log('AuthData from header comp', dataAuth?.isAuthenticated)
    console.log('CSRF from header', csrf)

    const login = "Алексей А."
    const dispatch = useDispatch();


    let loginInfo = (
        <div className={style.login_info}>

            <Link href="/login" >Войти</Link>
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
        <Flex as="header" bg="sil-b" color="sil-w" justifyContent="space-between" mb="20px" >

            {/* <header> */}
            <Image w="100px" src={logoTypeAccentRed} alt="" />
            <Flex gap="10px" alignItems="center">
                <Text>
                    +7-8352-20-12-09, telegram
                </Text>
                <Link href="/main" >Главная</Link>
                <Link href="/about" >Тарифы</Link>
            </Flex>
            {dataAuth?.isAuthenticated &&
                <Button>
                    Выйти
                </Button>
            }


            <div className={`${style.headerLinks} ${style.headerCol3}`}>
                {/* {dataAuth?.isAuthenticated && <InfoWidget2 />} */}
                {dataAuth?.isAuthenticated ? userInfo : loginInfo}

                {/* <MenuComp /> */}
            </div>
            {/* </header> */}
        </Flex>
    )
}

const InfoWidget2 = () => {
    const store = { token: true, isCompaniesLoading: false };
    const { data, error, isLoading } = useGetCompaniesQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // console.log(error?.data)
    if (error?.data.errorCode == "Auth_InvalidAccessToken") {
        dispatch(resetCredentials());
        navigate("/");

    }

    return (
        <div className={style.info_widget}>{isLoading ? (
            <img className={style.lds} src={headerSpinner} />
        ) : (
            <>
                <p>
                    Использовано компаний
                    <span>{data.eventFiltersInfo.usedCompanyCount}</span>
                </p>
                <p>
                    Лимит по компаниям
                    <span>{data.eventFiltersInfo.companyLimit}</span>
                </p>
            </>)}
        </div>
    )

}

export default HeaderComp;
