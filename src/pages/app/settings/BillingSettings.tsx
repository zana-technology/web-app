import { checkCircleIcon, downloadIcon, pdfIcon2 } from "@/assets";
import { Button, JobDetailsShell, showToast, Table } from "@/components";
import { currencyFormatter, subscriptionApi } from "@/libs";
import { useProfilePreview } from "@/pages/auth/preview/logic";
import { IColumn } from "@/types";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const BillingSettings = () => {
  const {
    isLoading,
    profile,
    // goBack
  } = useProfilePreview();

  const plans = useMemo(() => {
    return [
      {
        name: "Starter Plan",
        features: [
          "100 job applications",
          "100 custom CV’s & Cover letters",
          "Job sourced from over 1 million options in your niche",
          "Remote job applications",
          "Visa sponsored job applications",
        ],
        price: profile?.current_location?.toLowerCase() === "nigeria" ? 20000 : 20,
        isActive: false,
        key: "starter",
      },
      {
        name: "Pro Plan",
        features: [
          "350 job applications",
          "350 custom CV’s & Cover letters",
          "Job sourced from over 1 million options in your niche",
          "Remote job applications",
          "Visa sponsored job applications",
        ],
        price: profile?.current_location?.toLowerCase() === "nigeria" ? 60000 : 60,
        isActive: false,
        key: "pro",
      },
    ];
  }, [profile?.current_location]);

  const hasSub = false;

  interface BillData {
    name: string;
    date: string;
    plan: string;
    amount: number;
    currencyCode: "NGN";
  }

  const sampleBills: BillData[] = [
    // {
    //   name: "Invoice #521",
    //   date: "12/06/2025",
    //   plan: "Starter plan",
    //   amount: 20000,
    //   currencyCode: "NGN",
    // },
  ];

  const [loading, setLoading] = useState(false);

  const handleSubscription = async (plan: string) => {
    setLoading(true);
    const { success, data } = await subscriptionApi.subscribe(plan);

    if (success) {
      showToast({
        message: "Navigating to payment URL",
        title: "Success",
      });
      window.open(data?.url, "_blank");
    }
    setLoading(false);
  };

  const tableColumns: IColumn<BillData>[] = [
    {
      header: "Invoice",
      accessorKey: "name",
      cell: (item) => {
        const name = item.getValue();

        return (
          <span className="flex items-center gap-3">
            <img src={pdfIcon2} alt={name} className="w-10 h-10" />
            <span>{name}</span>
          </span>
        );
      },
    },
    {
      header: "Billing Date",
      accessorKey: "date",
      type: "date",
    },
    {
      header: "Plan",
      accessorKey: "plan",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      type: "currency",
    },
    {
      header: "Action",
      cell: () => {
        return <img src={downloadIcon} alt="icon" className="w-4 h-4" />;
      },
    },
  ];
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
      <JobDetailsShell title="Billing history" className="mt-16">
        <Table
          tableData={sampleBills}
          tableColumns={tableColumns}
          emptyMessage="No Billings yet"
          emptySubText="Subscribe and start getting applications today"
        />
      </JobDetailsShell>
    </div>
  );
};

export default BillingSettings;
