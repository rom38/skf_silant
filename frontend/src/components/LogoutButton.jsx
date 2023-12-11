import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import { useLogoutMutation } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";



const LogoutButton = () => {
    const [logout, { isLoading, error }] = useLogoutMutation();
    const { data: dataAuth, refetch } = useGetIsAuthQuery();

    const onClick = async (data, e) => {
        try {
            await logout().unwrap()
            console.log('Logout from button')
            refetch()
        } catch (err) {
            console.log('error Logout', err)
        }
    };

    return (
        <Button onClick={() => onClick()}>
            Выйти
        </Button>

    );
}

export default LogoutButton;
