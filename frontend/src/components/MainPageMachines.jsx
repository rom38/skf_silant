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
import CardDetail from "./CardDetail";


import { sortBy, reverse, uniqBy, filter, map, concat, flow } from "lodash";


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
    const [rowIdMachine, setRowIdMachine] = useState(2);
    const [addForm, setAddForm] = useState(false);

    const sortedMachinesData = useMemo(() => {
        return sortBy(machinesData, "pk").reverse()
    }, [machinesData])

    const filteredMachinesData = useMemo(() => {
        // console.log("serial", serial)
        // console.log("engine", engine)

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
    const transmissionUniq = useMemo(() => fieldUniq(machinesData, 'transmission_model_name'), [machinesData])
    const drivelineUniq = useMemo(() => fieldUniq(machinesData, 'driveline_model_name'), [machinesData])
    const steeringAxelUniq = useMemo(() => fieldUniq(machinesData, 'steering_axel_model_name'), [machinesData])

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
                // console.log('handle event', param)
                break;
            case "driveline":
                setDriveline(event.target.value);
                // console.log('handle event', param)
                break;
            case "steeringAxel":
                setSteeringAxel(event.target.value);
                // console.log('handle event', param)
                break;
        }
    };

    const handleSetForm = () => {
        setAddForm(false)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // console.log("sortedMachineData from main", sortedMachinesData.map(item => ({ 'value': item.pk, 'label': item['machine_model_name'] })))
    // console.log("filteredMachineData from main 2", filteredMachinesData)

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

            {/* <Text fontSize="2rem" fontWeight="bold" align="center" m="20px">
                Информация о комплектации и технических характеристиках Вашей техники
            </Text> */}

            {isLoadingMachines ?
                <Center h="50px">
                    <Spinner size="lg" colorScheme="silant-b" />
                </Center>
                :
                <>
                    {rowIdMachine !== -1 ? <CardDetail fields={machineFields}
                        data={filteredMachinesData.filter(item => item["pk"] === rowIdMachine)[0]}
                        rowId={rowIdMachine}
                        setRowId={setRowIdMachine} /> :
                        <>

                            <TableCompMachines machinesData={filteredMachinesData}
                                setRowIdMachine={setRowIdMachine} />
                        </>}
                </>
            }

        </Box>
    );
}

const SelectSil = ({ label, value, options, onChange, placeholder }) => {
    const id = useId()
    return (
        <Flex alignItems="center" direction="column" justifyContent="center" >
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id} mx="5px">{label}</FormLabel >

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
    return flow(
        val => map(val, item => ({ 'value': item[fieldName], 'label': item[fieldName] })),
        val => uniqBy(val, "label"),
        val => sortBy(val, "label"),
        val => concat([{ label: "все", value: "все" }], val),
    )(data)
}

const machineFields = [
    { title: "Модель техники:", key: "machine_model_name" },
    { title: "Описание модели техники:", key: "machine_model_description" },
    { title: "Заводской номер машины:", key: "machine_serial" },
    { title: "Модель двигателя:", key: "engine_model_name" },
    { title: "Описание модели двигателя:", key: "engine_model_description" },
    { title: "Заводской номер двигателя:", key: "engine_serial" },
    { title: "Модель трансмиссии:", key: "transmission_model_name" },
    { title: "Описание модели трансмиссии:", key: "transmission_model_description" },
    { title: "Заводской номер трансмиссии:", key: "transmission_serial" },
    { title: "Модель ведущего моста:", key: "driveline_model_name" },
    { title: "Описание модели ведущего моста:", key: "driveline_model_description" },
    { title: "Заводской номер ведущего моста:", key: "driveline_model_serial" },
    { title: "Модель управляемого моста:", key: "steering_axel_model_name" },
    { title: "Описание модели управляемого моста:", key: "steering_axel_model_description" },
    { title: "Заводской номер управляемого моста:", key: "steering_axel_model_serial" },
    { title: "Договор поставки №, дата:", key: "supply_contract" },
    { title: "Дата отгрузки с завода:", key: "factory_delivery_date" },
    { title: "Клиент:", key: "buyer_client_name" },
    { title: "Грузополучатель (конечный потребитель):", key: "end_user" },
    { title: "Адрес поставки (эксплуатации):", key: "delivery_address" },
    { title: "Комплектация (дополнительные опции):", key: "machine_configuration" },
    { title: "Сервисная компания:", key: "maintenance_organization_name" },
]

// "pk": 2,
// "machine_model_fk": 3,
// "machine_model_name": "ПД5,0",
// "machine_model_description": "ПД5,0",
// "machine_serial": "0021",
// "engine_model_fk": 2,
// "engine_model_name": "ММЗ Д-243",
// "engine_model_description": "ММЗ Д-243",
// "engine_serial": "112890",
// "transmission_model_fk": 2,
// "transmission_model_name": "HF50-VP020",
// "transmission_model_description": "HF50-VP020",
// "transmission_serial": "20H0066",
// "driveline_model_fk": 2,
// "driveline_model_name": "HA50-VP010",
// "driveline_model_description": "HA50-VP010",
// "driveline_model_serial": "20H0039",
// "steering_axel_model_fk": 2,
// "steering_axel_model_name": "B350655A",
// "steering_axel_model_description": "B350655A",
// "steering_axel_model_serial": "KDBAC9685",
// "supply_contract": "30.12.2021",
// "factory_delivery_date": "2022-01-14",
// "buyer_client_fk": 4,
// "buyer_client_name": "ООО \"ФПК21\"",
// "buyer_client_username": "fpk_21",
// "end_user": "ООО \"ДЭТ №13\"",
// "delivery_address": "с. Акуловка, Московская обл.",
// "machine_configuration": "Стандарт",
// "maintenance_organization_fk": 4,
// "maintenance_organization_name": "ООО Силант",
// "maintenance_organization_description": "ООО Силант",
// "maintenance_organization_username": "silant"
