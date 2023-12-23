import { Button, Text, VStack } from "@chakra-ui/react";
import { IconButton, Center } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import TableTemplate from "./TableTemplate";

export default function TableCompMaintenance({ maintenanceData, setRowIdMaintenance }) {

    const [sorting, setSorting] = useState([{ id: "maintenance_date", desc: "desc" }]);
    if (!maintenanceData || maintenanceData.length == 0) {
        return <Text color="silant-b.300"
            fontSize="2rem" fontWeight="bold" align="center" m="30px" bg="silant-r.50" border="solid">
            ТО с указанными параметрами не найдено
        </Text>
    }
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
        columnHelper.display({
            header: "Операции",
            id: "операции",
            cell: ({ row }) =>
                <Center>
                    <IconButton colorScheme="silant-b" textAlign="center" onClick={() => {
                        setRowIdMaintenance(
                            row.original.maintenance_pk
                        )
                    }}
                        icon={<InfoIcon />} />
                </Center>
            ,


            // cell: (info) => info.getValue(),
            // header: "Организация, проводившая ТО"
        }),
    ];

    return <TableTemplate columns={columnsAllFields}
        data={maintenanceData} sorting={sorting} setSorting={setSorting}
        setRowId={setRowIdMaintenance} />
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

