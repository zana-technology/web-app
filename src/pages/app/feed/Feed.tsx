import { Button, EmptyState, PageLoader, PageTitle, SearchInput, TabMenu } from "@/components";
import { useFeed } from "./logic";
import { JobData } from "@/types";
import { CiFilter } from "react-icons/ci";
import Jobs from "./Jobs";
import { useRef } from "react";
import { useInfiniteScrollTrigger } from "@/hooks";

const Feed = () => {
  const {
    isLoading,
    tabMenu,
    setSearchQuery,
    jobs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    renderEmptyText,
    currentTab,
  } = useFeed();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScrollTrigger({
    targetRef: loadMoreRef,
    hasMore: hasNextPage ?? false,
    onLoadMore: fetchNextPage,
  });

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
              <Jobs jobs={jobs as JobData[]} currentTab={currentTab as string} />
            ) : (
              <EmptyState
                text={renderEmptyText().text}
                subText={renderEmptyText().subText}
                className="mt-20"
              />
            )}
            <div ref={loadMoreRef} />
            {isFetchingNextPage ? (
              <div className="w-full flex justify-center mt-10">
                <PageLoader variant="bar" />
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Feed;
