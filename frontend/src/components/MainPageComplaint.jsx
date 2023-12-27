import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Input, Select, FormLabel, FormControl } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Center, HStack } from "@chakra-ui/react";
import { useGetWhoAmIQuery } from "../services/apiScan";
import { useGetIsAuthQuery } from "../services/apiScan";
import { useGetComplaintQuery } from "../services/apiScan";
import { useState, useMemo } from "react";
import { useId } from "react";
import CardDetail from "./CardDetail";

import { sortBy, uniqBy, map, flow, concat } from "lodash";
import TableCompComplaint from "./TableCompComplaint";


function MainPageComplaint() {
    const { data: dataAuth, error: errorAuth, isLoading, isError: isErrorAuth } = useGetIsAuthQuery();
    const { data: complaintData = [], error: errorComplaint,
        isLoading: isLoadingComplaint, refetch: refetchComplaint } = useGetComplaintQuery();

    const [failureComponent, setFailureComponent] = useState("все");
    const [restorationMethod, setRestorationMethod] = useState("все");
    const [organization, setOrganization] = useState("все");

    const [rowIdComplaint, setRowIdComplaint] = useState(-1);
    const [addForm, setAddForm] = useState(false);

    const sortedComplaintData = useMemo(() => {
        return sortBy(complaintData, "pk").reverse()
    }, [complaintData])

    const filteredComplaintData = useMemo(() => {
        // console.log("serial", serial)
        // console.log("engine", engine)

        var complaintData_int = [...complaintData]

        if (failureComponent !== "все") complaintData_int = complaintData_int
            .filter(item => item['failure_component_name'] === failureComponent)

        if (restorationMethod !== "все") complaintData_int = complaintData_int
            .filter(item => item['restoration_method_name'] === restorationMethod)

        if (organization !== "все") complaintData_int = complaintData_int
            .filter(item => item['maintenance_organization_name'] === organization)

        return complaintData_int
    }, [complaintData, failureComponent, restorationMethod, organization])

    const failureComponentUniq = useMemo(() => fieldUniq(complaintData, 'failure_component_name')
        , [complaintData])

    const restorationMethodUniq = useMemo(() => fieldUniq(complaintData, 'restoration_method_name')
        , [complaintData])

    const organizationUniq = useMemo(() => fieldUniq(complaintData, 'maintenance_organization_name')
        , [complaintData])


    const handleChange = (param) => (event) => {
        switch (param) {
            case "failureComponent":
                setFailureComponent(event.target.value);
                // console.log('handle event', param, event.target.value)
                break;
            case "restorationMethod":
                setRestorationMethod(event.target.value);
                // console.log('handle event', param)
                break;
            case "organization":
                setOrganization(event.target.value);
                // console.log('handle event', param)
                break;
        }
    };

    const handleSetForm = () => {
        setAddForm(false)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // console.log("sortedMachineData from main", sortedMachinesData.map(item => ({ 'value': item.pk, 'label': item['machine_model_name'] })))
    // console.log("filteredMachineData from main 2", filteredMachinesData)

    return (
        <Box as="main" mx="1%" textAlign="center" >
            <Center>
                <FormControl>
                    <HStack m="20px" justifyContent="center" flexWrap="wrap" >
                        <SelectSil value={failureComponent} onChange={handleChange("failureComponent")} label="Узел отказа" options={failureComponentUniq} />
                        <SelectSil value={restorationMethod} onChange={handleChange("restorationMethod")} label="Способ восстановления" options={restorationMethodUniq} />
                        <SelectSil value={organization} onChange={handleChange("organization")} label="Сервисная компания" options={organizationUniq} />
                    </HStack>
                </FormControl>
            </Center>

            {isLoadingComplaint ?
                <Center h="50px">
                    <Spinner size="lg" colorScheme="silant-b" />
                </Center>
                :
                <>
                    {rowIdComplaint !== -1 ? <CardDetail fields={complaintFields}
                        data={filteredComplaintData.filter(item => item["complaint_pk"] === rowIdComplaint)[0]}
                        rowId={rowIdComplaint}
                        setRowId={setRowIdComplaint} /> :
                        <>

                            <TableCompComplaint complaintData={filteredComplaintData}
                                setRowIdComplaint={setRowIdComplaint} />
                        </>}
                </>
            }

        </Box>
    );
}

const SelectSil = ({ label, value, options, onChange, placeholder }) => {
    const id = useId()
    return (
        <Flex alignItems="center" direction="column" justifyContent="center" >
            <FormLabel color="silant-b.300" fontWeight="600" htmlFor={id} mx="5px">{label} </FormLabel >

            <Select borderColor="silant-b.700" placeholder={placeholder} id={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.label} value={option.value}>{option.label}</option>
                ))}
            </Select>
        </Flex >
    );
};

export default MainPageComplaint;

const fieldUniq = (data, fieldName) => {
    return flow(
        val => map(val, item => ({ 'value': item[fieldName], 'label': item[fieldName] })),
        val => uniqBy(val, "label"),
        val => sortBy(val, "label"),
        val => concat([{ label: "все", value: "все" }], val),
    )(data)
}


const complaintFields = [
    { title: "Заводской номер машины:", key: "machine_fk_serial" },
    { title: "Дата отказа:", key: "failure_date" },
    { title: "Наработка машино-часов:", key: "operating_hours" },
    { title: "Узел отказа:", key: "failure_component_name" },
    { title: "Описание отказа:", key: "failure_description" },
    { title: "Способ восстановления:", key: "restoration_method_name" },
    { title: "Используемые запасные части:", key: "used_spare_parts" },
    { title: "Дата восстановления:", key: "restoration_date" },
    { title: "Время простоя техники, дней:", key: "downtime_duration" },
    { title: "Сервисная компания:", key: "maintenance_organization_name" },
]
// "machine_fk": 0,
// "machine_fk_model_name": "string",
// "machine_fk_serial": "string",
// "failure_date": "2023-12-27",
// "operating_hours": 0,
// "failure_component_fk": 0,
// "failure_component_name": "string",
// "failure_component_description": "string",
// "failure_description": "string",
// "restoration_method_fk": 0,
// "restoration_method_name": "string",
// "restoration_method_description": "string",
// "used_spare_parts": "string",
// "restoration_date": "2023-12-27",
// "downtime_duration": 0,
// "maintenance_organization_fk": 0,
// "maintenance_organization_name": "string",
// "maintenance_organization_description": "string",
// "maintenance_organization_username": "string"
