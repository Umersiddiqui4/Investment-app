import { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Avatar } from "./avatar";
import { Progress } from "./progress";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useSelector } from "react-redux";

interface Installment {
  name: string;
  customer: {
    name: string;
    email: string;
    image?: string;
  };
  investors: {
    id: string;
    name: string;
    image?: string;
    percentage: number;
    contribution: number;
  }[];
  payments: {
    month: number;
    status: "paid" | "due" | "pending";
    date: string;
    amount: number;
  }[];
  totalAmount: number;
  currency: string;
  duration: number;
  completedMonths: number;
  startDate: string;
  endDate: string;
}

export default function InstallmentCard({ installment }: { installment: Installment }) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useSelector((state: any) => state.app.isMobile);

  const formatCurrency = (amount: any, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString :any ) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500 text-white";
      case "due":
        return "bg-amber-500 text-white";
      case "pending":
        return "bg-slate-400 text-white dark:bg-slate-600";
      default:
        return "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />;
      case "due":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (installment.completedMonths / installment.duration) * 100
  );

  // Count payments by status
  const paidPayments = installment.payments.filter(
    (p: any) => p.status === "paid"
  ).length;
  const duePayments = installment.payments.filter(
    (p: any) => p.status === "due"
  ).length;
  const pendingPayments = installment.payments.filter(
    (p: any) => p.status === "pending"
  ).length;

  return (
    <div className="bg-white mb-4 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="p-2 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 md:h-14 md:w-14  rounded-xl border border-slate-300 dark:border-slate-600">
                <img
                  src={installment.customer.image || "/placeholder.svg"}
                  alt={installment.customer.name}
                  className="object-cover h-12 w-12 md:h-14 md:w-14 rounded-xl border border-slate-300 dark:border-slate-600"
                />
              </Avatar>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-medium text-white ring-2 ring-white dark:ring-slate-800">
                {installment.investors.length}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-lg text-slate-900 dark:text-white">
                {installment.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span>{installment.customer.name}</span>
                {!isMobile && (
                  <>
                    <span>•</span>
                    <span>{installment.customer.email}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 px-2.5 py-0.5">
              {formatCurrency(installment.totalAmount, installment.currency)}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2.5 py-0.5">
              {installment.duration} months
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="ml-auto text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {expanded ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-300">
              Progress: {paidPayments} of {installment.duration} payments
            </span>
            <span className="font-medium text-cyan-600 dark:text-cyan-400">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Payment Status Summary */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-center">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Paid
            </div>
            <div className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
              {paidPayments}
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg text-center">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Due
            </div>
            <div className="text-lg font-medium text-amber-600 dark:text-amber-400">
              {duePayments}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/30 p-2 rounded-lg text-center">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Pending
            </div>
            <div className="text-lg font-medium text-slate-600 dark:text-slate-300">
              {pendingPayments}
            </div>
          </div>
        </div>

        {/* Investors */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Investors
          </h4>
          <div className="flex flex-wrap gap-2">
            {installment.investors.map((investor: any) => (
              <div
                key={investor.id}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-full pl-1 pr-3 py-1"
              >
                <Avatar className="h-6 w-6 bg-cyan-100/50 dark:bg-cyan-200/20 border border-cyan-200/50 dark:border-cyan-300/30">
                  <img
                    src={investor.image || "/placeholder.svg"}
                    alt={investor.name}
                  />
                </Avatar>
                <span className="text-xs">{investor.name}</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-[10px] px-1.5">
                  {investor.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Payment Schedule
            </h4>
            <div className="space-y-2">
              {installment.payments.map((payment: any) => (
                <div
                  key={payment.month}
                  className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${getStatusColor(
                        payment.status
                      )} flex items-center gap-1 px-2 py-0.5`}
                    >
                      {getStatusIcon(payment.status)}
                      <span className="capitalize">{payment.status}</span>
                    </Badge>
                    <span className="text-sm">Month {payment.month}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(payment.date)}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(payment.amount, installment.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Investor Details
                </h4>
                <div className="space-y-2">
                  {installment.investors.map((investor: any) => (
                    <div
                      key={investor.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img
                            src={investor.image || "/placeholder.svg"}
                            alt={investor.name}
                          />
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {investor.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {investor.percentage}% ownership
                          </div>
                        </div>
                      </div>
                      <div className="font-medium text-cyan-600 dark:text-cyan-400">
                        {formatCurrency(
                          investor.contribution,
                          installment.currency
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Installment Details
                </h4>
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Start Date
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(installment.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      End Date
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(installment.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Total Amount
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(
                        installment.totalAmount,
                        installment.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Monthly Payment
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(
                        Math.round(
                          installment.totalAmount / installment.duration
                        ),
                        installment.currency
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
