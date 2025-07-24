import { downloadIcon, pdfIcon2 } from "@/assets";
import { showToast } from "@/components";
import { subscriptionApi } from "@/libs";
import { useProfilePreview } from "@/pages/auth/preview/logic";
import { IColumn } from "@/types";
import React, { useMemo, useState } from "react";

export const useBillingSettings = () => {
  const { isLoading, profile } = useProfilePreview();
  const { isLoading: loadingStatus, data } = subscriptionApi.useSubscriptionStatus();

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

  console.log("data", data);

  return {
    profile,
    plans,
    hasSub,
    tableColumns,
    handleSubscription,
    loading,
    isLoading,
    loadingStatus,
  };
};

export default useBillingSettings;
