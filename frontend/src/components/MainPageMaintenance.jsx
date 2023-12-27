import TableCompMaintenance from "./TableCompMaintenance";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Input, Select, FormLabel, FormControl } from "@chakra-ui/react";
import { Spinner, Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { CardFooter } from "@chakra-ui/react";
import { Center, HStack, Stack, StackDivider } from "@chakra-ui/react";
import { FormErrorMessage } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetMaintenanceQuery } from "../services/apiScan";
import { useGetMachinesQuery } from "../services/apiScan";
import { useGetCatalogsQuery } from "../services/apiScan";
import { useCreateMaintenanceMutation } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { MachinesIcon, ManagerIcon, ServiceCompanyIcon } from "./SilantIcons";
import { MaintenanceIcon, ComplaintIcon } from "./SilantIcons";
import MaintenanceAddForm from "./MaintenanceAddForm";

import { sortBy, reverse, uniqBy, chain, filter, values, pick, flow, map, concat } from "lodash";
import "swagger-ui-react/swagger-ui.css";


function MainPageMaintenance() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    // const { data: whoAmIData, error: errorWhoAmI,
    //     isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const { data: maintenanceData = [], error: errorMaintenance,
        isLoading: isLoadingMaintenance, refetch: refetchMaintenance } = useGetMaintenanceQuery();

    const [serial, setSerial] = useState("все");
    const [maintenanceType, setMaintenanceType] = useState("все");
    const [organization, setOrganization] = useState("все");

    const [clickRowId, setClickRowId] = useState(0);

    const [tabInfo, setTabInfo] = useState();
    const [rowIdMaintenance, setRowIdMaintenance] = useState(-1);
    const [addForm, setAddForm] = useState(false);
    console.log("rowIdMaintenance", rowIdMaintenance)


    const sortedMaintenanceData = useMemo(() => {
        return sortBy(maintenanceData, "pk").reverse()
    }, [maintenanceData])

    const filteredMaintenanceData = useMemo(() => {
        // console.log("serial", serial)
        // console.log("engine", engine)

        var maintenanceData_int = [...maintenanceData]

        if (serial !== "все") maintenanceData_int = maintenanceData_int
            .filter(item => item['machine_fk_serial'] === serial)

        if (maintenanceType !== "все") maintenanceData_int = maintenanceData_int
            .filter(item => item['maintenance_type_name'] === maintenanceType)

        if (organization !== "все") maintenanceData_int = maintenanceData_int
            .filter(item => item['maintenance_organization_name'] === organization)

        return maintenanceData_int
    }, [maintenanceData, serial, maintenanceType, organization])

    const serialUniq = useMemo(() => fieldUniq(maintenanceData, 'machine_fk_serial')
        , [maintenanceData])

    const maintenanceTypeUniq = useMemo(() => fieldUniq(maintenanceData, 'maintenance_type_name')
        , [maintenanceData])

    const organizationUniq = useMemo(() => fieldUniq(maintenanceData, 'maintenance_organization_name')
        , [maintenanceData])


    const handleChange = (param) => (event) => {
        switch (param) {
            case "serial":
                setSerial(event.target.value);
                // console.log('handle event', param, event.target.value)
                break;
            case "maintenanceType":
                setMaintenanceType(event.target.value);
                // console.log('handle event', param)
                break;
            case "organization":
                setOrganization(event.target.value);
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
        <Box as="main" mx="1%" textAlign="center" color="sil-b">

            {/* <MachinesIcon p="5px" />
            <ManagerIcon p="5px" width="2rem" />
            <ServiceCompanyIcon p="5px" />
            <MaintenanceIcon boxSize="5rem" p="5px" color="green.800" />
            <ComplaintIcon p="5px" color="green.800" /> */}
            <Center>
                <VStack>
                    <Button m="10px" colorScheme="silant-r" variant="outline" onClick={() => setAddForm(true)}> Добавить ТО</Button>

                    {addForm && <MaintenanceAddForm setForm={handleSetForm} />}
                </VStack>
            </Center>

            <Center>
                <FormControl>
                    <HStack m="20px" justifyContent="center" flexWrap="wrap" >
                        <SelectSil value={serial} onChange={handleChange("serial")} label="Зав. № машины" options={serialUniq} />
                        <SelectSil value={maintenanceType} onChange={handleChange("maintenanceType")} label="Вид ТО" options={maintenanceTypeUniq} />
                        <SelectSil value={organization} onChange={handleChange("organization")} label="Сервисная компания" options={organizationUniq} />
                    </HStack>
                </FormControl>
            </Center>

            {isLoadingMaintenance ?
                <Center h="50px">
                    <Spinner size="lg" colorScheme="silant-b" />
                </Center>
                :
                <>
                    {rowIdMaintenance !== -1 ? <CardDetail fields={maintenanceFields}
                        data={filteredMaintenanceData.filter(item => item["maintenance_pk"] === rowIdMaintenance)[0]}
                        rowId={rowIdMaintenance}
                        setRowId={setRowIdMaintenance} /> :
                        <>

                            <TableCompMaintenance maintenanceData={filteredMaintenanceData}
                                setRowIdMaintenance={setRowIdMaintenance} />
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
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id} mx="5px">{label} </FormLabel >

            <Select borderColor="silant-b.700" placeholder={placeholder} id={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.label} value={option.value}>{option.label}</option>
                ))}
            </Select>
        </Flex >
    );
};


function CardDetail({ fields, data, rowId, setRowId }) {
    return (
        <Card display="inline-flex" bg={(rowId === -1) && "red.200"} borderWidth="2px" borderColor="sil-b">
            <CardHeader bg="sil-b" color="sil-w">
                <Heading size='md'>Случай ТО  </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider borderColor="silant-b.800" />} spacing='1'>
                    {fields.map(field =>
                        <CardRow key={field.key} title={field.title} desc={data[field.key]} />

                    )}
                </Stack>
            </CardBody>
            <CardFooter>
                <Button onClick={() =>
                    setRowId(-1)
                }>
                    Назад
                </Button>
            </CardFooter>
        </Card>
    )
}


function CardRow({ title, desc, ...rest }) {
    return (
        <HStack>
            <Heading size='xs' textTransform='uppercase'>
                {title}
            </Heading>
            <Text fontSize='sm'>
                {desc}
            </Text>
        </HStack>
    )
}

export default MainPageMaintenance;

const fieldUniq = (data, fieldName) => {
    return flow(
        val => map(val, item => ({ 'value': item[fieldName], 'label': item[fieldName] })),
        val => uniqBy(val, "label"),
        val => sortBy(val, "label"),
        val => concat([{ label: "все", value: "все" }], val),
    )(data)
}

const maintenanceFields = [
    { title: "Заводской номер машины:", key: "machine_fk_serial" },
    { title: "Вид ТО:", key: "maintenance_type_name" },
    { title: "Описание вида ТО:", key: "maintenance_type_description" },
    { title: "Дата проведения ТО:", key: "maintenance_date" },
    { title: "Наработка машино-часов:", key: "operating_hours" },
    { title: "Номер заказ-наряда:", key: "work_order_number" },
    { title: "Дата заказ-наряда:", key: "work_order_date" },
    { title: "Организация, проводившая ТО:", key: "maintenance_organization_name" },
]
