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




export default function TableCompUnAuth({ machinesData }) {

    return <DataTable columns={columnsTenFields} data={machinesData} />

}


export function DataTable({
    data,
    columns

}) {

    const [sorting, setSorting] = useState([])

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
                                    <Th border="2px" borderColor="black" p="1px" fontSize="0.8rem" fontWeight="semibold" color="white" bgColor="sil-b"
                                        cursor="pointer"
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

const columnHelper = createColumnHelper();

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

