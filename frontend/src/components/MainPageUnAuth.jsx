import { Box, Button, Flex, Text, Input, Center } from "@chakra-ui/react";
import { FormLabel, FormControl, FormErrorMessage, Spinner } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { useMachineMutation } from "../services/apiScan";
import TableCompUnAuth from "./TableCompUnAuth";

function MainPageUnAuth() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: whoAmIData, error: errorWhoAmI, isLoading: isLoadingWhoAmI, refetch: refetchWhoAmI } = useGetWhoAmIQuery({ skip: (errorAuth !== undefined) });
    const [page, setPage] = useState("main")
    const [errorMachineNotFound, setErrorMachineNotFound] = useState(false);

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

    useEffect(() => {
        return setErrorMachineNotFound(false)
    })

    const [fetchMachine, { isLoading: isLoadingMachine, error: errorMachine,
        isError: isErrorMachine, data: machineData }] = useMachineMutation();
    const onSubmit = async (data, e) => {

        e.preventDefault()
        try {
            await fetchMachine(data.machineNumber).unwrap()
        }
        catch (err) {
            if (isErrorMachine && errorMachine?.status === 404) setErrorMachineNotFound(true)
            setError("machineNumber", { type: 404, message: "Машины с таким номером не найдено" })
        }
        console.log('form submit', data);
        // reset();
    };


    console.log("whoami from main", whoAmIData)
    return (
        <Box as="main" mx="1%">
            <Text fontSize={["0.8rem", "1.5rem", "2rem"]} color="silant-b.300" fontWeight="bold" align="center" m="30px">
                Проверьте комплектацию и технические характеристики техники Силант
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} id="machine-form">
                <FormControl isInvalid={errors.machineNumber || errorMachineNotFound} onSubmit={handleSubmit(onSubmit)}>
                    <Flex alignItems="center" justifyContent="center" gap="0.5rem">
                        <FormLabel color="silant-b.300" fontSize={["0.8rem", "1.2rem", "2rem"]}
                            mb="0px" htmlFor="machineNumber">Заводской номер</FormLabel>
                        <Controller
                            control={control}
                            name="machineNumber"
                            rules={{
                                required: "Это поле необходимо", minLength: {
                                    value: 4,
                                    message: "Минимальная длина номера должна быть 4"
                                }
                            }}

                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Input
                                    size={["xs", "sm"]}
                                    type="number"
                                    width="7rem"
                                    borderColor="silant-b.700"
                                    id="machineNumber"
                                    placeholder="номер"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />)}
                        />
                        <Button size={["xs", "sm", "md"]} colorScheme="silant-b"
                            isLoading={isSubmitting} type="submit"
                            isDisabled={errors.machineNumber}>
                            Поиск
                        </Button>
                    </Flex>
                    <Center>
                        <FormErrorMessage fontSize={["0.6rem", "1.3rem", "1.7rem"]}>
                            {errors.machineNumber && errors.machineNumber.message}
                            {errorMachineNotFound && "Машины с таким номером не найдено"}
                        </FormErrorMessage>
                    </Center>
                </FormControl>
            </form>

            {/* {isErrorMachine} */}


            <Text fontSize={["0.8rem", "1.5rem", "2rem"]} color="silant-b.300" fontWeight="bold" align="center" m="30px">
                Информация о комплектации и технических характеристиках Вашей техники
            </Text>

            {errorMachine?.status === 404 &&
                <Text color="silant-b.300"
                    fontSize={["0.8rem", "1.5rem", "2rem"]} fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
                    Данных о машине с таким заводским номером нет в системе
                </Text>}

            {isLoadingMachine &&
                <Center h="50px">
                    <Spinner size="lg" colorScheme="silant-b" />
                </Center>
            }

            {machineData &&
                <TableCompUnAuth machinesData={[machineData]} />
            }



            {/* <LoginForm2 /> */}
            {/* <Tariff /> */}
        </Box>
    );
}

export default MainPageUnAuth;
