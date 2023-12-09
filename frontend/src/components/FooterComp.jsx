import imageLogo1 from "../media/scan_logo_1.svg";
import { Container, Image, Box } from "@chakra-ui/react";
import logoTypeRed from "../media/logotype_r.svg"




export const Footer = () => {
    return (
        // <footer>
        //     <img src={imageLogo1} alt="" />
        //     <span>Мой Силант 2022</span>
        // </footer>
        <Box display="flex" alignItems="center" justifyContent="space-between"
            bg="sil-b" h="110px" as="footer" role="contentinfo" py={{ base: '16', md: '16' }}
            color="sil-w" maxW='2xlg' px="10px" >
            <Image w="200px" src={logoTypeRed} alt="" />
            <span>Мой Силант 2022</span>
        </Box>

    )
}



// footer {
//     color: white;
//     padding: 1%;
//     background: #029491;
//     font-size: 1rem;
//     height: 110px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: auto;
// }



// footer>p {
//     font-family: Inter;
//     font-size: 14px;
//     font-weight: 400;
//     line-height: 17px;
//     letter-spacing: 0.02em;
//     text-align: right;
// }
