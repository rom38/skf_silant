import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import { useLoginMutation } from "../services/apiScan";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetCSRFQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";



const LoginForm2 = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "silant",
            password: "client25",
        },
    });

    const [login, { isLoading, error: errorLogin, isError: isErrorLogin }] = useLoginMutation();
    const dispatch = useDispatch();

    const { data: csrf, error: errorCSRF,
        isLoading: isLoadingCSRF, refetch: refetchCSRF } = useGetCSRFQuery();
    const { data: dataAuth, error: errorAuth,
        isLoading: isLoadingAuth, isError: isErrorAuth, refetch: refetchAuth } = useGetIsAuthQuery();


    const [isAuthError, setIsAuthError] = useState(false);

    const onSubmit = async (data, e) => {

        e.preventDefault()
        try {
            const credentials = await login(data).unwrap()
            console.log('from rtk', credentials)
            setIsAuthError(false);
            refetchCSRF();

            console.log('from rtk Auth', data)
            // refetchAuth();
            // navigate('/')
        } catch (err) {
            console.log('error fetch token', err)
            console.log('error fetch login auth', isErrorAuth)
            setIsAuthError(true);
            refetchCSRF();
        }
        console.log('form submit', data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl colorScheme="silant-r" isInvalid={errors.username || errors.password || errorLogin?.status}>
                <FormErrorMessage colorScheme="sil-b">
                    {errorLogin?.status}  {errorLogin?.status && "Неправильный логин или пароль"}
                </FormErrorMessage>
                <FormLabel htmlFor="username">Логин</FormLabel>
                <Input
                    borderColor="silant-b.700"

                    id="username"
                    placeholder="name"
                    {...register("username", {
                        required: "This is required",
                        minLength: { value: 4, message: "Минимальная длина логина должна быть 4" }
                    })}
                />
                <FormErrorMessage colorScheme="sil-b">
                    {errors.username && errors.username.message}
                    {errorLogin?.status && "Неправильный логин или пароль"}
                </FormErrorMessage>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <Input
                    borderColor="silant-b.700"
                    id="password"
                    placeholder="password"
                    {...register("password", {
                        required: "This is required",
                        minLength: { value: 4, message: "Минимальная длина пароля должна быть 4" }
                    })}
                />

            </FormControl>
            <Button width="sm" mt={4} colorScheme="silant-b"
                color="wheat" border="solid 4px black"
                isLoading={isSubmitting} type="submit"
                isDisabled={errors.username || errors.password}>
                Авторизоваться
            </Button>
        </form>
    );
}

export default LoginForm2;
