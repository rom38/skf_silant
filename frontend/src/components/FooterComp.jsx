import imageLogo1 from "../media/scan_logo_1.svg";
import { Container } from "@chakra-ui/react";

export const Footer = () => {
    return (
        // <footer>
        //     <img src={imageLogo1} alt="" />
        //     <span>Мой Силант 2022</span>
        // </footer>
        <Container as="footer" role="contentinfo" py={{ base: '16', md: '16' }}>
            <img src={imageLogo1} alt="" />
            <span>Мой Силант 2022</span>
        </Container>

    )
}



