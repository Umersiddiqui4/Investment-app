"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  ChevronRight,
  Menu,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import InvestorDetail from "./investor-detail";
import Sidebaar from "./Sidebaar";
import { investorsData } from "./api/installments";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMobile,
  setSidebarOpen,
} from "@/redux/appSlice";

// Update the InvestorsPage component to include pagination and investor detail view
export default function InvestorsPage() {
  const isMobile = useSelector((state: any) => state.app.isMobile);
  const sidebarOpen = useSelector((state: any) => state.app.sideBarOpen);
  

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedInvestors, setSelectedInvestors] = useState<
    typeof investorsData
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(
    null
  );

  const investorsPerPage = 10;
  const totalPages = Math.ceil(investorsData.length / investorsPerPage);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
      if (window.innerWidth >= 768) {
        dispatch(setSidebarOpen(false));
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Filter investors based on search query
  const filteredInvestors = investorsData.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedInvestors.some((selected) => selected.id === investor.id)
  );

  // Get current investors for pagination
  const indexOfLastInvestor = currentPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = filteredInvestors.slice(
    indexOfFirstInvestor,
    indexOfLastInvestor
  );

  const handleSelectInvestor = (investor: any) => {
    setSelectedInvestors([...selectedInvestors, investor]);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleRemoveInvestor = (investorId: any) => {
    setSelectedInvestors(
      selectedInvestors.filter((investor) => investor.id !== investorId)
    );
  };

  const handleCreateCompany = () => {
  };

  const handleViewInvestor = (investorId: any) => {
    setSelectedInvestorId(investorId);
  };

  const handleBackToInvestors = () => {
    setSelectedInvestorId(null);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

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

        {/* Sidebar - Mobile: full slide in, Desktop: collapsible */}
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
                  placeholder="Search investors..."
                  className="pl-8 bg-slate-100/50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600 focus:border-cyan-500 text-slate-900 dark:text-slate-100 w-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />

                {/* Investor Suggestions */}
                {showSuggestions && searchQuery && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 max-h-60 overflow-auto">
                    {filteredInvestors.length > 0 ? (
                      filteredInvestors.map((investor) => (
                        <div
                          key={investor.id}
                          className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          onClick={() => handleSelectInvestor(investor)}
                        >
                          <Avatar className="h-8 w-8">
                            <img
                              src={investor.image || "/placeholder.svg"}
                              alt={investor.name}
                            />
                          </Avatar>
                          <span>{investor.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-slate-500 dark:text-slate-400">
                        No investors found
                      </div>
                    )}
                  </div>
                )}
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
            <div className="max-w-4xl mx-auto space-y-6">
              {selectedInvestorId ? (
                <InvestorDetail
                  investorId={selectedInvestorId}
                  onBack={handleBackToInvestors}
                />
              ) : (
                <>
                  {/* Investors List View */}
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-900 dark:text-white text-xl">
                        Investors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentInvestors.map((investor) => (
                          <div
                            key={investor.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-700/30 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-all duration-200 cursor-pointer"
                            onClick={() => handleViewInvestor(investor.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 bg-cyan-100/50 dark:bg-cyan-200/20 border border-cyan-200/50 dark:border-cyan-300/30">
                                <img
                                  src={investor.image || "/placeholder.svg"}
                                  alt={investor.name}
                                  className="object-cover"
                                />
                              </Avatar>
                              <div>
                                <h3 className="font-medium text-slate-900 dark:text-white">
                                  {investor.name}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                  <span>
                                    Active since: {investor.activeSince}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    investor.status === "Active"
                                      ? "bg-green-500"
                                      : "bg-amber-500"
                                  }`}
                                ></span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  {investor.status}
                                </span>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-slate-400"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-slate-500 dark:text-slate-400"
                          >
                            <ArrowLeft size={16} className="mr-2" />
                            Previous
                          </Button>
                          <div className="flex items-center gap-1">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className={
                                  currentPage === page
                                    ? "bg-cyan-500 hover:bg-cyan-600"
                                    : ""
                                }
                              >
                                {page}
                              </Button>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="text-slate-500 dark:text-slate-400"
                          >
                            Next
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Selected Investors for Company Creation */}
                  {selectedInvestors.length > 0 && (
                    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                      <CardHeader className="pb-2 flex flex-row justify-between items-center">
                        <CardTitle className="text-slate-900 dark:text-white text-xl">
                          Selected Investors
                        </CardTitle>
                        <Button
                          onClick={handleCreateCompany}
                          disabled={selectedInvestors.length < 2}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Create Company
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedInvestors.map((investor) => (
                            <div
                              key={investor.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-700/30"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 bg-cyan-100/50 dark:bg-cyan-200/20 border border-cyan-200/50 dark:border-cyan-300/30">
                                  <img
                                    src={investor.image || "/placeholder.svg"}
                                    alt={investor.name}
                                  />
                                </Avatar>
                                <span className="font-medium text-slate-900 dark:text-white">
                                  {investor.name}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRemoveInvestor(investor.id)
                                }
                                className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                        {selectedInvestors.length === 1 && (
                          <p className="text-amber-500 dark:text-amber-400 text-sm mt-2 flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                              <line x1="12" y1="9" x2="12" y2="13" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            Add at least one more investor to create a company
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

