import { useEffect } from "react";

const Redirect = ({ url }) => {
    //const { url } = props
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return <h5>Redirecting...</h5>;
};

export default Redirect;