import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
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
import { useState } from "react";




export default function WrapTable() {
    return (

        <DataTable columns={columns} data={data} />

    );
}


export function DataTable({
    data,
    columns
}) {
    const [sorting, setSorting] = useState([]);
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
        <Table>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                            const meta = header.column.columnDef.meta;
                            return (
                                <Th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    isNumeric={meta?.isNumeric}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}

                                    <chakra.span pl="4">
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === "desc" ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            );
                        })}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                            const meta = cell.column.columnDef.meta;
                            return (
                                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            );
                        })}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

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

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("fromUnit", {
        cell: (info) => info.getValue(),
        header: "To convert"
    }),
    columnHelper.accessor("toUnit", {
        cell: (info) => info.getValue(),
        header: "Into"
    }),
    columnHelper.accessor("factor", {
        cell: (info) => info.getValue(),
        header: "Multiply by",
        meta: {
            isNumeric: true
        }
    })
];
