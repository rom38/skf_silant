import { Button, Text, VStack } from "@chakra-ui/react";
import { IconButton, Center } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import TableTemplate from "./TableTemplate";

export default function TableCompComplaint({ complaintData, setRowIdComplaint }) {

    const [sorting, setSorting] = useState([{ id: "failure_date", desc: "desc" }]);

    const handleRowId = (row) => {
        console.log(row);
        setRowIdComplaint(row["complaint_pk"]);

    }

    const columnHelper = createColumnHelper();

    const columnsAllFields = [
        columnHelper.accessor("machine_fk_serial", {
            cell: (info) => info.getValue(),
            header: "Зав. № машины"
        }),
        columnHelper.accessor("failure_date", {
            cell: (info) => info.getValue(),
            header: "Дата отказа"
        }),
        columnHelper.accessor("operating_hours", {
            cell: (info) => info.getValue(),
            header: "Наработка, м/час"
        }),
        columnHelper.accessor("failure_component_name", {
            cell: (info) => info.getValue(),
            header: "Узел отказа"
        }),
        columnHelper.accessor("failure_description", {
            cell: (info) => info.getValue(),
            header: "Описание отказа"
        }),
        columnHelper.accessor("restoration_method_name", {
            cell: (info) => info.getValue(),
            header: "Способ восстановления"
        }),
        columnHelper.accessor("used_spare_parts", {
            cell: (info) => info.getValue(),
            header: "Используемые запасные части"
        }),
        columnHelper.accessor("restoration_date", {
            cell: (info) => info.getValue(),
            header: "Дата восстановления"
        }),
        columnHelper.accessor("downtime_duration", {
            cell: (info) => info.getValue(),
            header: "Время простоя техники"
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
                        textAlign="center" onClick={() => {
                            setRowIdComplaint(
                                row.original["complaint_pk"]
                            )
                        }}
                        icon={<InfoIcon boxSize={["0.8rem", "1rem", "1.5rem"]} />} />
                </Center>
            ,


            // cell: (info) => info.getValue(),
            // header: "Организация, проводившая ТО"
        }),
    ];

    if (!complaintData || complaintData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
            Рекламации с указанными параметрами не найдено
        </Text>
    }
    return <TableTemplate columns={columnsAllFields}
        data={complaintData} sorting={sorting} setSorting={setSorting}
        handleRowId={handleRowId}
    />
}


