import { companyLogo, downloadIcon, tableFileIcon } from "@/assets";
import { applicationsApi } from "@/libs";
import { ApplicationData, IColumn, PaginationMeta } from "@/types";
import moment from "moment";
import { useMemo } from "react";

export const useApplications = () => {
  const { isLoading, data, setCurrentPage, currentPage, setSearchQuery, isFetching } =
    applicationsApi.useGetApplications();

  const applications = useMemo(() => {
    if (data?.success) {
      return data?.data?.data?.map((x) => ({
        ...x,
        // companyLogo: companyLogo,
        // match: 70,
        // salary_currency: x?.salary_currency ?? "USD",
        // status: x?.applied ? JobStatus.AutoApplied : JobStatus.NeedsReview,
        // mode: x?.is_remote ? JobMode.Remote : JobMode.Onsite,
      }));
    }
  }, [data?.data, data?.success]);

  const meta = useMemo(() => {
    if (data?.success) {
      return {
        total: data?.data?.count,
        page: data?.data?.offset,
        limit: data?.data?.limit,
      };
    }
  }, [data]) as PaginationMeta;

  const tableData: ApplicationData[] = [
    {
      application_email: "alice@example.com",
      status: "applied",
      applied_at: "2025-07-10T09:30:00.000Z",
      next_step: "Technical Interview",
      next_step_due_at: "2025-07-15T12:00:00.000Z",
      uid: "app-001",
      resume: {
        file_name: "alice_resume.pdf",
        file_type: "application/pdf",
        is_primary: true,
        file_url: "https://example.com/resumes/alice.pdf",
        uid: "res-001",
        version: 1,
        created_at: "2025-07-10T08:00:00.000Z",
        updated_at: "2025-07-10T08:00:00.000Z",
      },
      cover_letter_url: "https://example.com/coverletters/alice.pdf",
      ats_score: 87,
      ats_stats: {
        strengths: ["Relevant experience", "Strong technical skills"],
        improvements: ["Add measurable achievements"],
      },
      company: "TechCorp",
      companyLogo: companyLogo,
      job_role: "Frontend Engineer",
    },
    // {
    //   application_email: "bob@example.com",
    //   status: "interview-scheduled",
    //   applied_at: "2025-06-28T15:45:00.000Z",
    //   next_step: "HR Screening",
    //   next_step_due_at: "2025-07-05T10:00:00.000Z",
    //   uid: "app-002",
    //   resume: {
    //     file_name: "bob_resume.docx",
    //     file_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     is_primary: true,
    //     file_url: "https://example.com/resumes/bob.docx",
    //     uid: "res-002",
    //     version: 2,
    //     created_at: "2025-06-28T14:00:00.000Z",
    //     updated_at: "2025-06-30T10:00:00.000Z",
    //   },
    //   cover_letter_url: "https://example.com/coverletters/bob.pdf",
    //   ats_score: 73,
    //   ats_stats: {
    //     strengths: ["Education", "Communication skills"],
    //     improvements: ["Expand project section"],
    //   },
    //   company: "InnovateX",
    //   companyLogo: companyLogo,
    //   job_role: "Fullstack Developer",
    // },
    // {
    //   application_email: "carla@example.com",
    //   status: "rejected",
    //   applied_at: "2025-05-20T10:15:00.000Z",
    //   next_step: "",
    //   next_step_due_at: "",
    //   uid: "app-003",
    //   resume: {
    //     file_name: "carla_resume.pdf",
    //     file_type: "application/pdf",
    //     is_primary: false,
    //     file_url: "https://example.com/resumes/carla.pdf",
    //     uid: "res-003",
    //     version: 1,
    //     created_at: "2025-05-20T09:00:00.000Z",
    //     updated_at: "2025-05-20T09:00:00.000Z",
    //   },
    //   cover_letter_url: "https://example.com/coverletters/carla.pdf",
    //   ats_score: 58,
    //   ats_stats: {
    //     strengths: ["Good formatting"],
    //     improvements: ["Add more technical keywords"],
    //   },
    //   company: "Designly",
    //   companyLogo: companyLogo,
    //   job_role: "UI/UX Designer",
    // },
    // {
    //   application_email: "dave@example.com",
    //   status: "offer-received",
    //   applied_at: "2025-07-01T18:30:00.000Z",
    //   next_step: "Manager review",
    //   next_step_due_at: "2025-07-12T13:00:00.000Z",
    //   uid: "app-004",
    //   resume: {
    //     file_name: "dave_resume.pdf",
    //     file_type: "application/pdf",
    //     is_primary: true,
    //     file_url: "https://example.com/resumes/dave.pdf",
    //     uid: "res-004",
    //     version: 3,
    //     created_at: "2025-07-01T16:00:00.000Z",
    //     updated_at: "2025-07-01T17:00:00.000Z",
    //   },
    //   cover_letter_url: "https://example.com/coverletters/dave.pdf",
    //   ats_score: 91,
    //   ats_stats: {
    //     strengths: ["Great portfolio", "Strong leadership"],
    //     improvements: [],
    //   },
    //   company: "NextGen AI",
    //   companyLogo: companyLogo,
    //   job_role: "AI Product Manager",
    // },
    // {
    //   application_email: "emma@example.com",
    //   status: "applied",
    //   applied_at: "2025-07-13T11:45:00.000Z",
    //   next_step: "Coding Challenge",
    //   next_step_due_at: "2025-07-16T09:00:00.000Z",
    //   uid: "app-005",
    //   resume: {
    //     file_name: "emma_resume.pdf",
    //     file_type: "application/pdf",
    //     is_primary: true,
    //     file_url: "https://example.com/resumes/emma.pdf",
    //     uid: "res-005",
    //     version: 1,
    //     created_at: "2025-07-13T10:00:00.000Z",
    //     updated_at: "2025-07-13T10:00:00.000Z",
    //   },
    //   cover_letter_url: "https://example.com/coverletters/emma.pdf",
    //   ats_score: 79,
    //   ats_stats: {
    //     strengths: ["Technical depth", "Well-written summary"],
    //     improvements: ["Add certifications"],
    //   },
    //   company: "CloudStack",
    //   companyLogo: companyLogo,
    //   job_role: "Cloud Infrastructure Engineer",
    // },
  ];

  const tableColumns: IColumn<ApplicationData>[] = [
    {
      header: "Company Name",
      accessorKey: "company",
      cell: (item) => {
        const company = item.getValue();
        const row = item.row.original;
        const companyLogo = row.companyLogo;
        const role = row.job_role;

        return (
          <span className="flex items-center gap-3">
            <img src={companyLogo} alt={company} className="w-8 h-8 rounded-full object-cover" />
            <span className="flex flex-col">
              <span className="text-dark-900 font-medium">{company}</span>
              <span>{role}</span>
            </span>
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      type: "status",
    },
    {
      header: "CV / Cover Letter Used",
      accessorKey: "resume",
      cell: (item) => {
        const resume = item.getValue();
        const filename = resume.file_name;

        return (
          <span className="flex items-center gap-1.5">
            <img src={tableFileIcon} alt={"CV"} className="w-4 h-4 " />
            <span>{filename}</span>
            <img src={downloadIcon} alt={"download"} className="w-4 h-4 " />
          </span>
        );
      },
    },
    {
      header: "ATS Score",
      accessorKey: "ats_score",
      type: "percentage",
    },
    {
      header: "Date Applied",
      accessorKey: "applied_at",
      type: "date",
    },
    {
      header: "Next Step",
      accessorKey: "next_step",
      cell: (item) => {
        const nextStep = item.getValue();
        const row = item.row.original;
        const nextStepDue = moment(row.next_step_due_at).format("MMMM Do");

        return (
          <span className="flex">
            {nextStep}
            {nextStepDue ? `: ${nextStepDue}` : ""}
          </span>
        );
      },
    },
  ];

  // console.log("tableData", tableData);
  return {
    isLoading,
    setCurrentPage,
    currentPage,
    setSearchQuery,
    isFetching,
    tableData,
    tableColumns,
    meta,
  };
};

export default useApplications;
