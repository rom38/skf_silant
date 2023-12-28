import { Container, Image, Box, Text, HStack } from "@chakra-ui/react";
import logoTypeRed from "../media/logotype_r.svg"
import { FaTelegram } from "./SilantIcons";

export const Footer = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between"
            bg="sil-b" as="footer" role="contentinfo" py={{ base: '8px', md: '16px' }}
            color="sil-w" maxW='2xlg' px="10px" gap="5px">
            <Image w={["80px", "120px", "200px"]} src={logoTypeRed} alt="" />
            <HStack>
                <Text textAlign="center" fontSize={["0.5rem", "0.8rem", "1.5rem"]}>
                    +7-8352-20-12-09, telegram
                    <FaTelegram ml="5px" width={["0.5rem", "0.8rem", "1.5rem"]} />
                </Text>
            </HStack>
            <Text fontSize={["0.5rem", "0.8rem", "1.5rem"]} >Мой Силант 2022</Text>
        </Box>

    )
}



