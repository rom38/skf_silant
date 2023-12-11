//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import WrapTable from "./TableComp";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    // const store = { token: false };
    //const accessToken = useSelector(selectAuthAccessToken);
    // const navigate = useNavigate()
    return (
        <>
            <Box as="main">

                <Flex alignItems="center" justifyContent="space-around" wrap="wrap" >
                    <Button colorScheme="silant-b" boxShadow='lg' bg="sil-b" size="lg" color="sil-w" border="solid" >Общая информация </Button>
                    <Button colorScheme="silant-r" boxShadow='lg' size="lg">Техническое обслуживание </Button>
                    <Button colorScheme="silant-b" boxShadow='xl' size="lg" border="solid" >Рекламации </Button>
                    <Button colorScheme="silant-r" boxShadow='xl' size="lg" variant="outline" >Рекламации 2</Button>

                </Flex>
                <Flex alignItems="center" justifyContent="space-around">

                    <Button colorScheme="silant-b">
                        Заводской номер
                    </Button>
                    <Button colorScheme="silant-b">
                        Поиск
                    </Button>
                </Flex>
                <Text fontSize="2rem">
                    Информация о комплектации и технических характеристиках Вашей техники
                </Text>
                <WrapTable />


                <div className={style.container_11}>
                    <div>

                        <Box fontSize="5rem">
                            сервис по поиску публикаций<br /> о компании по его ИНН
                        </Box>
                        <Box fontSize="3rem" className={style.subheader_11}>
                            Комплексный анализ публикаций, получение данных<br />
                            в формате PDF на электронную почту.
                        </Box>
                        {/* {accessToken ? (
                            <button className={style.button_1} onClick={() => navigate("/search")} >
                                Запросить данные
                            </button>) : (<></>)
                            // (<button className={style.button_1} onClick={() => navigate("/login")} >
                            //     Войти
                            // </button>)

                        } */}

                    </div>
                </div >
                <LoginForm2 />
                {/* <Tariff /> */}
            </Box>
        </>
    );
}

export default MainPage;
