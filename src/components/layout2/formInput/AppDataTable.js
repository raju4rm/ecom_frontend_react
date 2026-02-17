import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';

const DEFAULT_PAGE_SIZES = [10, 15, 20, 30, 50, 100];

export default function AppDataTable({
  data = [],
  columns = [],
  pageSizes = DEFAULT_PAGE_SIZES,
  height = 300,
}) {
  const [pageSize, setPageSize] = useState(pageSizes[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);

  // reset page when page size changes
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // paginate data
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize, data]);

  return (
    <DataTable
      height={height}
      withTableBorder
      records={records}
      columns={columns}
      totalRecords={data.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={pageSizes}
      onRecordsPerPageChange={setPageSize}
      paginationText={({ from, to, totalRecords }) =>
        `Records ${from} - ${to} of ${totalRecords}`
      }
      noRecordsText="No records found"
      loadingText="Loading..."
    />
  );
}
