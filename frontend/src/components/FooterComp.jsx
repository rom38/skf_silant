import imageLogo1 from "../media/scan_logo_1.svg";
import { Container, Image, Box, Text, HStack } from "@chakra-ui/react";
import logoTypeRed from "../media/logotype_r.svg"
import { FaTelegram } from "./Telegram";

export const Footer = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between"
            bg="sil-b" as="footer" role="contentinfo" py={{ base: '16px', md: '16px' }}
            color="sil-w" maxW='2xlg' px="10px" >
            <Image w="300px" h="50px" objectFit="cover" src={logoTypeRed} alt="" />
            <HStack>
                <Text>
                    +7-8352-20-12-09, telegram
                </Text>
                <FaTelegram />
            </HStack>
            <span>Мой Силант 2022</span>
        </Box>

    )
}



