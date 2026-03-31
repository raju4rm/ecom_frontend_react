import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

import { Group, Text, NumberInput, MantineProvider  } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import {setPaginationData} from '../../../store/paginationSlice'

export default function AppDataTable({
  recordsValue = [],
  columnsValue = [],
  heightValue = 300,
  totalRecordsValue = 0,
}) {
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);    
    const PAGE_SIZES = [5, 10, 15, 20, 25, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]); // default 15
    const [page, setPage] = useState(pageNo);
    const dispatch = useDispatch();
    

    useEffect(() => {
      dispatch(setPaginationData({page:page, limit:pageSize}))
    }, [page, pageSize,recordsValue]);

    const theme = localStorage.getItem('theme') || 'light';
  return (
      <DataTable
        height={300}
        withTableBorder
        records={recordsValue}
        columns={columnsValue}
        totalRecords={totalRecordsValue}
        paginationActiveBackgroundColor="grape"
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}

      />
  );
}
