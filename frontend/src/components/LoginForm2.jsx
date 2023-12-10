import { useForm } from "react-hook-form";
import React from "react";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";

const LoginForm2 = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onBlur",
    });

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl colorScheme="sil-b" isInvalid={errors.name}>
                <FormLabel htmlFor="username">Логин</FormLabel>
                <Input

                    id="username"
                    placeholder="name"
                    {...register("name", {
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
