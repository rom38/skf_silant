import TableCompMachines from "./TableCompMachines";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Input, Select, FormLabel, FormControl } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Center, HStack } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetMachinesQuery } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";

import { sortBy, reverse, uniqBy, chain, filter } from "lodash";
import "swagger-ui-react/swagger-ui.css";


function MainPageMachines() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    // const { data: whoAmIData, error: errorWhoAmI,
    //     isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const { data: machinesData = [], error: errorMachines,
        isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();
    const [page, setPage] = useState("main");

    const [serial, setSerial] = useState("все");
    const [engine, setEngine] = useState("все");
    const [transmission, setTransmission] = useState("все");
    const [driveline, setDriveline] = useState("все");
    const [steeringAxel, setSteeringAxel] = useState("все");

    const sortedMachinesData = useMemo(() => {
        return sortBy(machinesData, "pk").reverse()
    }, [machinesData])

    const filteredMachinesData = useMemo(() => {
        console.log("serial", serial)
        console.log("engine", engine)

        var machinesData_int = [...machinesData]

        if (serial !== "все") machinesData_int = machinesData_int
            .filter(item => item['machine_model_name'] === serial)

        if (engine !== "все") machinesData_int = machinesData_int
            .filter(item => item['engine_model_name'] === engine)

        if (transmission !== "все") machinesData_int = machinesData_int
            .filter(item => item['transmission_model_name'] === transmission)

        if (driveline !== "все") machinesData_int = machinesData_int
            .filter(item => item['driveline_model_name'] === driveline)

        if (steeringAxel !== "все") machinesData_int = machinesData_int
            .filter(item => item['steering_axel_model_name'] === steeringAxel)

        return machinesData_int
    }, [machinesData, serial, engine, transmission, driveline, steeringAxel])

    const serialUniq = useMemo(() => fieldUniq(machinesData, 'machine_model_name'), [machinesData])
    const engineUniq = useMemo(() => fieldUniq(machinesData, 'engine_model_name'), [machinesData])

    const transmissionUniq = useMemo(() => {
        return [].concat({ label: "все", value: "все" }, sortBy(uniqBy(machinesData
            .map(item => ({ 'value': item['transmission_model_name'], 'label': item['transmission_model_name'] }))
            , 'label'), 'label'))
    }, [machinesData])

    const drivelineUniq = useMemo(() => {
        return [].concat({ label: "все", value: "все" }, sortBy(uniqBy(machinesData
            .map(item => ({ 'value': item['driveline_model_name'], 'label': item['driveline_model_name'] }))
            , 'label'), 'label'))
    }, [machinesData])

    const steeringAxelUniq = useMemo(() => {
        return [].concat({ label: "все", value: "все" }, sortBy(uniqBy(machinesData
            .map(item => ({ 'value': item['steering_axel_model_name'], 'label': item['steering_axel_model_name'] }))
            , 'label'), 'label'))
    }, [machinesData])

    const handleChange = (param) => (event) => {
        switch (param) {
            case "serial":
                setSerial(event.target.value);
                // console.log('handle event', param, event.target.value)
                break;
            case "engine":
                setEngine(event.target.value);
                // console.log('handle event', param)
                break;
            case "transmission":
                setTransmission(event.target.value);
                console.log('handle event', param)
                break;
            case "driveline":
                setDriveline(event.target.value);
                console.log('handle event', param)
                break;
            case "steeringAxel":
                setSteeringAxel(event.target.value);
                console.log('handle event', param)
                break;
        }
    };

    console.log("sortedMachineData from main", sortedMachinesData.map(item => ({ 'value': item.pk, 'label': item['machine_model_name'] })))
    console.log("filteredMachineData from main 2", filteredMachinesData)

    return (
        <Box as="main" mx="1%" textAlign="center" >
            <Center>
                <FormControl>
                    <HStack m="20px" justifyContent="center" flexWrap="wrap" >
                        <SelectSil value={serial} onChange={handleChange("serial")} label="Модель техники" options={serialUniq} />
                        <SelectSil value={engine} onChange={handleChange("engine")} label="Модель двигателя" options={engineUniq} />
                        <SelectSil value={transmission} onChange={handleChange("transmission")} label="Модель трансмиссии" options={transmissionUniq} />
                        <SelectSil value={driveline} onChange={handleChange("driveline")} label="Модель ведущего моста" options={drivelineUniq} />
                        <SelectSil value={steeringAxel} onChange={handleChange("steeringAxel")} label="Модель управляемого моста" options={steeringAxelUniq} />
                    </HStack>
                </FormControl>
            </Center>

            <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                Информация о комплектации и технических характеристиках Вашей техники
            </Text>

            {isLoadingMachines ?
                <Center h="50px">
                    <Spinner size="lg" colorScheme="silant-b" />
                </Center>
                :
                <TableCompMachines machinesData={filteredMachinesData} />
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

export default MainPageMachines;

const fieldUniq = (data, fieldName) => {
    return [].concat({ label: "все", value: "все" }, sortBy(uniqBy(data
        .map(item => ({ 'value': item[fieldName], 'label': item[fieldName] }))
        , 'label'), 'label'))
}
