import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, chakra } from "@chakra-ui/react";
import { Spinner, Center } from "@chakra-ui/react";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    //ColumnDef,
    //SortingState,
    getSortedRowModel
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useGetMachinesQuery } from "../services/apiScan";
import TableTemplate from "./TableTemplate";

export default function TableCompComplaint({ complaintData }) {

    const [sorting, setSorting] = useState([{ id: "failure_date", desc: "desc" }]);
    if (!complaintData || complaintData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
            Рекламации с указанными параметрами не найдено
        </Text>
    }
    return <TableTemplate columns={columnsAllFields}
        data={complaintData} sorting={sorting} setSorting={setSorting} />

}


const data3 = [
    {
        "machine_fk": 8,
        "machine_fk_model_name": "ПД2,5",
        "machine_fk_serial": "0045",
        "failure_date": "2022-09-07",
        "operating_hours": 47,
        "failure_component_fk": 6,
        "failure_component_name": "Гидросистема",
        "failure_component_description": "Гидросистема",
        "failure_description": "течь масла",
        "restoration_method_fk": 2,
        "restoration_method_name": "Ремонт узла",
        "restoration_method_description": "Ремонт узла",
        "used_spare_parts": "прокладки",
        "restoration_date": "2022-09-09",
        "downtime_duration": 2,
        "maintenance_organization_fk": 5,
        "maintenance_organization_name": "ООО ФНС",
        "maintenance_organization_description": "ООО ФНС",
        "maintenance_organization_username": "fns"
    },]

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
];
