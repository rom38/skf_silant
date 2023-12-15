//import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm2 from "./LoginForm2"
import WrapTable from "./TableComp";
import { Box, Button, Flex, Text, Input, Center } from "@chakra-ui/react";
import { FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { useMachineMutation } from "../services/apiScan";


// import style from "../styles/MainPage.module.css";
// import SimpleSlider from "./MainPageSlider";
// import Tariff from "./MainPageTariff";

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
        isError: isErrorMachine }] = useMachineMutation();
    const onSubmit = async (data, e) => {

        e.preventDefault()
        try {
            const machineData = await fetchMachine(data.machineNumber).unwrap()
            console.log('from main UnAuth', machineData)
            // setIsAuthError(false);
            // refetchCSRF();

            // console.log('from rtk Auth', data)
            // refetchAuth();
            // navigate('/')
        } catch (err) {
            console.log('error fetch token', errorMachine)
            if (errorMachine?.status === 404) setErrorMachineNotFound(true)
            // console.log('error fetch login auth', isErrorAuth)
            // setIsAuthError(true);
            // refetchCSRF();
        }
        console.log('form submit', data);
        // reset();
    };


    console.log("whoami from main", whoAmIData)
    // const store = { token: false };
    //const accessToken = useSelector(selectAuthAccessToken);
    // const navigate = useNavigate()
    return (
        <Box as="main" mx="1%">
            <Text color="silant-b.300" fontSize="2rem" fontWeight="bold" align="center" m="30px">
                Проверьте комплектацию и технические характеристики техники Силант
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} id="machine-form">
                <FormControl isInvalid={errors.machineNumber || errorMachineNotFound} onSubmit={handleSubmit(onSubmit)}>
                    <Flex alignItems="center" justifyContent="center" gap="0.5rem">
                        <FormLabel color="silant-b.300" fontSize="1.5em"
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
                                    type="number"
                                    width="7rem"
                                    borderColor="silant-b.700"

                                    id="machineNumber"
                                    placeholder="номер"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />)}
                        />
                        < Button colorScheme="silant-b"
                            isLoading={isSubmitting} type="submit"
                            isDisabled={errors.machineNumber}>
                            Поиск
                        </Button>
                    </Flex>
                    <Center>
                        <FormErrorMessage>
                            {errors.machineNumber && errors.machineNumber.message}
                            {errorMachineNotFound && "Машины с таким номером не найдено"}
                        </FormErrorMessage>
                    </Center>
                </FormControl>
            </form>


            <Text color="silant-b.300" fontSize="2rem" fontWeight="bold" align="center" m="30px">
                Информация о комплектации и технических характеристиках Вашей техники
            </Text>
            <WrapTable />


            {/* <LoginForm2 /> */}
            {/* <Tariff /> */}
        </Box>
    );
}

export default MainPageUnAuth;
