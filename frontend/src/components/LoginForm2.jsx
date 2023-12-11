import { useForm } from "react-hook-form";
import React from "react";
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

    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();

    const { data: csrf, error: errorCSRF, isLoading: isLoadingCSRF, refetch: refetchCSRF } = useGetCSRFQuery();


    const [isAuthError, setIsAuthError] = useState(false);

    const onSubmit = async (data, e) => {

        e.preventDefault()
        try {
            const credentials = await login(data).unwrap()
            console.log('from rtk', credentials)
            dispatch(setCredentials(credentials))
            setIsAuthError(false);
            refetchCSRF();
            // navigate('/')
        } catch (err) {
            console.log('error fetch token', err)
            setIsAuthError(true);
            refetchCSRF();
        }
        console.log('form submit', data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl colorScheme="sil-b" isInvalid={errors.name}>
                <FormLabel htmlFor="username">Логин</FormLabel>
                <Input

                    id="username"
                    placeholder="name"
                    {...register("username", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" }
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <Input
                    id="password"
                    placeholder="password"
                    {...register("password", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum password length should be 4" }
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button width="sm" mt={4} bg="sil-r" color="wheat" border="solid 4px black" outlineColor="red" isLoading={isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    );
}

export default LoginForm2;
