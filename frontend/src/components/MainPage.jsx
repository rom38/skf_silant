import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import { Box, Button, Flex } from "@chakra-ui/react";

import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    // const store = { token: false };
    const accessToken = useSelector(selectAuthAccessToken);
    // const navigate = useNavigate()
    return (
        <>
            <Box as="main">

                <Flex alignItems="center" justifyContent="space-around" wrap="wrap" >
                    <Button boxShadow='lg' bg="sil-b" size="lg" color="sil-w" border="solid black">Общая информация </Button>
                    <Button boxShadow='lg' size="lg">Техническое обслуживание </Button>
                    <Button colorScheme="silant-b" boxShadow='xl' size="lg" border="solid" >Рекламации </Button>
                    <Button colorScheme="silant-r" boxShadow='xl' size="lg" variant="outline" >Рекламации 2</Button>

                </Flex>
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
                <LoginForm2 />
                {/* <Tariff /> */}
            </Box>
        </>
    );
}

export default MainPage;
