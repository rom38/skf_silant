import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    DrawerCloseButton,
    DrawerHeader,
    DrawerFooter,
    useDisclosure
} from "@chakra-ui/react";
import { useLogoutMutation } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";



const LoginButton = () => {
    const [logout, { isLoading, error }] = useLogoutMutation();
    // const { data: dataAuth, refetch } = useGetIsAuthQuery();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClick = async (data, e) => {
        console.log('i am in auth form')

    }


    return (
        <>
            <Button onClick={onOpen} color="sil-b">
                Войти
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Авторизоваться</DrawerHeader>

                    <DrawerBody>
                        <form
                            id="auth-form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                console.log('submitted')
                            }}
                        >
                            <Input name='nickname' placeholder='Type here...' />
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button type='submit' form='auth-form'>
                            Войти
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    );
}

export default LoginButton;
