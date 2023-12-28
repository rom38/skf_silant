import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Input, Select, FormLabel, FormControl } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Center, HStack } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetMachinesQuery } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import MainPageMachines from "./MainPageMachines";
import MainPageMaintenance from "./MainPageMaintenance";
import MainPageComplaint from "./MainPageComplaint";
import { ComplaintIcon, MachinesIcon, MaintenanceIcon, ManagerIcon, ServiceCompanyIcon } from "./SilantIcons";


import SwaggerUI from "swagger-ui-react";
import { sortBy, reverse, uniqBy, chain, filter } from "lodash";
import "swagger-ui-react/swagger-ui.css";

function MainPage() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI,
        isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const [page, setPage] = useState("main");

    console.log("whoami from main", whoAmIData)

    return (
        <Box as="main" mx="1%" textAlign="center" >
            <Box border="1px" m="15px" display="inline-block" textAlign="center" borderRadius="10px" borderColor="silant-b.800" bg="#ffffff" p="10px">
                {whoAmIData?.groups[0] == "Сервисные" &&
                    <Text fontSize={["0.7rem", "1rem", "1.5rem"]} fontWeight="bold" align="center" >
                        <ServiceCompanyIcon color="sil-b" boxSize={["0.9rem", "1.5rem", "2.5rem"]} mx="5px" />Сервисная компания: {whoAmIData?.first_name}
                    </Text>}
                {whoAmIData?.groups[0] == "Клиенты" &&
                    <Text fontSize={["0.7rem", "1rem", "1.5rem"]} fontWeight="bold" align="center" > Клиент: {whoAmIData?.first_name}
                    </Text>}
                {whoAmIData?.groups[0] == "Менеджер" &&
                    <Text fontSize={["0.7rem", "1rem", "1.5rem"]} fontWeight="bold" align="center" >
                        <ManagerIcon color="sil-b" boxSize={["0.9rem", "1.5rem", "2.5rem"]} mx="5px" /> Менеджер: {whoAmIData?.first_name}
                    </Text>}
            </Box>
            {page === "main" &&
                <Text fontSize={["0.8rem", "1.2rem", "2rem"]} fontWeight="bold" align="center" m="20px">
                    Информация о комплектации и технических характеристиках Вашей техники
                </Text>
            }
            {
                page === "maintenance" &&
                <Text fontSize={["0.8rem", "1.2rem", "2rem"]} fontWeight="bold" align="center" m="20px">
                    Информация о проведенных ТО Вашей техники
                </Text >
            }
            {
                page === "complaint" &&
                <Text fontSize={["0.8rem", "1.2rem", "2rem"]} fontWeight="bold" align="center" m="20px">
                    Информация о рекламациях Вашей техники
                </Text >
            }
            <Center>
                <HStack justifyContent="center" flexWrap="wrap">
                    {whoAmIData?.groups[0] == "Менеджер" &&
                        <Button size={["xs", "md", "lg"]} colorScheme={(page === "swagger" ? "silant-r" : "silant-b")} onClick={() => setPage("swagger")}>
                            Swagger
                        </Button>}
                    {errorAuth == undefined && <>
                        <Button size={["xs", "md", "lg"]} leftIcon={<MachinesIcon boxSize={["1.1rem", "1.5rem", "2rem"]} />}
                            colorScheme={(page === "main" ? "silant-r" : "silant-b")} onClick={() => setPage("main")}>
                            Общая информация
                        </Button>
                        <Button size={["xs", "md", "lg"]} leftIcon={<MaintenanceIcon boxSize={["1.1rem", "1.5rem", "2rem"]} />}
                            colorScheme={(page === "maintenance" ? "silant-r" : "silant-b")} onClick={() => setPage("maintenance")}>
                            Техническое обслуживание
                        </Button>
                        <Button size={["xs", "md", "lg"]} leftIcon={<ComplaintIcon boxSize={["1.1rem", "1.5rem", "2rem"]} />}
                            colorScheme={(page === "complaint" ? "silant-r" : "silant-b")} onClick={() => setPage("complaint")}>
                            Рекламации
                        </Button>
                    </>
                    }
                </HStack>
            </Center>

            {page === "swagger" && <SwaggerUI url="/api/openapi" />}
            {page === "main" && <MainPageMachines />}
            {page === "maintenance" && <MainPageMaintenance />}
            {page === "complaint" && <MainPageComplaint />}

        </Box >
    );
}

const SelectSil = ({ label, value, options, onChange, placeholder }) => {
    const id = useId()
    return (
        <Flex alignItems="center" direction="column" justifyContent="center" >
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id}>{label}</FormLabel >

            <Select borderColor="silant-b.700" placeholder={placeholder} id={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.label} value={option.value}>{option.label}</option>
                ))}
            </Select>
        </Flex >
    );
};

export default MainPage;
