// import { Link } from "react-router-dom";
// import { NavLink, Link } from "react-router-dom";
import { Link, Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import style from "../styles/HeaderComp.module.css";
import imageLogo1 from "../media/scan_logo_1.svg";
import imageLogo2 from "../media/scan_logo_2.svg";
import logoTypeAccentRed from "../media/logotype_accent_r.svg"
import headerSpinner from "../media/header_spinner.png";
import HeaderUserImage from "../media/header_user_img.png";
import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCredentials } from "../slicers/authSlice";
import { useGetCompaniesQuery } from "../services/apiScan";
import { useNavigate } from "react-router-dom";
// import MenuComp from "./MenuComp";


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

const HeaderComp = () => {
    const classActive = ({ isActive }) => isActive ? style.active : "";

    const store = { token: true, isCompaniesLoading: false };
    const accessToken = useSelector(selectAuthAccessToken);
    // console.log('token from header', accessToken)

    const login = "Алексей А."
    const dispatch = useDispatch();
    let infoWidget = (
        <div className={style.info_widget}>{store?.isCompaniesLoading ? (
            <img className={style.lds} src={headerSpinner} />
        ) : (
            <>
                <p>
                    Использовано компаний
                    <span>{10}</span>
                </p>
                <p>
                    Лимит по компаниям
                    <span>{100}</span>
                </p>
            </>)}
        </div>
    );

    let loginInfo = (
        <div className={style.login_info}>

            <Link href="/login" className={`${classActive} ${style.button}`}>Войти</Link>
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
        <Flex as="header" bg="sil-b" color="sil-w">

            {/* <header> */}
            <Image w="100px" src={logoTypeAccentRed} className={style.headerCol1} alt="" />
            <div className={`${style.headerLinks} ${style.headerCol2}`}>
                <Text>
                    +7-8352-20-12-09, telegram
                </Text>
                <Link href="/main" className={classActive}>Главная</Link>
                <Link href="/about" className={classActive}>Тарифы</Link>
            </div>

            <div className={`${style.headerLinks} ${style.headerCol3}`}>
                {/* {accessToken && (<>{infoWidget}</>)} */}
                {accessToken && <InfoWidget2 />}
                {accessToken ? userInfo : loginInfo}

                {/* <MenuComp /> */}
            </div>
            {/* </header> */}
        </Flex>
    )
}

export default HeaderComp;
