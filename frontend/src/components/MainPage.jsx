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
            <Box border="1px" m="20px" display="inline-block" textAlign="center" borderRadius="10px" borderColor="silant-b.800" bg="#ffffff" p="10px">
                {whoAmIData?.groups == "Сервисные" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Сервисная компания: {whoAmIData?.first_name}</Text>}
                {whoAmIData?.groups == "Клиенты" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Клиент: {whoAmIData?.first_name}</Text>}
                {whoAmIData?.groups == "Менеджер" && <Text fontSize="1.5rem" fontWeight="bold" align="center" > Менеджер: {whoAmIData?.first_name} </Text>}
            </Box>
            <Center>
                <HStack justifyContent="center" flexWrap="wrap">
                    <Button colorScheme={(page === "swagger" ? "silant-r" : "silant-b")} onClick={() => setPage("swagger")}>Swagger</Button>
                    {errorAuth == undefined && <>
                        <Button colorScheme={(page === "main" ? "silant-r" : "silant-b")} onClick={() => setPage("main")}>Общая информация</Button>
                        <Button colorScheme={(page === "maintenance" ? "silant-r" : "silant-b")} onClick={() => setPage("maintenance")}>Техническое обслуживание </Button>
                        <Button colorScheme={(page === "complaint" ? "silant-r" : "silant-b")} onClick={() => setPage("complaint")}>Рекламации </Button>
                    </>
                    }
                </HStack>
            </Center>

            {page === "swagger" &&
                <SwaggerUI url="/api/openapi" />
            }
            {page === "main" &&

                <MainPageMachines />
            }
            {page === "maintenance" &&
                <MainPageMaintenance />
                // <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                //     Информация о техническом обслуживании
                // </Text>
            }
            {page === "complaint" &&
                <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                    Информация о рекламациях
                </Text>
            }

        </Box>
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
