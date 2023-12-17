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




export default function WrapTable({ machinesData }) {

    const [sorting, setSorting] = useState([{ id: "factory_delivery_date", desc: "desc" }]);
    if (!machinesData || machinesData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
            Машины с такими параметрами не найдено
        </Text>
    }
    return <TableTemplate columns={columnsAllFields}
        data={machinesData} sorting={sorting} setSorting={setSorting} />

}


const data2 = [
    {
        "pk": 5,
        "machine_model_fk": 4,
        "machine_model_name": "ПД3,0",
        "machine_model_description": "ПД3,0",
        "machine_serial": "0003",
        "engine_model_fk": 3,
        "engine_model_name": "Kubota V3300",
        "engine_model_description": "Kubota V3300",
        "engine_serial": "2ME0639",
        "transmission_model_fk": 3,
        "transmission_model_name": "10VB-00106",
        "transmission_model_description": "10VB-00106",
        "transmission_serial": "21D0108264",
        "driveline_model_fk": 3,
        "driveline_model_name": "20VB-00102",
        "driveline_model_description": "20VB-00102",
        "driveline_model_serial": "21D0107988",
        "steering_axel_model_fk": 3,
        "steering_axel_model_name": "VS30-00001",
        "steering_axel_model_description": "VS30-00001",
        "steering_axel_model_serial": "0821004",
        "supply_contract": "№511 от 20.09.2021",
        "factory_delivery_date": "2021-09-30",
        "buyer_client_fk": 6,
        "buyer_client_name": "ООО \"Ранский ЛПХ\"",
        "buyer_client_username": "ran_lph",
        "end_user": "ООО \"Ранский ЛПХ\"",
        "delivery_address": "п. Опарино, Кировская обл.",
        "machine_configuration": "Стандарт",
        "maintenance_organization_fk": 4,
        "maintenance_organization_name": "ООО Силант",
        "maintenance_organization_description": "ООО Силант",
        "maintenance_organization_username": "silant"
    }]

const columnHelper = createColumnHelper();

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
    })
];
