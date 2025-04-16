"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Search, Plus, X,  Bell, Menu, AlertTriangle } from "lucide-react"
import { ThemeToggle } from "./theme/theme-toggle"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import Sidebaar from "./Sidebaar"
import { useDispatch, useSelector } from "react-redux"
import { setIsMobile, setSidebarCollapsed, setSidebarOpen } from "@/redux/appSlice"
import { userData } from "./api/installments"


const investorsData = [
    { id: 1, name: "John Smith", image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Sarah Johnson", image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Michael Chen", image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Emma Williams", image: "/placeholder.svg?height=80&width=80" },
    { id: 5, name: "David Brown", image: "/placeholder.svg?height=80&width=80" },
    { id: 6, name: "Lisa Garcia", image: "/placeholder.svg?height=80&width=80" },
    { id: 7, name: "Robert Taylor", image: "/placeholder.svg?height=80&width=80" },
    { id: 8, name: "Jennifer Lee", image: "/placeholder.svg?height=80&width=80" },
  ]
  
const CreateCompanyPage = () => {
  const sidebarOpen = useSelector((state) => state.app.sideBarOpen);
  const sidebarCollapsed = useSelector((state) => state.app.sidebarCollapsed);
  const isMobile = useSelector((state) => state.app.isMobile);
  const dispatch = useDispatch();


    const [searchQuery, setSearchQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedInvestors, setSelectedInvestors] = useState([])
    const [investorPercentages, setInvestorPercentages] = useState({})
    const [companyName, setCompanyName] = useState("")
    const [companyImage, setCompanyImage] = useState(
      "/placeholder.svg?height=100&width=100"
    )
    const [timePeriod, setTimePeriod] = useState("3-9")
    const { toast } = useToast()
    const navigate = useNavigate()
    
    // Check if we're on mobile
    useEffect(() => {
      const checkIfMobile = () => {
        dispatch(setIsMobile(window.innerWidth < 768))
        if (window.innerWidth >= 768) {
          dispatch(setSidebarOpen(false))
        }
      }
    
      // Initial check
      checkIfMobile()
    
      // Add event listener
      window.addEventListener("resize", checkIfMobile)
    
      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile)
    }, [])
    
    // Filter investors based on search query
    const filteredInvestors = investorsData.filter(
      investor =>
        investor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedInvestors.some(selected => selected.id === investor.id)
    )
    
    const handleSelectInvestor = investor => {
      setSelectedInvestors([...selectedInvestors, investor])
      setShowSuggestions(false)
      setSearchQuery("")
    
      // Set default percentages
      const newPercentages = { ...investorPercentages }
      const investorCount = selectedInvestors.length + 1
    
      // Distribute percentages evenly
      const equalShare = Math.floor(100 / investorCount)
    
      // Update all existing investors to have equal share
      selectedInvestors.forEach(inv => {
        newPercentages[inv.id] = equalShare
      })
    
      // Add the new investor with equal share
      newPercentages[investor.id] = equalShare
    
      // Adjust the first investor to account for any remainder
      const remainder = 100 - equalShare * investorCount
      if (remainder > 0 && selectedInvestors.length > 0) {
        newPercentages[selectedInvestors[0].id] += remainder
      }
    
      setInvestorPercentages(newPercentages)
    }
    
    const handleRemoveInvestor = investorId => {
      setSelectedInvestors(
        selectedInvestors.filter(investor => investor.id !== investorId)
      )
    
      // Redistribute percentages
      const newPercentages = { ...investorPercentages }
      delete newPercentages[investorId]
    
      const remainingInvestors = selectedInvestors.filter(
        inv => inv.id !== investorId
      )
      if (remainingInvestors.length > 0) {
        const equalShare = Math.floor(100 / remainingInvestors.length)
        remainingInvestors.forEach(inv => {
          newPercentages[inv.id] = equalShare
        })
    
        // Adjust the first investor to account for any remainder
        const remainder = 100 - equalShare * remainingInvestors.length
        if (remainder > 0) {
          newPercentages[remainingInvestors[0].id] += remainder
        }
      }
    
      setInvestorPercentages(newPercentages)
    }
    
    const handlePercentageChange = (investorId, value) => {
      // Update the percentage for this investor
      const newPercentages = { ...investorPercentages }
      newPercentages[investorId] = value[0]
    
      // Calculate the total of all other investors
      const otherInvestorsTotal = selectedInvestors
        .filter(inv => inv.id !== investorId)
        .reduce((sum, inv) => sum + (newPercentages[inv.id] || 0), 0)
    
      // If total exceeds 100%, adjust other investors proportionally
      if (value[0] + otherInvestorsTotal > 100) {
        const excess = value[0] + otherInvestorsTotal - 100
        const otherInvestors = selectedInvestors.filter(
          inv => inv.id !== investorId
        )
    
        if (otherInvestors.length > 0) {
          // Distribute the excess proportionally among other investors
          otherInvestors.forEach(inv => {
            const proportion = newPercentages[inv.id] / otherInvestorsTotal
            newPercentages[inv.id] = Math.max(
              1,
              Math.floor(newPercentages[inv.id] - excess * proportion)
            )
          })
    
          // Ensure we're at exactly 100%
          const newTotal =
            value[0] +
            otherInvestors.reduce((sum, inv) => sum + newPercentages[inv.id], 0)
          if (newTotal < 100 && otherInvestors.length > 0) {
            newPercentages[otherInvestors[0].id] += 100 - newTotal
          }
        }
      }
    
      setInvestorPercentages(newPercentages)
    }
    
    const handleCreateCompany = () => {
      if (selectedInvestors.length < 2) {
        toast({
          title: "Minimum 2 investors required",
          description: "Please add at least 2 investors to create a company",
          variant: "destructive"
        })
        return
      }
    
      if (!companyName.trim()) {
        toast({
          title: "Company name required",
          description: "Please enter a name for the company",
          variant: "destructive"
        })
        return
      }
    
      // In a real app, you would send this data to your backend
      const newCompany = {
        id: Math.floor(Math.random() * 1000),
        name: companyName,
        image: companyImage,
        period: `${timePeriod} month`,
        investors: selectedInvestors.map(investor => ({
          ...investor,
          percentage: investorPercentages[investor.id] || 0
        })),
        currentMonth: Number.parseInt(timePeriod.split("-")[0]),
        totalMonths: Number.parseInt(timePeriod.split("-")[1]),
        progress: 1
      }
    
      // In a real app, you would update your state management or database
      // For this demo, we'll just show a success message and redirect
      toast({
        title: "Company created successfully",
        description: `${companyName} has been added to your companies`,
        variant: "default"
      })
    
      // Redirect to investors page
      setTimeout(() => {
        navigate("/investors")
      }, 1500)
    }
    
    const totalPercentage = selectedInvestors.reduce(
      (sum, investor) => sum + (investorPercentages[investor.id] || 0),
      0
    )
    
   return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
       <div className="flex h-screen overflow-hidden">
         {/* Mobile Overlay */}
         {isMobile && sidebarOpen && (
           <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => dispatch(setSidebarOpen(false))} />
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
               <h1 className="text-lg font-semibold hidden md:block">Create New Company</h1>
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
                 <Avatar  className="h-8 w-8 border-2 border-cyan-500" >
                                   <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-full h-full">
                                   <img
                                     src={userData.profile}
                                     alt="User Avatar"
                                     className="object-center object-cover"  />
                                   </div>
                                 </Avatar>
                 <span className="text-sm font-medium hidden md:inline-block">Admin</span>
               </div>
             </div>
           </header>
 
           {/* Create Company Content */}
           <main className="flex-1 overflow-auto p-4 md:p-6">
             <div className="max-w-4xl mx-auto space-y-6">
               <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                 <CardHeader>
                   <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                     <div className="p-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                       <Plus size={18} />
                     </div>
                     Create New Company
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   {/* Company Details */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                       <Label htmlFor="company-name">Company Name</Label>
                       <Input
                         id="company-name"
                         placeholder="Enter company name"
                         value={companyName}
                         onChange={(e) => setCompanyName(e.target.value)}
                         className="bg-slate-100/50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600"
                       />
                     </div>
                     <div className="space-y-4">
                       <Label htmlFor="time-period">Time Period (months)</Label>
                       <div className="flex items-center gap-2">
                         <select
                           id="time-period"
                           value={timePeriod}
                           onChange={(e) => setTimePeriod(e.target.value)}
                           className="flex h-10 w-full rounded-md border border-slate-200 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-700/30 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                         >
                           <option value="3-9">3-9 months</option>
                           <option value="6-12">6-12 months</option>
                           <option value="12-24">12-24 months</option>
                         </select>
                       </div>
                     </div>
                   </div>
 
                   {/* Investor Search */}
                   <div className="space-y-4">
                     <Label>Add Investors (minimum 2)</Label>
                     <div className="relative">
                       <div className="relative">
                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                         <Input
                           placeholder="Search investors by name"
                           className="pl-8 bg-slate-100/50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600"
                           value={searchQuery}
                           onChange={(e) => {
                             setSearchQuery(e.target.value)
                             setShowSuggestions(true)
                           }}
                           onFocus={() => setShowSuggestions(true)}
                         />
                       </div>
 
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
                                   <img src={investor.image || "/placeholder.svg"} alt={investor.name} />
                                 </Avatar>
                                 <span>{investor.name}</span>
                               </div>
                             ))
                           ) : (
                             <div className="p-2 text-slate-500 dark:text-slate-400">No investors found</div>
                           )}
                         </div>
                       )}
                     </div>
 
                     {/* Selected Investors */}
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="text-sm font-medium">Selected Investors</h3>
                         {/* <Badge
                           variant={totalPercentage === 100 ? "success" : "destructive"}
                           className="bg-cyan-500 dark:bg-cyan-600"
                         >
                           {totalPercentage}% Allocated
                         </Badge> */}
                       </div>
 
                       {selectedInvestors.length === 0 ? (
                         <div className="flex items-center justify-center p-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-md">
                           <div className="text-center text-slate-500 dark:text-slate-400">
                             <div className="flex justify-center mb-2">
                               <AlertTriangle className="h-6 w-6 text-amber-500" />
                             </div>
                             <p>No investors selected. Add at least 2 investors.</p>
                           </div>
                         </div>
                       ) : (
                         <div className="space-y-3">
                           {selectedInvestors.map((investor) => (
                             <div
                               key={investor.id}
                               className="flex items-center justify-between p-3 bg-slate-100/80 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600"
                             >
                               <div className="flex items-center gap-3">
                                 <Avatar className="h-10 w-10">
                                   <img src={investor.image || "/placeholder.svg"} alt={investor.name} />
                                 </Avatar>
                                 <div>
                                   <div className="font-medium">{investor.name}</div>
                                   {/* <div className="text-sm text-slate-500 dark:text-slate-400">
                                     {investorPercentages[investor.id] || 0}% ownership
                                   </div> */}
                                 </div>
                               </div>
                               <div className="flex items-center gap-4">
                                 {/* <div className="w-32">
                                   <Slider
                                     value={[investorPercentages[investor.id] || 0]}
                                     min={1}
                                     max={100}
                                     step={1}
                                     onValueChange={(value) => handlePercentageChange(investor.id, value)}
                                   />
                                 </div> */}
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   onClick={() => handleRemoveInvestor(investor.id)}
                                   className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400"
                                 >
                                   <X size={16} />
                                 </Button>
                               </div>
                             </div>
                           ))}
                         </div>
                       )}
                     </div>
                   </div>
                 </CardContent>
                 <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
                   <Button variant="outline" onClick={() => navigate("/investors")}>
                     Cancel
                   </Button>
                   <Button
                     onClick={handleCreateCompany}
                     disabled={selectedInvestors.length < 2 || !companyName.trim() || totalPercentage !== 100}
                     className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                   >
                     Create Company
                   </Button>
                 </CardFooter>
               </Card>
             </div>
           </main>
         </div>
       </div>
     </div>
   )
};

export default CreateCompanyPage;
