import { CalendarIcon } from "@/assets";
import { Button, PageTitle } from "@/components";
import AnalyticsMetrics from "./AnalyticsMetrics";
import AtsDistribution from "./AtsDistribution";
import PerformanceByLocation from "./PerformanceByLocation";
import TopKeywords from "./TopKeywords";

const Analytics = () => {
  return (
    <>
      <div className="mb-10 flex justify-between gap-3 flex-wrap">
        <PageTitle
          title="Analytics"
          subtitle="Comprehensive insights into your job search performance"
        />
        <Button
          title="This Month"
          icon={<CalendarIcon />}
          variant="outlined"
          iconPosition="left"
          className="text-sm"
        />
      </div>
      <AnalyticsMetrics />
      <AtsDistribution />
      <div className="grid lg:grid-cols-2 gap-4 mt-8">
        <PerformanceByLocation />
        <TopKeywords />
      </div>
    </>
  );
};

export default Analytics;
