import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, chakra } from "@chakra-ui/react";
import { Spinner, Center } from "@chakra-ui/react";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
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
import TableTemplate from "./TableTemplate";




export default function TableCompUnAuth({ machinesData, setRowIdMachine }) {
    const [sorting, setSorting] = useState([])

    const handleRowId = (row) => {
        console.log(row);
        setRowIdMachine(row["pk"]);
    }

    const columnsTenFields = [
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
        })
    ];

    return <TableTemplate handleRowId={handleRowId} columns={columnsTenFields} data={machinesData} sorting={sorting} setSorting={setSorting} />

}

const columnHelper = createColumnHelper();


