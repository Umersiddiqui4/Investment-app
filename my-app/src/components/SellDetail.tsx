"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Shield,
  User,
  Users,
  Percent,
  CheckCircle,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function SellItemDetails({ item, onBack }: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const [editingInstallmentIndex, setEditingInstallmentIndex] = useState(null);
  const [paidAmount, setPaidAmount] = useState<Record<number, number>>({});
  const [paymentOption, setPaymentOption] = useState<Record<number, string>>({});

  const formatDate = (dateString: any) => {
    const options = { year: "numeric" as const, month: "short" as const, day: "numeric" as const };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatCurrency = (amount: any, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (item.completedPayments / item.totalPayments) * 100
  );

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

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-9 w-9 rounded-full bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Sale Details
        </h1>
        <Badge
          className={`ml-auto ${
            item.status === "active"
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              : "bg-purple-500/20 text-purple-300 border-purple-500/30"
          }`}
        >
          {item.status === "active" ? (
            <div className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              <span>Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Completed</span>
            </div>
          )}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Item Info */}
        <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50">
                <img
                  src={item.itemImage || "/placeholder.svg"}
                  alt={item.itemName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {item.itemName}
                </h2>
                <div className="flex items-center text-sm text-slate-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Created on {formatDate(item.date)}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="overview"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-4 w-full bg-slate-700/30 p-1 mb-4">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="participants"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                >
                  Participants
                </TabsTrigger>
                <TabsTrigger
                  value="installments"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                >
                  Installments
                </TabsTrigger>
                <TabsTrigger
                  value="financial"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                >
                  Financial
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Description
                  </h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">
                      Sale Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Status</span>
                        <Badge
                          className={`${
                            item.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          }`}
                        >
                          {item.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Created Date</span>
                        <span className="text-white">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Investment Rate</span>
                        <span className="text-cyan-300 font-medium">
                          {item.rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Total Amount</span>
                        <span className="text-white font-medium">
                          {formatCurrency(item.totalAmount, item.currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">
                      Participants
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="text-slate-300">Customer:</span>
                        <span className="text-white">{item.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span className="text-slate-300">Investors:</span>
                        <span className="text-white">
                          {item.investors.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span className="text-slate-300">Guarantors:</span>
                        <span className="text-white">
                          {item.guarantors.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    Payment Progress
                  </h3>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">
                        Completed: {item.completedPayments} of{" "}
                        {item.totalPayments} payments
                      </span>
                      <span className="font-medium text-cyan-300">
                        {progressPercentage}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-emerald-900/20 p-3 rounded-lg text-center border border-emerald-800/30">
                      <div className="text-xs text-slate-300 mb-1">Paid</div>
                      <div className="text-xl font-bold text-emerald-400">
                        {
                          item.installments.filter((i: any) => i.status === "paid")
                            .length
                        }
                      </div>
                    </div>
                    <div className="bg-amber-900/20 p-3 rounded-lg text-center border border-amber-800/30">
                      <div className="text-xs text-slate-300 mb-1">Due</div>
                      <div className="text-xl font-bold text-amber-400">
                        {
                          item.installments.filter((i: any) => i.status === "due")
                            .length
                        }
                      </div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                      <div className="text-xs text-slate-300 mb-1">Pending</div>
                      <div className="text-xl font-bold text-slate-300">
                        {
                          item.installments.filter(
                            (i: any) => i.status === "pending"
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="space-y-4">
                {/* Customer */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Customer
                  </h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-blue-500/30">
                      <img
                        src={item.customerImage || "/placeholder.svg"}
                        alt={item.customerName}
                      />
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">
                        {item.customerName}
                      </div>
                      <div className="text-sm text-slate-400">
                        Primary Buyer
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guarantors */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Guarantors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.guarantors.map((guarantor: any) => (
                      <div
                        key={guarantor.id}
                        className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg"
                      >
                        <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                          <img
                            src={guarantor.image || "/placeholder.svg"}
                            alt={guarantor.name}
                          />
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">
                            {guarantor.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {guarantor.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investors */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" />
                    Investors
                  </h3>
                  <div className="space-y-3">
                    {item.investors.map((investor: any) => (
                      <div
                        key={investor.id}
                        className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-cyan-500/30">
                            <img
                              src={investor.image || "/placeholder.svg"}
                              alt={investor.name}
                            />
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">
                              {investor.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              Investor
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5">
                            <Percent className="h-3.5 w-3.5 text-cyan-400" />
                            <span className="text-cyan-300 font-medium">
                              {investor.percentage}%
                            </span>
                          </div>
                          <div className="text-sm text-slate-300">
                            {formatCurrency(
                              investor.contribution,
                              item.currency
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="installments" className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    Installment Schedule
                  </h3>

                  {/* Progress Summary */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">
                        Completed: {item.completedPayments} of{" "}
                        {item.totalPayments} payments
                      </span>
                      <span className="font-medium text-cyan-300">
                        {progressPercentage}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Installment List */}
                  <div className="space-y-3 mt-4">
                    {item.installments.map((installment: any, index: any) => {
                      const isEditing = editingInstallmentIndex === index;

                      return (
                        <div
                          key={index}
                          className="flex flex-col p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`${getStatusColor(
                                  installment.status
                                )} flex items-center gap-1 px-2 py-0.5`}
                              >
                                {getStatusIcon(installment.status)}
                                <span className="capitalize">
                                  {installment.status}
                                </span>
                              </Badge>
                              <span className="text-white">
                                Month {installment.month}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-slate-400">
                                {formatDate(installment.date)}
                              </span>
                              <span className="font-medium text-white">
                                {formatCurrency(
                                  installment.amount,
                                  item.currency
                                )}
                              </span>
                              {installment.status !== "paid" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-700"
                                  onClick={() => {
                                    if (isEditing) {
                                      setEditingInstallmentIndex(null);
                                    } else {
                                      setEditingInstallmentIndex(index);
                                      setPaidAmount((prev) => ({
                                        ...prev,
                                        [index]: installment.amount,
                                      }));
                                      setPaymentOption((prev) => ({
                                        ...prev,
                                        [index]: "next",
                                      }));
                                    }
                                  }}
                                >
                                  {isEditing ? "Cancel" : "Update"}
                                </Button>
                              )}
                            </div>
                          </div>

                          {isEditing && (
                            <div className="mt-3 pt-3 border-t border-slate-600/50 space-y-3">
                              <div className="flex flex-col space-y-2">
                                <label className="text-sm text-slate-300">
                                  Payment Amount
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={paidAmount[index] || ""}
                                    onChange={(e) =>
                                      setPaidAmount((prev) => ({
                                        ...prev,
                                        [index]: Number(e.target.value),
                                      }))
                                    }
                                    className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white w-full max-w-[150px]"
                                    max={installment.amount}
                                  />
                                  <span className="text-slate-400">
                                    of{" "}
                                    {formatCurrency(
                                      installment.amount,
                                      item.currency
                                    )}
                                  </span>
                                </div>
                              </div>

                              {(paidAmount[index] || 0) <
                                installment.amount && (
                                <div className="flex flex-col space-y-2">
                                  <label className="text-sm text-slate-300">
                                    Remaining Amount:{" "}
                                    {formatCurrency(
                                      installment.amount -
                                        (paidAmount[index] || 0),
                                      item.currency
                                    )}
                                  </label>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                        <input
                                          type="radio"
                                          id={`distribute-${index}`}
                                          name={`payment-option-${index}`}
                                          checked={
                                          paymentOption[index] ===
                                          "distribute"
                                          }
                                          onChange={() =>
                                          setPaymentOption((prev: Record<number, string>) => ({
                                          ...prev,
                                          [index]: "distribute",
                                          }))
                                          }
                                          className="text-cyan-500"
                                        />
                                        <label
                                          htmlFor={`distribute-${index}`}
                                          className="text-sm text-slate-300"
                                        >
                                          Distribute across remaining months
                                        </label>
                                        </div>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="radio"
                                          id={`next-${index}`}
                                          name={`payment-option-${index}`}
                                          checked={
                                            paymentOption[index] === "next"
                                          }
                                          onChange={() =>
                                            setPaymentOption((prev) => ({
                                              ...prev,
                                              [index]: "next",
                                            }))
                                          }
                                          className="text-cyan-500"
                                        />
                                        <label
                                          htmlFor={`next-${index}`}
                                          className="text-sm text-slate-300"
                                        >
                                          Add to next month
                                        </label>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        id={`manual-${index}`}
                                        name={`payment-option-${index}`}
                                        checked={
                                          paymentOption[index] === "manual"
                                        }
                                        onChange={() =>
                                          setPaymentOption((prev) => ({
                                            ...prev,
                                            [index]: "manual",
                                          }))
                                        }
                                        className="text-cyan-500"
                                      />
                                      <label
                                        htmlFor={`manual-${index}`}
                                        className="text-sm text-slate-300"
                                      >
                                        Distribute manually
                                      </label>
                                    </div>

                                    {paymentOption[index] === "manual" && (
                                      <div className="mt-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                                        <h4 className="text-sm font-medium text-white mb-2">
                                          Manual Distribution
                                        </h4>

                                        {/* Quick distribution option */}
                                        <div className="mb-3 pb-3 border-b border-slate-600/30">
                                          <label className="text-xs text-slate-300 mb-1 block">
                                            Quick Distribution
                                          </label>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-300">
                                              Distribute across next
                                            </span>
                                            <select
                                              className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                                              defaultValue="2"
                                            >
                                              <option value="1">1 month</option>
                                              <option value="2">
                                                2 months
                                              </option>
                                              <option value="3">
                                                3 months
                                              </option>
                                              <option value="4">
                                                4 months
                                              </option>
                                              <option value="all">
                                                All remaining
                                              </option>
                                            </select>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="text-xs border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                                            >
                                              Apply
                                            </Button>
                                          </div>
                                        </div>

                                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                                          {item.installments
                                            .filter(
                                              (_: any, i: any) =>
                                                i > index &&
                                                i < item.installments.length
                                            )
                                            .map(
                                              (
                                                futureInstallment: any,
                                                futureIndex: number
                                              ) => {
                                                const actualIndex =
                                                  index + futureIndex + 1;
                                                return (
                                                  <div
                                                    key={actualIndex}
                                                    className="flex items-center justify-between"
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <input
                                                        type="checkbox"
                                                        id={`month-${actualIndex}`}
                                                        className="text-cyan-500 rounded"
                                                      />
                                                      <label
                                                        htmlFor={`month-${actualIndex}`}
                                                        className="text-sm text-slate-300"
                                                      >
                                                        Month{" "}
                                                        {
                                                          futureInstallment.month
                                                        }{" "}
                                                        (
                                                        {formatDate(
                                                          futureInstallment.date
                                                        )}
                                                        )
                                                      </label>
                                                    </div>
                                                    <input
                                                      type="number"
                                                      placeholder="Amount"
                                                      className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white w-[100px] text-sm"
                                                    />
                                                  </div>
                                                );
                                              }
                                            )}
                                        </div>
                                        <div className="mt-3 flex justify-between items-center">
                                          <span className="text-xs text-slate-400">
                                            Remaining:{" "}
                                            {formatCurrency(
                                              installment.amount -
                                                (paidAmount[index] || 0),
                                              item.currency
                                            )}
                                          </span>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                                          >
                                            Distribute Evenly
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                  onClick={() =>
                                    setEditingInstallmentIndex(null)
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                                  onClick={() => {
                                    // Here would be the logic to update the payment status
                                    // and handle the remaining amount based on paymentOption
                                    setEditingInstallmentIndex(null);
                                  }}
                                >
                                  Mark as Paid
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Summary */}
                  <div className="mt-6 pt-4 border-t border-slate-600/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-slate-300">Monthly Payment</span>
                      <span className="text-white font-medium">
                        {formatCurrency(
                          item.totalAmount / item.totalPayments,
                          item.currency
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total Remaining</span>
                      <span className="text-white font-medium">
                        {formatCurrency(
                          item.totalAmount -
                            (item.totalAmount / item.totalPayments) *
                              item.completedPayments,
                          item.currency
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Financial Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-sm text-slate-400 mb-1">
                        Total Investment
                      </div>
                      <div className="text-xl font-bold text-white">
                        {formatCurrency(item.totalAmount, item.currency)}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-sm text-slate-400 mb-1">
                        Investment Rate
                      </div>
                      <div className="text-xl font-bold text-cyan-300">
                        {item.rate}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-400" />
                    Investment Breakdown
                  </h3>
                  <div className="space-y-3">
                    {item.investors.map((investor: any) => (
                      <div
                        key={investor.id}
                        className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img
                              src={investor.image || "/placeholder.svg"}
                              alt={investor.name}
                            />
                          </Avatar>
                          <span className="font-medium text-white">
                            {investor.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-slate-400">
                              Contribution
                            </div>
                            <div className="text-sm font-medium text-white">
                              {formatCurrency(
                                investor.contribution,
                                item.currency
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-400">
                              Percentage
                            </div>
                            <div className="text-sm font-medium text-cyan-300">
                              {investor.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-400" />
                    Timeline
                  </h3>
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-600">
                    <div className="relative">
                      <div className="absolute left-[-24px] top-0 h-4 w-4 rounded-full bg-cyan-500"></div>
                      <div className="text-sm text-white font-medium">
                        {formatDate(item.date)}
                      </div>
                      <div className="text-xs text-slate-400">
                        Investment initiated
                      </div>
                    </div>
                    {item.installments.map((installment: any, index: any) => (
                      <div key={index} className="relative">
                        <div
                          className={`absolute left-[-24px] top-0 h-4 w-4 rounded-full ${
                            installment.status === "paid"
                              ? "bg-emerald-500"
                              : installment.status === "due"
                              ? "bg-amber-500"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        <div className="text-sm text-white font-medium">
                          {formatDate(installment.date)}
                        </div>
                        <div className="text-xs text-slate-400">
                          Payment {installment.month} -
                          <span
                            className={
                              installment.status === "paid"
                                ? "text-emerald-400"
                                : installment.status === "due"
                                ? "text-amber-400"
                                : "text-slate-400"
                            }
                          >
                            {" "}
                            {installment.status.charAt(0).toUpperCase() +
                              installment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Column - Participants Summary */}
        <div className="space-y-6">
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-400" />
                Participants Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer */}
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                  <img
                    src={item.customerImage || "/placeholder.svg"}
                    alt={item.customerName}
                  />
                </Avatar>
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="font-medium text-white">
                    {item.customerName}
                  </div>
                </div>
              </div>

              {/* Guarantors */}
              {item.guarantors.map((guarantor: any) => (
                <div
                  key={guarantor.id}
                  className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
                >
                  <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                    <img
                      src={guarantor.image || "/placeholder.svg"}
                      alt={guarantor.name}
                    />
                  </Avatar>
                  <div>
                    <div className="text-xs text-slate-400">Guarantor</div>
                    <div className="font-medium text-white">
                      {guarantor.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {guarantor.role}
                    </div>
                  </div>
                </div>
              ))}

              {/* Investors */}
              {item.investors.map((investor: any) => (
                <div
                  key={investor.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-cyan-500/30">
                      <img
                        src={investor.image || "/placeholder.svg"}
                        alt={investor.name}
                      />
                    </Avatar>
                    <div>
                      <div className="text-xs text-slate-400">Investor</div>
                      <div className="font-medium text-white">
                        {investor.name}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    {investor.percentage}%
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Amount:</span>
                  <span className="text-lg font-bold text-white">
                    {formatCurrency(item.totalAmount, item.currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Investment Rate:</span>
                  <span className="text-lg font-bold text-cyan-300">
                    {item.rate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <Badge
                    className={`${
                      item.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    }`}
                  >
                    {item.status === "active" ? "Active" : "Completed"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Created:</span>
                  <span className="text-white">{formatDate(item.date)}</span>
                </div>
                <div className="pt-3 border-t border-slate-700/50 mt-3">
                  <div className="mb-2">
                    <span className="text-slate-400">Payment Progress:</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">
                      {item.completedPayments} of {item.totalPayments} payments
                    </span>
                    <span className="text-cyan-400">
                      {progressPercentage}% Complete
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
