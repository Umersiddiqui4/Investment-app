"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import Sidebaar from "./Sidebaar";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "@/redux/appSlice";

// Sample data
const investorsData = [
  { id: 1, name: "John Smith", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 2,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 3, name: "Michael Chen", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 4,
    name: "Emma Williams",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 5, name: "David Brown", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "Lisa Garcia", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 7,
    name: "Robert Taylor",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 8, name: "Jennifer Lee", image: "/placeholder.svg?height=80&width=80" },
];

const companiesData = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 5,
    totalMonths: 9,
    progress: 2, // Progress stage (1-4)
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 4,
    totalMonths: 9,
    progress: 1, // Progress stage (1-4)
  },
  {
    id: 3,
    name: "Quantum Computing Labs",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 7,
    totalMonths: 9,
    progress: 3, // Progress stage (1-4)
  },
];

const allCompaniesData = [
  {
    id: 4,
    name: "Biotech Research Group",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 6,
    totalMonths: 9,
    progress: 2, // Progress stage (1-4)
  },
  {
    id: 5,
    name: "AI Development Consortium",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 3,
    totalMonths: 9,
    progress: 1, // Progress stage (1-4)
  },
  {
    id: 6,
    name: "Sustainable Materials Co.",
    image: "/placeholder.svg?height=100&width=100",
    period: "3-9 month",
    investor1Percentage: 40,
    investor2Percentage: 60,
    currentMonth: 8,
    totalMonths: 9,
    progress: 4, // Progress stage (1-4)
  },
];

export default function InvestorsPage() {
  const sidebarOpen = useSelector((state) => state.app.sideBarOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useSelector((state) => state.app.isMobile);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => dispatch(setSidebarOpen(false))}
          />
        )}
        <Sidebaar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/30 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(setSidebarOpen(true))}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden"
                >
                  <Menu size={20} />
                </Button>
              )}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search investors or companies..."
                  className="pl-8 bg-slate-100/50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600 focus:border-cyan-500 text-slate-900 dark:text-slate-100 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-cyan-500">
                  <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-full h-full"></div>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline-block">
                  Admin
                </span>
              </div>
            </div>
          </header>

          {/* Investors Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              {/* Investors Section */}
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-900 dark:text-white text-xl">
                    Investors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {investorsData.map((investor) => (
                      <div
                        key={investor.id}
                        className="flex flex-col items-center group/investor"
                      >
                        <Avatar className="h-16 w-16 bg-green-100/50 dark:bg-green-200/20 border-2 border-green-200/50 dark:border-green-300/30 transition-all duration-300 group-hover/investor:border-cyan-400 group-hover/investor:shadow-lg group-hover/investor:shadow-cyan-500/20">
                          <img
                            src={investor.image || "/placeholder.svg"}
                            alt={investor.name}
                            className="object-cover"
                          />
                        </Avatar>
                        <span className="mt-2 text-center text-sm text-slate-900 dark:text-white group-hover/investor:text-cyan-600 dark:group-hover/investor:text-cyan-400 transition-colors duration-300">
                          {investor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Companies Tabs */}
              <Tabs defaultValue="myCompanies" className="w-full">
                <TabsList className="grid grid-cols-2 w-full bg-slate-100 dark:bg-slate-700/30 p-1">
                  <TabsTrigger
                    value="myCompanies"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-cyan-500/20 dark:data-[state=active]:to-purple-500/20 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
                  >
                    My Companies
                  </TabsTrigger>
                  <TabsTrigger
                    value="allCompanies"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-cyan-500/20 dark:data-[state=active]:to-purple-500/20 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
                  >
                    All Companies
                  </TabsTrigger>
                </TabsList>

                {/* My Companies Tab Content */}
                <TabsContent value="myCompanies" className="mt-4">
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {companiesData.map((company) => (
                          <CompanyCard key={company.id} company={company} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* All Companies Tab Content */}
                <TabsContent value="allCompanies" className="mt-4">
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-900 dark:text-white text-lg">
                        All companies only for app
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {allCompaniesData.map((company) => (
                          <CompanyCard key={company.id} company={company} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Company Card Component
function CompanyCard({ company }) {
  // Calculate progress percentage based on current month within the range
  const totalMonthRange = company.totalMonths - 2; // 3-9 months = 7 month range
  const currentProgress = company.currentMonth - 2; // Adjust to 0-based index (month 3 = index 1)
  const progressPercentage = Math.round(
    (currentProgress / totalMonthRange) * 100
  );

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-cyan-500/30 transition-all duration-300 group/card">
      <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:block">
        <div className="w-20 h-20 rounded-full bg-yellow-100/50 dark:bg-yellow-300/20 border-2 border-yellow-200/50 dark:border-yellow-300/30 flex items-center justify-center overflow-hidden group-hover/card:border-yellow-300 dark:group-hover/card:border-yellow-400/50 group-hover/card:shadow-lg group-hover/card:shadow-yellow-500/10 transition-all duration-300">
          <img
            src={company.image || "/placeholder.svg"}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 bg-white/50 dark:bg-pink-200/10 backdrop-blur-md rounded-lg p-4 border border-slate-200 dark:border-pink-300/20 text-slate-900 dark:text-white w-full">
        <div className="text-sm">
          <h3 className="font-medium text-lg mb-2 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-300 dark:to-purple-300">
            {company.name}
          </h3>
          <p className="font-medium mb-3 text-slate-700 dark:text-slate-200">
            Detail: Time period: {company.period}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/30 rounded-lg p-2 flex-1">
              <Avatar className="h-10 w-10 bg-cyan-100/50 dark:bg-cyan-200/20 border border-cyan-200/50 dark:border-cyan-300/30">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Investor 1"
                />
              </Avatar>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  Investor 1
                </div>
                <div className="font-medium text-cyan-600 dark:text-cyan-300">
                  {company.investor1Percentage}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/30 rounded-lg p-2 flex-1">
              <Avatar className="h-10 w-10 bg-purple-100/50 dark:bg-purple-200/20 border border-purple-200/50 dark:border-purple-300/30">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Investor 2"
                />
              </Avatar>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  Investor 2
                </div>
                <div className="font-medium text-purple-600 dark:text-purple-300">
                  {company.investor2Percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Investment Timeline Progress Bar */}
          <div className="mt-6 mb-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-300 mb-1">
              <span>Month 3</span>
              <span>Investment Timeline</span>
              <span>Month 9</span>
            </div>
            <div className="h-6 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden relative">
              {/* Progress Bar */}
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 flex items-center"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 15 && (
                  <span className="text-xs font-medium text-white ml-3">
                    Month {company.currentMonth}
                  </span>
                )}
              </div>

              {/* Current Month Marker */}
              <div
                className="absolute top-0 h-6 w-0.5 bg-white shadow-glow animate-pulse"
                style={{ left: `${progressPercentage}%` }}
              ></div>

              {/* If text doesn't fit inside progress bar, show it outside */}
              {progressPercentage <= 15 && (
                <div className="absolute left-3 top-0 h-full flex items-center">
                  <span className="text-xs font-medium text-cyan-600 dark:text-cyan-300">
                    Month {company.currentMonth}
                  </span>
                </div>
              )}
            </div>

            {/* Progress Percentage */}
            <div className="mt-1 text-right">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-300">
                {progressPercentage}% Complete
              </span>
            </div>
          </div>

          {/* Investment Return Info */}
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-300">
            <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mr-1 align-middle"></span>
            Investment progress
          </p>
        </div>
      </div>
    </div>
  );
}

