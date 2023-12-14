import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, chakra } from "@chakra-ui/react";
import { Spinner, Center } from "@chakra-ui/react";
import { Flex, Box, Spacer } from "@chakra-ui/react";
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




export default function WrapTable() {
    const { data: machinesData, error: errorMachines, isLoading: isLoadingMachines, refetch: refetchMachines } = useGetMachinesQuery();
    useEffect(() => {
        if (typeof machinesData !== 'undefined') {

            console.log("machine data from query", machinesData, Object.keys(machinesData[0]).length)
        }
    }, [machinesData])
    if (isLoadingMachines) return
    <Center h="100px">
        <Spinner size="xl" colorScheme="silant-b" />
    </Center>

    if (!machinesData) return <div>Missing post!</div>
    if (typeof machinesData !== 'undefined' && Object.keys(machinesData[0]).length == 33) return <DataTable columns={columns2} data={machinesData} />
    if (typeof machinesData !== 'undefined' && Object.keys(machinesData[0]).length == 21) return <DataTable columns={columnsTenFields} data={machinesData} />

    return (

        <DataTable columns={columns2} data={data2} />

    );
}


export function DataTable({
    data,
    columns
}) {
    const [sorting, setSorting] = useState([{ id: "factory_delivery_date", desc: "desc" }]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    return (
        <TableContainer whiteSpace="wrap" >

            <Table size="sm" >
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta = header.column.columnDef.meta;
                                return (
                                    <Th border="2px" p="1px" fontSize="0.8rem" fontWeight="semibold"
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Flex>
                                            <Box>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                            </Box>
                                            <Spacer />
                                            <Box>
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === "desc" ? (
                                                        <TriangleDownIcon aria-label="sorted descending" />
                                                    ) : (
                                                        <TriangleUpIcon aria-label="sorted ascending" />
                                                    )
                                                ) : null}
                                            </Box>
                                        </Flex>

                                        {/* <chakra.span pl="1"> */}
                                        {/* {header.column.getIsSorted() ? (
                                        header.column.getIsSorted() === "desc" ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            ) : null} */}
                                        {/* {
                                        header.column.getIsSorted() === "desc" ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            } */}
                                        {/* </chakra.span> */}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id} onClick={() => console.log(row.original)}>
                            {row.getVisibleCells().map((cell) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta = cell.column.columnDef.meta;
                                return (
                                    <Td border="2px" p="5px" fontSize="0.8rem" key={cell.id} isNumeric={meta?.isNumeric}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
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

const columns2 = [
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
        cell: (info) => info.getValue(),
        header: "Комплектация (доп. опции)"
    }),
    columnHelper.accessor("maintenance_organization_name", {
        cell: (info) => info.getValue(),
        header: "Сервисная компания"
    })
];
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

const data = [
    {
        fromUnit: "inches",
        toUnit: "millimetres (mm)",
        factor: 25.4
    },
    {
        fromUnit: "feet",
        toUnit: "centimetres (cm)",
        factor: 30.48
    },
    {
        fromUnit: "yards",
        toUnit: "metres (m)",
        factor: 0.91444
    }
];



// const columns = [
//     columnHelper.accessor("fromUnit", {
//         cell: (info) => info.getValue(),
//         header: "To convert"
//     }),
//     columnHelper.accessor("toUnit", {
//         cell: (info) => info.getValue(),
//         header: "Into"
//     }),
//     columnHelper.accessor("factor", {
//         cell: (info) => info.getValue(),
//         header: "Multiply by",
//         meta: {
//             isNumeric: true
//         }
//     })
// ];
