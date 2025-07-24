import { checkCircleIcon } from "@/assets";
import { Button, JobDetailsShell } from "@/components";
import { currencyFormatter } from "@/libs";
import { twMerge } from "tailwind-merge";
import { useBillingSettings } from "./logic";

const BillingSettings = () => {
  const { profile, plans, hasSub, handleSubscription, loading } = useBillingSettings();

  return (
    <div>
      <JobDetailsShell title="Plans">
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((x, i) => (
            <div
              className={twMerge(
                "p-6 border border-zana-grey-300 rounded-xl",
                x.isActive ? "border-2 border-zana-primary-normal" : ""
              )}
              key={i}
            >
              <div className="flex items-center justify-between gap-2 font-semibold text-xl">
                <p>{x.name}</p>
                <p className="text-zana-primary-normal">
                  {currencyFormatter({
                    amount: x.price,
                    currency:
                      profile?.current_location?.toLowerCase() === "nigeria"
                        ? "NGN"
                        : profile?.current_location?.toLowerCase() === "united kingdom"
                          ? "GBP"
                          : "USD",
                    showFraction: false,
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-4 mb-7">
                {x.features.map((feat, index) => (
                  <div className="flex gap-2" key={index}>
                    <img src={checkCircleIcon} alt="icon" className="w-5 h-5" />
                    <p>{feat}</p>
                  </div>
                ))}
              </div>
              <Button
                title={
                  hasSub && x.isActive
                    ? "Current plan"
                    : hasSub && !x.isActive
                      ? "Switch to this plan"
                      : "Subscribe to plan"
                }
                // type="submit"
                loading={loading}
                disabled={x.isActive}
                variant={hasSub ? "outlined" : "default"}
                fullWidth
                onClick={() => {
                  handleSubscription(x.key);
                }}
              />
            </div>
          ))}
        </div>
      </JobDetailsShell>
      {/* <JobDetailsShell title="Billing history" className="mt-16">
        <Table
          tableData={sampleBills}
          tableColumns={tableColumns}
          emptyMessage="No Billings yet"
          emptySubText="Subscribe and start getting applications today"
        />
      </JobDetailsShell> */}
    </div>
  );
};

export default BillingSettings;
