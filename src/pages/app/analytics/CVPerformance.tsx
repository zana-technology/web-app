import { downloadIcon, tableFileIcon } from "@/assets";
import { JobDetailsShell, Table } from "@/components";
import { IColumn } from "@/types";
import { BsDash } from "react-icons/bs";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
const CVPerformance = () => {
  interface CVPerformanceTable {
    name: string;
    applications: number;
    responses: number;
    responseRate: number;
    ats_score: number;
    performance: "Excellent" | "Needs Work" | "Average";
  }

  const tableData: CVPerformanceTable[] = [
    {
      name: "John Doe CV_Backend Developer",
      applications: 15,
      responses: 5,
      responseRate: 34,
      ats_score: 78,
      performance: "Needs Work",
    },
    {
      name: "Jane Smith CV_UI/UX Designer",
      applications: 20,
      responses: 12,
      responseRate: 60,
      ats_score: 85,
      performance: "Average",
    },
    {
      name: "Mike Johnson CV_Product Manager",
      applications: 8,
      responses: 6,
      responseRate: 75,
      ats_score: 90,
      performance: "Excellent",
    },
    {
      name: "Anna Lee CV_Mobile Developer",
      applications: 10,
      responses: 3,
      responseRate: 30,
      ats_score: 70,
      performance: "Needs Work",
    },
  ];

  const tableColumns: IColumn<CVPerformanceTable>[] = [
    {
      header: "CV Used",
      accessorKey: "name",
      cell: (item) => {
        const name = item.getValue();

        return (
          <span className="flex items-center gap-2">
            <img src={tableFileIcon} alt={"download"} className="w-4 h-4" />
            <span>{name}</span>
            <img src={downloadIcon} alt={"download"} className="w-4 h-4" />
          </span>
        );
      },
    },
    {
      header: "Applications",
      accessorKey: "applications",
    },
    {
      header: "Responses",
      accessorKey: "responses",
    },
    {
      header: "Response Rate",
      accessorKey: "responseRate",
      cell: (item) => {
        const responseRate = item.getValue();
        const row = item.row.original;
        const performance = row.performance;

        return (
          <span
            className={
              performance === "Excellent"
                ? "text-util-success-500"
                : performance === "Needs Work"
                  ? "text-util-error-500"
                  : "text-util-warning-500"
            }
          >
            {responseRate}%
          </span>
        );
      },
    },
    {
      header: "Avg. ATS Score",
      accessorKey: "ats_score",
      cell: (item) => {
        const atsScore = item.getValue();
        const row = item.row.original;
        const performance = row.performance;

        return (
          <span
            className={
              performance === "Excellent"
                ? "text-util-success-500"
                : performance === "Needs Work"
                  ? "text-util-error-500"
                  : "text-util-warning-500"
            }
          >
            {atsScore}%
          </span>
        );
      },
    },
    {
      header: "Perfomance",
      accessorKey: "performance",
      cell: (item) => {
        const performance = item.getValue();

        return (
          <span
            className={twMerge(
              "flex gap-2 items-center",
              performance === "Excellent"
                ? "text-util-success-500"
                : performance === "Needs Work"
                  ? "text-util-error-500"
                  : "text-util-warning-500"
            )}
          >
            <span>
              {performance === "Excellent" ? (
                <FiArrowUpRight size={20} />
              ) : performance === "Needs Work" ? (
                <FiArrowDownRight size={20} />
              ) : (
                <BsDash size={20} />
              )}
            </span>
            <span>{performance}</span>
          </span>
        );
      },
    },
  ];
  return (
    <JobDetailsShell title="Top CV Performance Analysis" hideTitleBorder>
      <Table
        isLoading={false}
        isFetching={false}
        tableColumns={tableColumns}
        tableData={tableData}
        // meta={meta}
        emptyMessage="No applications yet"
        emptySubText="When Zana or you starts applying, they will show here "
      />
    </JobDetailsShell>
  );
};

export default CVPerformance;
