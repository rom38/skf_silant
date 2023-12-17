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

export default function TableCompMaintenance({ maintenanceData }) {

    const [sorting, setSorting] = useState([{ id: "maintenance_date", desc: "desc" }]);
    if (!maintenanceData || maintenanceData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
            ТО с указанными параметрами не найдено
        </Text>
    }
    return <TableTemplate columns={columnsAllFields}
        data={maintenanceData} sorting={sorting} setSorting={setSorting} />

}


const data3 = [
    {
        "machine_fk": 1,
        "machine_fk_model_name": "ПГ1,5",
        "machine_fk_serial": "0017",
        "maintenance_type_fk": 2,
        "maintenance_type_name": "ТО-1 (200 м/час)",
        "maintenance_type_description": "ТО-1 (200 м/час)",
        "maintenance_date": "2022-04-11",
        "operating_hours": 210,
        "work_order_number": "#2022-16КЕ87СИЛ",
        "work_order_date": "2022-04-09",
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
    columnHelper.accessor("maintenance_type_name", {
        cell: (info) => info.getValue(),
        header: "Вид ТО"
    }),
    columnHelper.accessor("maintenance_date", {
        cell: (info) => info.getValue(),
        header: "Дата проведения ТО"
    }),
    columnHelper.accessor("operating_hours", {
        cell: (info) => info.getValue(),
        header: "Наработка, м/час"
    }),
    columnHelper.accessor("work_order_number", {
        cell: (info) => info.getValue(),
        header: "№ заказ-наряда"
    }),
    columnHelper.accessor("work_order_date", {
        cell: (info) => info.getValue(),
        header: "Дата заказ-наряда"
    }),
    columnHelper.accessor("maintenance_organization_name", {
        cell: (info) => info.getValue(),
        header: "Организация, проводившая ТО"
    }),
];
