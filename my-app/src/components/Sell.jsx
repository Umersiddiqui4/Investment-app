"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronRight,
  Calendar,
  Percent,
  Bell,
  Menu,
  LayoutGrid,
  List,
} from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import { SellItemDetails } from "./SellDetail";
import Sidebaar from "./Sidebaar";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setSidebarOpen } from "@/redux/appSlice";

// Sample data
const sellItemsData = [
  {
    id: 1,
    itemName: "Quantum Computing Server",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Alex Johnson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Sarah Williams",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-04-10",
    rate: 12.5,
    status: "active",
    guarantors: [
      {
        id: 101,
        name: "Michael Chen",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 102,
        name: "Emma Davis",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 201,
        name: "Sarah Williams",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 150000,
        percentage: 60,
      },
      {
        id: 202,
        name: "David Brown",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 100000,
        percentage: 40,
      },
    ],
    totalAmount: 250000,
    currency: "USD",
    description:
      "Next-generation quantum computing server with advanced cooling system and quantum bit stabilization.",
    installments: [
      {
        month: 1,
        date: "2025-05-10",
        amount: 62500,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-06-10",
        amount: 62500,
        status: "paid",
      },
      {
        month: 3,
        date: "2025-07-10",
        amount: 62500,
        status: "due",
      },
      {
        month: 4,
        date: "2025-08-10",
        amount: 62500,
        status: "pending",
      },
    ],
    completedPayments: 2,
    totalPayments: 4,
  },
  {
    id: 2,
    itemName: "Neural Interface Headset",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Maria Garcia",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Robert Taylor",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-03-22",
    rate: 15.8,
    status: "active",
    guarantors: [
      {
        id: 103,
        name: "James Wilson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 104,
        name: "Sophia Lee",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 203,
        name: "Robert Taylor",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 200000,
        percentage: 70,
      },
      {
        id: 204,
        name: "Jennifer Martinez",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 85000,
        percentage: 30,
      },
    ],
    totalAmount: 285000,
    currency: "USD",
    description:
      "Advanced neural interface headset for direct brain-computer interaction with haptic feedback.",
    installments: [
      {
        month: 1,
        date: "2025-04-22",
        amount: 71250,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-05-22",
        amount: 71250,
        status: "due",
      },
      {
        month: 3,
        date: "2025-06-22",
        amount: 71250,
        status: "pending",
      },
      {
        month: 4,
        date: "2025-07-22",
        amount: 71250,
        status: "pending",
      },
    ],
    completedPayments: 1,
    totalPayments: 4,
  },
  {
    id: 3,
    itemName: "Fusion Energy Reactor",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Daniel Kim",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Lisa Garcia",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-02-15",
    rate: 18.2,
    status: "completed",
    guarantors: [
      {
        id: 105,
        name: "Thomas Anderson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 106,
        name: "Olivia Smith",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 205,
        name: "Lisa Garcia",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 300000,
        percentage: 50,
      },
      {
        id: 206,
        name: "William Johnson",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 300000,
        percentage: 50,
      },
    ],
    totalAmount: 600000,
    currency: "USD",
    description:
      "Compact fusion energy reactor with sustainable plasma containment and efficient energy conversion.",
    installments: [
      {
        month: 1,
        date: "2025-03-15",
        amount: 150000,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-04-15",
        amount: 150000,
        status: "paid",
      },
      {
        month: 3,
        date: "2025-05-15",
        amount: 150000,
        status: "paid",
      },
      {
        month: 4,
        date: "2025-06-15",
        amount: 150000,
        status: "paid",
      },
    ],
    completedPayments: 4,
    totalPayments: 4,
  },
  {
    id: 4,
    itemName: "Autonomous Drone Fleet",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Emily Wilson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Michael Chen",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-04-05",
    rate: 14.3,
    status: "active",
    guarantors: [
      {
        id: 107,
        name: "Ryan Park",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 108,
        name: "Ava Thompson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 207,
        name: "Michael Chen",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 175000,
        percentage: 70,
      },
      {
        id: 208,
        name: "Samantha Lee",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 75000,
        percentage: 30,
      },
    ],
    totalAmount: 250000,
    currency: "USD",
    description:
      "Fleet of autonomous drones with advanced AI for coordinated operations and real-time data processing.",
    installments: [
      {
        month: 1,
        date: "2025-05-05",
        amount: 62500,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-06-05",
        amount: 62500,
        status: "due",
      },
      {
        month: 3,
        date: "2025-07-05",
        amount: 62500,
        status: "pending",
      },
      {
        month: 4,
        date: "2025-08-05",
        amount: 62500,
        status: "pending",
      },
    ],
    completedPayments: 1,
    totalPayments: 4,
  },
  {
    id: 5,
    itemName: "Bioprinting System",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "James Thompson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Emma Williams",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-03-18",
    rate: 16.7,
    status: "completed",
    guarantors: [
      {
        id: 109,
        name: "Noah Garcia",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 110,
        name: "Isabella Kim",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 209,
        name: "Emma Williams",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 220000,
        percentage: 55,
      },
      {
        id: 210,
        name: "Jacob Martinez",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 180000,
        percentage: 45,
      },
    ],
    totalAmount: 400000,
    currency: "USD",
    description:
      "Advanced bioprinting system for tissue and organ fabrication with integrated bioreactor and monitoring.",
    installments: [
      {
        month: 1,
        date: "2025-04-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-05-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 3,
        date: "2025-06-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 4,
        date: "2025-07-18",
        amount: 100000,
        status: "paid",
      },
    ],
    completedPayments: 4,
    totalPayments: 4,
  },
];

// My sell items (subset of all items)
const mySellItemsData = [sellItemsData[0], sellItemsData[2], sellItemsData[4]];

export default function Sell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(sellItemsData);
  const [filteredMyItems, setFilteredMyItems] = useState(mySellItemsData);
  const [viewMode, setViewMode] = useState("grid");
  const sidebarOpen = useSelector((state) => state.app.sideBarOpen);
  const isMobile = useSelector((state) => state.app.isMobile);
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();

      const filtered = sellItemsData.filter(
        (item) =>
          item.itemName.toLowerCase().includes(lowercaseQuery) ||
          item.customerName.toLowerCase().includes(lowercaseQuery) ||
          item.investorName.toLowerCase().includes(lowercaseQuery)
      );

      const filteredMy = mySellItemsData.filter(
        (item) =>
          item.itemName.toLowerCase().includes(lowercaseQuery) ||
          item.customerName.toLowerCase().includes(lowercaseQuery) ||
          item.investorName.toLowerCase().includes(lowercaseQuery)
      );

      setFilteredItems(filtered);
      setFilteredMyItems(filteredMy);
    } else {
      setFilteredItems(sellItemsData);
      setFilteredMyItems(mySellItemsData);
    }
  }, [searchQuery]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
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
          <header className="h-16 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(setSidebarOpen(true))}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 md:hidden"
                >
                  <Menu size={20} />
                </Button>
              )}
              <h1 className="text-lg font-semibold hidden md:block">
                Investment Sales
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-500 dark:text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"
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

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {selectedItem ? (
              <SellItemDetails item={selectedItem} onBack={handleBackClick} />
            ) : (
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Investment Sales
                  </h2>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search sales..."
                        className="pl-8 bg-slate-800/50 border-slate-700 focus:border-cyan-500 text-slate-100 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex bg-slate-800/50 rounded-md p-1 border border-slate-700">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${
                          viewMode === "grid"
                            ? "bg-slate-700 text-white"
                            : "text-slate-400"
                        }`}
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${
                          viewMode === "list"
                            ? "bg-slate-700 text-white"
                            : "text-slate-400"
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <List size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <Tabs
                  defaultValue="all"
                  className="w-full"
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid grid-cols-2 w-full bg-slate-800/50 p-1 mb-6">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]"
                    >
                      All Investors Sell
                    </TabsTrigger>
                    <TabsTrigger
                      value="my"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]"
                    >
                      My Sell
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-0 space-y-4">
                    {filteredItems.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        No sales found matching your search
                      </div>
                    ) : (
                      <>
                        {viewMode === "grid" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredItems.map((item) => (
                              <SellItemCard
                                key={item.id}
                                item={item}
                                onClick={() => handleItemClick(item)}
                                formatDate={formatDate}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredItems.map((item) => (
                              <SellItemListView
                                key={item.id}
                                item={item}
                                onClick={() => handleItemClick(item)}
                                formatDate={formatDate}
                                formatCurrency={formatCurrency}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="my" className="mt-0 space-y-4">
                    {filteredMyItems.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        No sales found matching your search
                      </div>
                    ) : (
                      <>
                        {viewMode === "grid" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMyItems.map((item) => (
                              <SellItemCard
                                key={item.id}
                                item={item}
                                onClick={() => handleItemClick(item)}
                                formatDate={formatDate}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredMyItems.map((item) => (
                              <SellItemListView
                                key={item.id}
                                item={item}
                                onClick={() => handleItemClick(item)}
                                formatDate={formatDate}
                                formatCurrency={formatCurrency}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function SellItemCard({ item, onClick, formatDate }) {
  // Calculate progress percentage
  const progressPercentage = Math.round(
    (item.completedPayments / item.totalPayments) * 100
  );

  return (
    <Card
      className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Status Badge */}
          <Badge
            className={`absolute top-3 right-3 z-10 ${
              item.status === "active"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-purple-500/20 text-purple-300 border-purple-500/30"
            }`}
          >
            {item.status === "active" ? "Active" : "Completed"}
          </Badge>
          <br></br>
          {/* Item Header */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50">
                <img
                  src={item.itemImage || "/placeholder.svg"}
                  alt={item.itemName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg text-white truncate group-hover:text-cyan-300 transition-colors">
                  {item.itemName}
                </h3>
                <div className="flex items-center text-xs text-slate-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Investor */}
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-slate-600/50">
                  <img
                    src={item.customerImage || "/placeholder.svg"}
                    alt={item.customerName}
                  />
                </Avatar>
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="text-sm font-medium">{item.customerName}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Investor</div>
                  <div className="text-sm font-medium">{item.investorName}</div>
                </div>
                <Avatar className="h-8 w-8 border border-slate-600/50">
                  <img
                    src={item.investorImage || "/placeholder.svg"}
                    alt={item.investorName}
                  />
                </Avatar>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-slate-400">
                  {item.completedPayments} of {item.totalPayments} payments
                </span>
                <span className="text-cyan-400">{progressPercentage}%</span>
              </div>
            </div>

            {/* Rate */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1.5 bg-slate-700/50 px-2 py-1 rounded-md">
                <Percent className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">
                  {item.rate}% Rate
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                <span className="text-xs mr-1">Details</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SellItemListView({ item, onClick, formatDate, formatCurrency }) {
  // Calculate progress percentage
  const progressPercentage = Math.round(
    (item.completedPayments / item.totalPayments) * 100
  );

  return (
    <div
      className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row items-start p-4 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Item Image */}
          <div className="h-14 w-14 rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50 flex-shrink-0">
            <img
              src={item.itemImage || "/placeholder.svg"}
              alt={item.itemName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Item Info */}
          <div className="min-w-0 flex-1 md:flex-initial">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg text-white truncate group-hover:text-cyan-300 transition-colors">
                {item.itemName}
              </h3>
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
            <div className="flex items-center text-xs text-slate-400 mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(item.date)}</span>
              <span className="mx-2">•</span>
              <Percent className="h-3 w-3 mr-1 text-cyan-400" />
              <span className="text-cyan-300">{item.rate}% Rate</span>
            </div>
          </div>
        </div>

        {/* Middle section with participants */}
        <div className="hidden md:flex flex-1 justify-center mt-4 md:mt-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-slate-600/50">
                <img
                  src={item.customerImage || "/placeholder.svg"}
                  alt={item.customerName}
                />
              </Avatar>
              <div>
                <div className="text-xs text-slate-400">Customer</div>
                <div className="text-sm font-medium">{item.customerName}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs text-slate-400">Investor</div>
                <div className="text-sm font-medium">{item.investorName}</div>
              </div>
              <Avatar className="h-8 w-8 border border-slate-600/50">
                <img
                  src={item.investorImage || "/placeholder.svg"}
                  alt={item.investorName}
                />
              </Avatar>
            </div>
          </div>
        </div>

        {/* Right section with amount and progress */}
        <div className="w-full md:w-auto flex flex-col items-end gap-2 mt-4 md:mt-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Amount</div>
            <div className="text-base font-medium text-white">
              {formatCurrency(item.totalAmount, item.currency)}
            </div>
          </div>

          <div className="w-full md:w-40">
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-slate-400">
                {item.completedPayments}/{item.totalPayments}
              </span>
              <span className="text-cyan-400">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

