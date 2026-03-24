import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

import { Group, Text, NumberInput, MantineProvider  } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '../../../data/employees.json';
import dayjs from 'dayjs';

export default function AppDataTable({
  data = [],
  columnsValue = [],
  heightValue = 300,
  totalRecordsValue = 0,
}) {
    const PAGE_SIZES = [5, 10, 15, 20, 25, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]); // default 15
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(employees.slice(from, to));
    }, [page, pageSize]);

    const theme = localStorage.getItem('theme') || 'light';
  return (
      <DataTable
          height={300}
          withTableBorder
          records={data}
          columns={[
              { accessor: 'firstName', width: 100 },
              { accessor: 'lastName', width: 100 },
              { accessor: 'email', width: '100%' },
              
          ]}
          totalRecords={data.length}
          paginationActiveBackgroundColor="grape"
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          paginationTextColor="dark"

      />
  );
}
