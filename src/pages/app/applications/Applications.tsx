import { PageTitle, Table } from "@/components";
import { useApplications } from "./logic";

const Applications = () => {
  const {
    isLoading,
    setCurrentPage,
    currentPage,
    setSearchQuery,
    isFetching,
    tableData,
    tableColumns,
    meta,
  } = useApplications();
  return (
    <>
      <PageTitle
        title="Applications"
        subtitle="Monitor and manage your job applications"
        className="mb-10"
      />
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        tableColumns={tableColumns}
        tableData={tableData}
        meta={meta}
      />
    </>
  );
};

export default Applications;
