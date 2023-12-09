import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import { Box, Button } from "@chakra-ui/react";

import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    // const store = { token: false };
    const accessToken = useSelector(selectAuthAccessToken);
    // const navigate = useNavigate()
    return (
        <>
            <Box>
                <Button>Ткхническое </Button>
            </Box>
            <div className={style.container_1}>
                <div>

                    <div className={style.header_1}>
                        сервис по поиску публикаций<br /> о компании по его ИНН
                    </div>
                    <p className={style.subheader_1}>
                        Комплексный анализ публикаций, получение данных<br />
                        в формате PDF на электронную почту.
                    </p>
                    {accessToken ? (
                        <button className={style.button_1} onClick={() => navigate("/search")} >
                            Запросить данные
                        </button>) : (<></>)
                        // (<button className={style.button_1} onClick={() => navigate("/login")} >
                        //     Войти
                        // </button>)

                    }

                </div>
            </div >
            <div className={style.header_2}>
                почему именно мы
            </div>
            {/* <SimpleSlider /> */}
            <div className={style.header_2}>
                наши тарифы
            </div>
            <LoginForm2 />
            {/* <Tariff /> */}
        </>
    );
}

export default MainPage;
