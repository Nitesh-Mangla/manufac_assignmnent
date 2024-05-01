import React, {useMemo} from 'react';
import {
    MantineReactTable, useMantineReactTable,
} from 'mantine-react-table';
import createTableData from "../Services/CreateTableData";
const tableData = createTableData();
const Average = () => {
    // FETCH CALCULATED DATA FOR DATA
    const data = tableData?.average
    // USE useMemo to store columns
    const columns = useMemo(() =>[
        {
            accessorKey: 'crop_name',
            header: 'Crop',
        },
        {
            accessorKey: 'Yield',
            header: 'Average Yield of the Crop between 1950-2020',
        },
        {
            accessorKey: 'Cultivation',
            header: 'Average Cultivation Area of the Crop between 1950-2020',
        },
    ], [] )

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <MantineReactTable table={table} />
    );
};

export default Average;
