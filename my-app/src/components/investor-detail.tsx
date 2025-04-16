"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronLeft, DollarSign, TrendingUp, BarChart3, Wallet } from "lucide-react"
import InstallmentCard from "./ui/InstallmentCard"
import { installmentsData } from "./api/installments"

// Sample data for the investor detail
const investorData = {
  id: 1,
  name: "John Smith",
  image: "/placeholder.svg?height=120&width=120",
  activeSince: "January 2023",
  status: "Active",
  totalInvestment: 250000,
  accountBalance: 175000,
  totalSales: 320000,
  revenueGenerated: 85000,
  installments: [
    {
      id: 1,
      date: "2023-05-15",
      amount: 25000,
      status: "Paid",
      company: "Tech Innovations Inc.",
    },
    {
      id: 2,
      date: "2023-06-15",
      amount: 25000,
      status: "Paid",
      company: "Tech Innovations Inc.",
    },
    {
      id: 3,
      date: "2023-07-15",
      amount: 25000,
      status: "Paid",
      company: "Tech Innovations Inc.",
    },
    {
      id: 4,
      date: "2023-08-15",
      amount: 25000,
      status: "Upcoming",
      company: "Tech Innovations Inc.",
    },
  ],
  sales: [
    {
      id: 1,
      date: "2023-04-10",
      product: "Software License",
      amount: 75000,
      company: "Tech Innovations Inc.",
    },
    {
      id: 2,
      date: "2023-05-22",
      product: "Consulting Services",
      amount: 45000,
      company: "Green Energy Solutions",
    },
    {
      id: 3,
      date: "2023-06-30",
      product: "Hardware Components",
      amount: 120000,
      company: "Tech Innovations Inc.",
    },
    {
      id: 4,
      date: "2023-07-15",
      product: "Maintenance Contract",
      amount: 80000,
      company: "Quantum Computing Labs",
    },
  ],
}

interface InvestorDetailProps {
  investorId: number
  onBack: () => void
}

export default function InvestorDetail({ investorId, onBack }: InvestorDetailProps) {
  // In a real app, you would fetch the investor data based on the ID
  // For this example, we'll use the sample data
  console.log("Investor ID:", investorId);


const investorInstallments = installmentsData.filter((item) =>
  item.investors.some((inv) => inv.id === investorId)
);

console.log(investorInstallments);


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ChevronLeft size={16} />
          <span>Back to Investors</span>
        </Button>
      </div>

      {/* Investor Profile Card */}
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 bg-cyan-100/50 dark:bg-cyan-200/20 border-2 border-cyan-200/50 dark:border-cyan-300/30">
              <img src={investorData.image || "/placeholder.svg"} alt={investorData.name} className="object-cover" />
            </Avatar>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{investorData.name}</h2>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-2 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1 justify-center md:justify-start">
                    <span className="text-sm">Active since: {investorData.activeSince}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center md:justify-start">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        investorData.status === "Active" ? "bg-green-500" : "bg-amber-500"
                      }`}
                    ></span>
                    <span className="text-sm font-medium">Status: {investorData.status}</span>
                  </div>
                </div>
              </div>

              {/* Financial Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 p-4 rounded-lg border border-cyan-200/50 dark:border-cyan-500/30">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
                    <DollarSign size={18} />
                    <span className="text-sm font-medium">Total Investment</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(investorData.totalInvestment)}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 p-4 rounded-lg border border-purple-200/50 dark:border-purple-500/30">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                    <Wallet size={18} />
                    <span className="text-sm font-medium">Account Balance</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(investorData.accountBalance)}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 p-4 rounded-lg border border-amber-200/50 dark:border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                    <BarChart3 size={18} />
                    <span className="text-sm font-medium">Total Sales</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(investorData.totalSales)}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 p-4 rounded-lg border border-green-200/50 dark:border-green-500/30">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                    <TrendingUp size={18} />
                    <span className="text-sm font-medium">Revenue Generated</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(investorData.revenueGenerated)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Installments and Sales */}
      <Tabs defaultValue="installments" className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-slate-100 dark:bg-slate-700/30 p-1">
          <TabsTrigger
            value="installments"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-cyan-500/20 dark:data-[state=active]:to-purple-500/20 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
          >
            Installments
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-cyan-500/20 dark:data-[state=active]:to-purple-500/20 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
          >
            Sales
          </TabsTrigger>
        </TabsList>

        {/* Installments Tab Content */}
        <TabsContent value="installments" className="mt-4">
            {investorInstallments.length === 0 ? (
                                      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                                        No installments found matching your criteria
                                      </div>
                                    ) : (
                                      investorInstallments.map((installment: any) => (
                                        <InstallmentCard
                                          key={installment.id}
                                          installment={installment}
                                        />
                                      ))
                                    )}
        </TabsContent>

        {/* Sales Tab Content */}
        <TabsContent value="sales" className="mt-4">
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-900 dark:text-white text-lg">Sales History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Product</th>
                      <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investorData.sales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                      >
                        <td className="py-3 px-4 text-slate-900 dark:text-slate-200">{formatDate(sale.date)}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-slate-200">{sale.company}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-slate-200">{sale.product}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-slate-200 font-medium">
                          {formatCurrency(sale.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
