import {
  Button,
  EmptyState,
  PageLoader,
  PageTitle,
  Pagination,
  SearchInput,
  TabMenu,
} from "@/components";
import { useFeed } from "./logic";
import { JobData } from "@/types";
import { CiFilter } from "react-icons/ci";
import Jobs from "./Jobs";

const Feed = () => {
  const {
    isLoading,
    tabMenu,
    setSearchQuery,
    jobs,
    meta,
    currentPage,
    setCurrentPage,
    currentTab,
  } = useFeed();

  return (
    <>
      <PageTitle title="Job Feed" subtitle="Personalised job recommendations powered by Zana" />

      <div className="mt-8">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <div className="w-full flex flex-col-reverse lg:flex-row  justify-between lg:items-center gap-6">
              <TabMenu menu={tabMenu} />
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Search jobs, companies, or locations "
                  setSearchQuery={setSearchQuery}
                />
                <Button
                  title="Filter"
                  icon={<CiFilter className="text-dark-700" size={20} />}
                  iconPosition="left"
                  variant="outlined"
                />
              </div>
            </div>
            {jobs && jobs?.length > 0 ? (
              <Jobs jobs={jobs as JobData[]} />
            ) : (
              <EmptyState
                text={`No ${currentTab === "applied" ? "auto-applied" : currentTab === "reviewed" ? "Review needed" : "saved"} jobs yet`}
                subText={`${currentTab === "applied" ? "When you have auto-applied jobs" : currentTab === "reviewed" ? "When you have jobs needing reviews" : "When you save a job"}, they will show here`}
              />
            )}
            {jobs && jobs?.length > 0 && (
              <Pagination
                currentOffset={currentPage}
                // totalPages={meta?.total as number}
                total={jobs?.length >= 50 ? 200 : (meta?.total as number)}
                setCurrentOffset={setCurrentPage}
                limit={meta?.limit as number}
                className="mt-4"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Feed;
