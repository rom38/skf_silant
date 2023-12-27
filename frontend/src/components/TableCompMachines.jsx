import { Text, Center, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { InfoIcon } from "@chakra-ui/icons";

import { useState } from "react";
import TableTemplate from "./TableTemplate";

export default function TableCompMachines({ machinesData, setRowIdMachine }) {
    const [sorting, setSorting] = useState([{ id: "factory_delivery_date", desc: "desc" }]);
    const columnHelper = createColumnHelper();

    const handleRowId = (row) => {
        console.log(row);
        setRowIdMachine(row["pk"]);
    }

    const columnsAllFields = [
        columnHelper.accessor("machine_model_name", {
            cell: (info) => info.getValue(),
            header: "Модель техники"
        }),
        columnHelper.accessor("machine_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № машины"
        }),
        columnHelper.accessor("engine_model_name", {
            cell: (info) => info.getValue(),
            header: "Модель двигателя"
        }),
        columnHelper.accessor("engine_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № двигателя"
        }),
        columnHelper.accessor("transmission_model_name", {
            cell: (info) => info.getValue(),
            header: "Модель трансмиссии"
        }),
        columnHelper.accessor("transmission_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № трансмиссии"
        }),
        columnHelper.accessor("driveline_model_name", {
            cell: (info) => info.getValue(),
            header: "Модель ведущего моста"
        }),
        columnHelper.accessor("driveline_model_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № ведущего моста"
        }),
        columnHelper.accessor("steering_axel_model_name", {
            cell: (info) => info.getValue(),
            header: "Модель управляемого моста"
        }),
        columnHelper.accessor("steering_axel_model_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № управляемого моста"
        }),
        columnHelper.accessor("supply_contract", {
            cell: (info) => info.getValue(),
            header: "Договор поставки №, дата"
        }),
        columnHelper.accessor("factory_delivery_date", {
            cell: (info) => info.getValue(),
            header: "Дата отгрузки с завода"
        }),
        columnHelper.accessor("buyer_client_name", {
            cell: (info) => info.getValue(),
            header: "Клиент"
        }),
        columnHelper.accessor("end_user", {
            cell: (info) => info.getValue(),
            header: "Грузополучатель (конечный потребитель)"
        }),
        columnHelper.accessor("delivery_address", {
            cell: (info) => info.getValue(),
            header: "Адрес поставки (эксплуатации)"
        }),
        columnHelper.accessor("machine_configuration", {
            cell: (info) => <Text whiteSpace="pre-wrap"> {info.getValue()} </Text>,
            header: "Комплектация (доп. опции)"
        }),
        columnHelper.accessor("maintenance_organization_name", {
            cell: (info) => info.getValue(),
            header: "Сервисная компания"
        }),
        columnHelper.display({
            header: "Операции",
            id: "операции",
            cell: ({ row }) =>
                <Center>
                    <IconButton size={["xs", "sm"]} colorScheme="silant-b"
                        textAlign="center" onClick={() =>
                            setRowIdMachine(
                                row.original["pk"]
                            )
                        }
                        icon={<InfoIcon boxSize={["0.8rem", "1rem", "1.5rem"]} />} />
                </Center>
            ,


            // cell: (info) => info.getValue(),
            // header: "Организация, проводившая ТО"
        }),
    ];
    if (!machinesData || machinesData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50"
            border="solid">
            Техники с указанными параметрами не найдено
        </Text>
    }
    return <TableTemplate columns={columnsAllFields}
        data={machinesData} sorting={sorting}
        setSorting={setSorting} handleRowId={handleRowId} />
}

