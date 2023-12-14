//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import WrapTable from "./TableComp";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Center, HStack } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useState } from "react";

// import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI, isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });

    console.log("whoami from main", whoAmIData)
    // const store = { token: false };
    //const accessToken = useSelector(selectAuthAccessToken);
    // const navigate = useNavigate()
    return (
        //     {page === "main" &&
        //     <MainPage />}
        // {page === "swagger" &&
        //     <SwaggerUI url="/api/openapi" />
        // }
        <Box as="main" mx="1%">
            <Text> сервис ------ {whoAmIData?.groups} {whoAmIData?.first_name}</Text>
            <Center>
                <HStack >
                    <Button colorScheme="silant-b" onClick={() => setPage("swagger")}>Swagger</Button>
                    <Button colorScheme="silant-b" onClick={() => setPage("main")}>Главная страница</Button>
                    {errorAuth == undefined && <>
                        <Button colorScheme="silant-b"  >Общая информация </Button>
                        <Button colorScheme="silant-b" >Техническое обслуживание </Button>
                        <Button colorScheme="silant-b"  >Рекламации </Button>
                    </>
                    }
                </HStack>
            </Center>

            <Flex alignItems="center" justifyContent="space-around" m="10px">

                <Button colorScheme="silant-b">
                    Заводской номер
                </Button>
                <Button colorScheme="silant-b">
                    Поиск
                </Button>
            </Flex>
            <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                Информация о комплектации и технических характеристиках Вашей техники
            </Text>
            <WrapTable />


            {/* <LoginForm2 /> */}
            {/* <Tariff /> */}
        </Box>
    );
}

export default MainPage;
