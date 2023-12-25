import TableCompMaintenance from "./TableCompMaintenance";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Input, Select, FormLabel, FormControl } from "@chakra-ui/react";
import { Spinner, Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { CardFooter } from "@chakra-ui/react";
import { Center, HStack, Stack, StackDivider } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetMaintenanceQuery } from "../services/apiScan";
import { useGetMachinesQuery } from "../services/apiScan";
import { useGetCatalogsQuery } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { MachinesIcon, ManagerIcon, ServiceCompanyIcon } from "./SilantIcons";
import { MaintenanceIcon, ComplaintIcon } from "./SilantIcons";

import { sortBy, reverse, uniqBy, chain, filter, values } from "lodash";
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

    // console.log("sortedMachineData from main", sortedMachinesData.map(item => ({ 'value': item.pk, 'label': item['machine_model_name'] })))
    // console.log("filteredMachineData from main 2", filteredMachinesData)

    return (
        <Box as="main" mx="1%" textAlign="center" color="sil-b">

            {/* <MachinesIcon p="5px" />
            <ManagerIcon p="5px" width="2rem" />
            <ServiceCompanyIcon p="5px" />
            <MaintenanceIcon boxSize="5rem" p="5px" color="green.800" />
            <ComplaintIcon p="5px" color="green.800" /> */}
            <Button m="10px" colorScheme="silant-r" variant="outline"> Добавить ТО</Button>
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
                            <MaintenanceAddForm />
                            <TableCompMaintenance maintenanceData={filteredMaintenanceData}
                                setRowIdMaintenance={setRowIdMaintenance} />
                        </>}
                </>
            }

        </Box>
    );
}


const MaintenanceAddForm = () => {
    const testOptions = [{ id: 1, name: "двигло" }, { id: 2, name: "кузов" }]
    const { data: dataCatalogs = [], error: errorCatalogs,
        isLoading: isLoadingCatalogs, refetch: refetchCatalogs } = useGetCatalogsQuery();

    const { data: machinesData = [], error: errorMachines,
        isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();
    const serialUniq = useMemo(() => fieldUniq(machinesData, 'machine_serial'), [machinesData])

    const {
        handleSubmit,
        register,
        reset,
        control,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "all",
        defaultValues: {
            machineNumber: "0045",
        },
    });
    const onSubmit = async (data, e) => {

        e.preventDefault()
        console.log('form submit maintenance', data);
        try {
            // await fetchMachine(data.machineNumber).unwrap()
        } catch (err) {

            // if (isErrorMachine && errorMachine?.status === 404) setErrorMachineNotFound(true)
            // setError("machineNumber", { type: 404, message: "Машины с таким номером не найдено" })

            console.log('form submit maintenance error', err);
        }
        // reset();
    };

    return (
        <Center display="inline-flex">
            <form onSubmit={handleSubmit(onSubmit)} id="machine-form">
                <FormControl>
                    <InputMain label="следующий"
                        name="next" control={control} type="number"
                        placeholder="привет"
                    />
                    <SelectMain label="части"
                        name="part" control={control}
                        options={testOptions}
                        placeholder="части"
                    />
                    < Button colorScheme="silant-b"
                        isLoading={isSubmitting} type="submit"
                        isDisabled={errors.machineNumber}
                    >
                        Отправить
                    </Button>

                </FormControl>
            </form>
        </Center>
    )
}

const InputMain = ({ control, label, name, type, placeholder }) => {
    const inputId = useId()

    return (
        <>
            <FormLabel color="silant-b.300" fontSize="1.5em"
                mb="0px" htmlFor={inputId}>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                    <Input {...field}
                        id={inputId}
                        type={type}
                        width="7rem"
                        borderColor="silant-b.700"
                        placeholder={placeholder}
                    />)}
            />
        </>
    )
}

const SelectMain = ({ control, label, name, placeholder, options }) => {
    const inputId = useId()

    return (
        <>
            <FormLabel color="silant-b.300" fontSize="1.5em"
                mb="0px" htmlFor={inputId}>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select {...field}
                        id={inputId}
                        // width="7rem"
                        borderColor="silant-b.700"
                        placeholder={placeholder}
                    >
                        {options.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        )
                        )}
                    </Select >
                )}
            />
        </>
    )
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

const AddFormSelect = ({ label, value, options, onChange, placeholder }) => {
    const id = useId()
    return (
        <Flex alignItems="center" direction="row" justifyContent="center" >
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id} mx="5px">{label} </FormLabel>

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
    return [].concat({ label: "все", value: "все" }, sortBy(uniqBy(data
        .map(item => ({ 'value': item[fieldName], 'label': item[fieldName] }))
        , 'label'), 'label'))
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
