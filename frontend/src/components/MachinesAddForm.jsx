import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
// import { useCreateMaintenanceMutation } from "../services/apiScan";
import { useCreateComplaintMutation } from "../services/apiScan";
import { useCreateMachinesMutation } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import { useForm, Controller } from "react-hook-form";

import { sortBy, reverse, uniqBy, chain, filter, values, pick, flow, map, concat } from "lodash";


const MachinesAddForm = ({ setForm: handleForm }) => {
    const testOptions = [{ id: 1, name: "двигло" }, { id: 2, name: "кузов" }]
    const { data: dataCatalogs = [], error: errorCatalogs,
        isLoading: isLoadingCatalogs, refetch: refetchCatalogs } = useGetCatalogsQuery();

    const { data: machinesData = [], error: errorMachines,
        isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();

    // const [createMaintenance, { isLoading: isLoadingCreateMaintenance, error: errorCreateMaintenance,
    //     isError: isErrorCreateMaintenance, data: dataCreateMaintenance }] = useCreateMaintenanceMutation();

    const [createMachines, { isLoading: isLoadingCreateMachines, error: errorCreateMachines,
        isError: isErrorCreateMachines, data: dataCreateMachines }] = useCreateMachinesMutation();

    const serialUniq = useMemo(() =>
        flow(
            val => uniqBy(val, "machine_serial"),
            val => map(val, item => pick(item, (["machine_serial", "pk"]))),
            val => map(val, item => ({ value: item["pk"], label: item["machine_serial"] })),
            val => sortBy(val, ("label"))
        )(machinesData)
        , [machinesData])

    const machineModel = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["machine_model"])
        , [dataCatalogs])

    const engineModel = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["engine_model"])
        , [dataCatalogs])

    const transmissionModel = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["transmission_model"])
        , [dataCatalogs])

    const drivelineModel = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["driveline_model"])
        , [dataCatalogs])

    const steeringAxelModel = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["steering_axel_model"])
        , [dataCatalogs])

    const buyerClient = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["first_name"] }))
        )(dataCatalogs["buyer_client"])
        , [dataCatalogs])

    const maintenanceOrganization = useMemo(() =>
        flow(
            // val => map(val, item => item["maintenance_type"]),
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["maintenance_organization"])
        , [dataCatalogs])

    const {
        handleSubmit,
        register,
        reset,
        control,
        setError,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm({
        mode: "all",
        defaultValues: {

        },
    });
    const onSubmit = async (data, e) => {

        e.preventDefault()
        console.log('form submit complaint', data);
        try {
            await createMachines(data).unwrap()
        } catch (err) {

            // if (isErrorMachine && errorMachine?.status === 404) setErrorMachineNotFound(true)
            if (err.data['non_field_errors']) { setError('machine_fk', { type: err.data.status, message: err.data['non_field_errors'] }) }

            console.log('form submit complaint error', err);
        }
        // reset();
    };

    if (isLoadingMachines) <Text>Загрузка</Text>
    // console.log('form add form machinesdata', machinesData);
    // console.log('form add form uniqmachinesdata', serialUniq);
    // console.log('form add form maintenance type', maintenanceType);

    return (
        <Center display="inline-flex">
            <form onSubmit={handleSubmit(onSubmit)} id="machine-form">

                <SelectMain label="Модель техники"
                    name="machine_model_fk" control={control}
                    options={machineModel} errors={errors} placeholder="выберете модель"
                />
                <InputMain label="Заводской № машины"
                    name="machine_serial" control={control} type="number"
                    errors={errors} placeholder="номер"
                />
                <SelectMain label="Модель двигателя"
                    name="engine_model_fk" control={control}
                    options={engineModel} errors={errors} placeholder="выберете модель"
                />
                <InputMain label="Заводской № двигателя"
                    name="engine_serial" control={control}
                    errors={errors} placeholder="номер"
                />
                <SelectMain label="Модель трансмиссии"
                    name="transmission_model_fk" control={control}
                    options={transmissionModel} errors={errors} placeholder="выберете модель"
                />
                <InputMain label="Заводской № трансмиссии"
                    name="transmission_serial" control={control}
                    errors={errors} placeholder="номер"
                />
                <SelectMain label="Модель ведущего моста"
                    name="driveline_model_fk" control={control}
                    options={drivelineModel} errors={errors} placeholder="выберете модель"
                />
                <InputMain label="Заводской № ведущего моста"
                    name="driveline_model_serial" control={control}
                    errors={errors} placeholder="номер"
                />
                <SelectMain label="Модель управляемого моста"
                    name="steering_axel_model_fk" control={control}
                    options={steeringAxelModel} errors={errors} placeholder="выберете модель"
                />
                <InputMain label="Заводской № управляемого моста"
                    name="steering_axel_model_serial" control={control}
                    errors={errors} placeholder="номер"
                />
                <InputMain label="Договор поставки №, дата"
                    name="supply_contract" control={control} type="text"
                    placeholder="договор" errors={errors}
                />
                <InputMain label="Дата отгрузки с завода"
                    name="factory_delivery_date" control={control} type="date"
                    placeholder="дата" errors={errors}
                />
                {/* переделать в select изменить каталог */}
                <SelectMain label="Клиент"
                    name="buyer_client_fk" control={control}
                    placeholder="клиент" errors={errors} options={buyerClient}
                />
                <InputMain label="Грузополучатель (конечный потребитель)"
                    name="end_user" control={control}
                    placeholder="грузополучатель" errors={errors}
                />
                <InputMain label="Адрес поставки (эксплуатации):"
                    name="delivery_address" control={control}
                    placeholder="адрес" errors={errors}
                />
                <InputMain label="Комплектация (дополнительные опции):"
                    name="machine_configuration" control={control} type="text"
                    placeholder="комплектация" errors={errors}
                />
                <SelectMain label="Сервисная компания"
                    name="maintenance_organization_fk" control={control}
                    options={maintenanceOrganization}
                    placeholder="выберете организацию" errors={errors}
                />
                <Button colorScheme="silant-b" m="10px"
                    isLoading={isSubmitting} type="submit"
                    isDisabled={!isDirty || !isValid}
                >
                    Отправить
                </Button>
                <Button colorScheme="silant-r" m="10px" onClick={() => handleForm()}>
                    Закрыть форму
                </Button>

            </form>
        </Center>
    )
}

const InputMain = ({ control, label, name, type, placeholder, errors }) => {
    const inputId = useId()

    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel color="silant-b.300" fontSize="1.5em"
                mb="0px" htmlFor={inputId}>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: "Это поле необходимо заполнить" }}
                render={({ field }) => (
                    <Input {...field}
                        id={inputId}
                        type={type}
                        // width="7rem"
                        borderColor="silant-b.700"
                        placeholder={placeholder}
                    />)}
            />
            {errors[name] &&
                <FormErrorMessage>{errors[name].message}</FormErrorMessage>
            }
        </FormControl>
    )
}

const SelectMain = ({ control, label, name, placeholder, options, errors }) => {
    const inputId = useId()

    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel color="silant-b.300" fontSize="1.5em"
                mb="0px" htmlFor={inputId}>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: "Это поле необходимо заполнить" }}
                render={({ field }) => (
                    <Select {...field}
                        id={inputId}
                        // width="7rem"
                        borderColor="silant-b.700"
                        placeholder={placeholder}
                    >
                        {options.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        )
                        )}
                    </Select >
                )}
            />
            {errors[name] &&
                <FormErrorMessage>{errors[name].message}</FormErrorMessage>
            }
        </FormControl>
    )
}

export default MachinesAddForm
