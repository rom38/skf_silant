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
import { useCreateMaintenanceMutation } from "../services/apiScan";
import { useCreateComplaintMutation } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

import { sortBy, reverse, uniqBy, chain, filter, values, pick, flow, map, concat } from "lodash";
import "swagger-ui-react/swagger-ui.css";


const ComplaintAddForm = ({ setForm: handleForm }) => {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI,
        isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });

    const { data: dataCatalogs = [], error: errorCatalogs,
        isLoading: isLoadingCatalogs, refetch: refetchCatalogs } = useGetCatalogsQuery();

    const { data: machinesData = [], error: errorMachines,
        isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();

    const [createComplaint, { isLoading: isLoadingCreateComplaint, error: errorCreateComplaint,
        isError: isErrorCreateComplaint, data: dataCreateComplaint }] = useCreateComplaintMutation();


    const serialUniq = useMemo(() =>
        flow(
            val => uniqBy(val, "machine_serial"),
            val => map(val, item => pick(item, (["machine_serial", "pk"]))),
            val => map(val, item => ({ value: item["pk"], label: item["machine_serial"] })),
            val => sortBy(val, ("label"))
        )(machinesData)
        , [machinesData])

    const failureComponent = useMemo(() =>
        flow(
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["failure_component"])
        , [dataCatalogs])

    const restorationMethod = useMemo(() =>
        flow(
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["restoration_method"])
        , [dataCatalogs])

    const maintenanceOrganization = useMemo(() =>
        flow(
            val => map(val, item => ({ value: item["id"], label: item["name"] }))
        )(dataCatalogs["maintenance_organization"])
        , [dataCatalogs])

    const {
        handleSubmit,
        register,
        reset,
        control,
        setError,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm({
        mode: "all",
        defaultValues: {

        },
    });

    useEffect(() => {
        if (whoAmIData && whoAmIData?.groups[0] == "Сервисные") {
            // console.log("setvalue", whoAmIData.id, maintenanceOrganization.filter(item => item.label == whoAmIData.first_name))
            if (maintenanceOrganization.filter(item => item.label == whoAmIData.first_name)[0]?.value) {
                setValue(
                    'maintenance_organization_fk', maintenanceOrganization.filter(item => item.label == whoAmIData.first_name)[0].value
                );
            }
        }
    }, [whoAmIData, maintenanceOrganization]);

    const onSubmit = async (data, e) => {

        e.preventDefault()
        console.log('form submit complaint', data);
        try {
            await createComplaint(data).unwrap()
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
                <SelectMain label="Заводской № машины"
                    name="machine_fk" control={control}
                    options={serialUniq} errors={errors} placeholder="выберете машину"
                />
                <InputMain label="Дата отказа"
                    name="failure_date" control={control} type="date"
                    placeholder="дата" errors={errors}
                />
                <InputMain label="Наработка машино-часов"
                    name="operating_hours" control={control} type="number"
                    placeholder="количество часов, цифра" errors={errors}
                />
                <SelectMain label="Узел отказа"
                    name="failure_component_fk" control={control}
                    options={failureComponent} errors={errors} placeholder="выберете узел"
                />
                <InputMain label="Описание отказа"
                    name="failure_description" control={control} type="text"
                    placeholder="описание" errors={errors}
                />
                <SelectMain label="Способ восстановления"
                    name="restoration_method_fk" control={control}
                    options={restorationMethod} errors={errors} placeholder="выберете способ"
                />
                <InputMain label="Используемые запасные части"
                    name="used_spare_parts" control={control} type="text"
                    placeholder="запасные части" errors={errors}
                />
                <InputMain label="Дата восстановления"
                    name="restoration_date" control={control} type="date"
                    placeholder="дата" errors={errors}
                />
                <SelectMain label="Организация, проводившая ТО"
                    name="maintenance_organization_fk" control={control}
                    options={maintenanceOrganization}
                    placeholder="выберете организацию" errors={errors}
                    disabled={whoAmIData?.groups[0] == "Сервисные"}

                />
                <Button colorScheme="silant-b" m="10px"
                    isLoading={isSubmitting} type="submit"
                    isDisabled={!isDirty || !isValid}
                    size={["xs", "md", "lg"]}
                >
                    Отправить
                </Button>
                <Button size={["xs", "md", "lg"]} colorScheme="silant-r" m="10px" onClick={() => handleForm()}>
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
            <FormLabel color="silant-b.300" fontSize={["0.7rem", "1rem", "1.5rem"]}
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
                        size={["xs", "md", "lg"]}
                        
                    />)}
            />
            {errors[name] &&
                <FormErrorMessage fontSize={["0.6rem", "0.8rem", "1.5rem"]}>{errors[name].message}</FormErrorMessage>
            }
        </FormControl>
    )
}

const SelectMain = ({ control, label, name, placeholder, options, errors, disabled }) => {
    const inputId = useId()

    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel color="silant-b.300" fontSize={["0.7rem", "1rem", "1.5rem"]}
                mb="0px" htmlFor={inputId}>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: "Это поле необходимо заполнить" }}
                render={({ field }) => (
                    <Select {...field}
                        disabled={disabled}
                        id={inputId}
                        // width="7rem"
                        borderColor="silant-b.700"
                        placeholder={placeholder}
                        size={["xs", "md", "lg"]}
                    >
                        {options.map((item) => (
                            <option fontSize={["0.6rem", "0.8rem", "1.5rem"]}  key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        )
                        )}
                    </Select >
                )}
            />
            {errors[name] &&
                <FormErrorMessage fontSize={["0.6rem", "0.8rem", "1.5rem"]}>{errors[name].message}</FormErrorMessage>
            }
        </FormControl>
    )
}

export default ComplaintAddForm
