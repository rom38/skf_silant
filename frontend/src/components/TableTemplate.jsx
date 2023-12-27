import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
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


export default function TableTemplate({
    data,
    columns,
    sorting,
    setSorting,
    setRowId,
}) {

    // const [sorting, setSorting] = useState([{ id: "factory_delivery_date", desc: "desc" }]);



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

            <Table size={["xs", "sm"]}>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta = header.column.columnDef.meta;
                                return (
                                    <Th border={["1px", "2px"]} borderColor={["black", "black"]} p="1px"
                                        fontSize={["0.35rem", "0.8rem", "1.2rem"]} fontWeight="semibold" color="white" bgColor="sil-b"
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
                                    <Td border={["1px", "2px"]} p={["1px", "5px"]} fontSize={["0.35rem", "0.8rem", "1.2rem"]} key={cell.id} isNumeric={meta?.isNumeric}>
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
