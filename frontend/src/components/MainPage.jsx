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
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

// import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI,
        isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const [page, setPage] = useState("main");

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
        <Box as="main" mx="1%" textAlign="center" >
            <Box border="1px" m="20px" display="inline-block" textAlign="center" borderRadius="10px" borderColor="silant-b.800" bg="#ffffff" p="10px">
                {whoAmIData?.groups == "Сервисные" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Сервисная компания: {whoAmIData?.first_name}</Text>}
                {whoAmIData?.groups == "Клиенты" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Клиент: {whoAmIData?.first_name}</Text>}
                {whoAmIData?.groups == "Менеджер" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Менеджер: {whoAmIData?.first_name} </Text>}
            </Box>
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

            {/* {page === "main" &&
                <MainPage />} */}
            {page === "swagger" ?
                <SwaggerUI url="/api/openapi" /> :
                <>


                    <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                        Информация о комплектации и технических характеристиках Вашей техники
                    </Text>
                    <WrapTable />
                </>
            }


            {/* <LoginForm2 /> */}
            {/* <Tariff /> */}
        </Box>
    );
}

export default MainPage;
