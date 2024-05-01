import React, {useMemo} from 'react';
import {
    MantineReactTable, useMantineReactTable,
} from 'mantine-react-table';
import createTableData from "../Services/CreateTableData";
const tableData = createTableData();

const ProductionData = () => {
    // FETCH CALCULATED DATA FOR DATA
    const data = tableData?.crops_data

    // USE useMemo to store columns
    const columns = useMemo(() =>[
        {
            accessorKey: 'year',
            header: 'Year',
        },
        {
            accessorKey: 'max_corp_name',
            header: 'Crop with Maximum Production in that Year',
        },
        {
            accessorKey: 'min_corp_name', //normal accessorKey
            header: 'Crop with Minimum Production in that Year',
        },
    ], [] )

    const table = useMantineReactTable({
        columns,
        data,
    });

    return (
        <MantineReactTable table={table} />
    );
};

export default ProductionData;
