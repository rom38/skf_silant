//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import WrapTable from "./TableComp";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Input, Select, FormLabel } from "@chakra-ui/react";
import { Center, HStack } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetMachinesQuery } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";

import SwaggerUI from "swagger-ui-react";
import { sortBy, reverse } from "lodash";
import "swagger-ui-react/swagger-ui.css";

// import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

function MainPage() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI,
        isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const { data: machinesData, error: errorMachines, isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();
    const [page, setPage] = useState("main");

    const sortedMachinesData = useMemo(() => {
        return sortBy(machinesData, "pk").reverse()
    }, [machinesData])

    const filteredMachinesData = useMemo(() => {
        return sortBy(machinesData, "pk").reverse()
    }, [machinesData])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    console.log("whoami from main", whoAmIData)
    console.log("filteredMachineData from main", filteredMachinesData)

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

            <Center>
                <HStack m="20px">
                    <Input />
                    <Select placeholder='Модель техники'>
                        <option value='option1'>ПД5,0</option>
                        <option value='option2'>ПД3,0</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                    <SelectSil onChange={handleChange} label="Модель техники" options={[{ value: "ПД5,0", label: "ПД5,0" }, { value: "ПД3,0", label: "ПД3,0" }]} />
                </HStack>
            </Center>

            {/* {page === "main" &&
                <MainPage />} */}
            {page === "swagger" &&
                <SwaggerUI url="/api/openapi" />
            }
            {page === "main" &&
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

const SelectSil = ({ label, value, options, onChange, placeholder }) => {
    const id = useId()
    return (
        <Flex alignItems="center" direction="column" justifyContent="center" >
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id}>{label}</FormLabel >

            <Select borderColor="silant-b.700" placeholder={placeholder} width="9rem" id={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </Select>
        </Flex >
    );
};

export default MainPage;
