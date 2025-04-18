"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  X,
  User,
  Users,
  Package,
  Upload,
  Phone,
  CreditCard,
  DollarSign,
  Percent,
  Clock,
  ChevronDown,
  CheckCircle2,
  Camera,
  Plus,
  UserPlus,
  AtSign,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { setIsShowCreateInstallment } from "@/redux/appSlice"
import { useDispatch } from "react-redux"
import { supabase } from "@/lib/supabaseClient"

// Sample data for investors and customers
const investors = [
  { id: 1, name: "John Smith", image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Sarah Johnson", image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Michael Chen", image: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Emma Williams", image: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "David Brown", image: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Lisa Garcia", image: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Robert Taylor", image: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Jennifer Lee", image: "/placeholder.svg?height=40&width=40" },
]

const customers = [
  { id: 101, name: "Alex Johnson", email: "alex@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 102, name: "Maria Garcia", email: "maria@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 103, name: "David Brown", email: "david@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 104, name: "Emily Wilson", email: "emily@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 105, name: "James Thompson", email: "james@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 106, name: "Sophia Lee", email: "sophia@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 107, name: "Daniel Kim", email: "daniel@example.com", image: "/placeholder.svg?height=40&width=40" },
  { id: 108, name: "Olivia Smith", email: "olivia@example.com", image: "/placeholder.svg?height=40&width=40" },
]

export interface User {
    id: number;
    username: string;
    profilePicture: string;
    userType: string;
    status: string;
    activeSince: Date;
  }
  

// Form schemas
const installmentFormSchema = z.object({
  investorIds: z.array(z.string()).min(1, { message: "Please select at least one investor" }),
  customerId: z.string().min(1, { message: "Please select a customer" }),
  itemName: z.string().min(3, { message: "Item name must be at least 3 characters" }),
  costPrice: z.string().min(1, { message: "Cost price is required" }),
  sellPrice: z.string().min(1, { message: "Sell price is required" }),
  interestRate: z.string().min(1, { message: "Interest rate is required" }),
  timePeriod: z.string().min(1, { message: "Time period is required" }),
  guarantors: z
    .array(
      z.object({
        name: z.string().min(3, { message: "Name must be at least 3 characters" }),
        contact: z.string().min(10, { message: "Please enter a valid contact number" }),
        cnicNumber: z.string().min(13, { message: "CNIC number must be 13 digits" }).max(13),
        cnicFront: z.string(),
        cnicBack: z.string(),
      }),
    )
    .min(1, { message: "At least one guarantor is required" })
    .max(2),
  itemImage: z.string(),
})

const investorFormSchema = z.object({
  username: z.string().min(3, { message: "Name must be at least 3 characters" }),
  contact: z.string().min(10, { message: "Please enter a valid contact number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  cnicNumber: z.string().min(13, { message: "CNIC number must be 13 digits" }).max(13),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  profilePicture: z.string(),
})

const customerFormSchema = z.object({
  username: z.string().min(3, { message: "Name must be at least 3 characters" }),
  contact: z.string().min(10, { message: "Please enter a valid contact number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  cnicNumber: z.string().min(13, { message: "CNIC number must be 13 digits" }).max(13),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  profilePicture: z.string(),
})

type InstallmentFormValues = z.infer<typeof installmentFormSchema>
type InvestorFormValues = z.infer<typeof investorFormSchema>
type CustomerFormValues = z.infer<typeof customerFormSchema>

export function CreateInstallmentForm() {
  // State for form data and UI
  const [itemImagePreview, setItemImagePreview] = useState<string | null>(null)
  const [guarantorCnicFrontPreviews, setGuarantorCnicFrontPreviews] = useState<(string | null)[]>([null, null])
  const [guarantorCnicBackPreviews, setGuarantorCnicBackPreviews] = useState<(string | null)[]>([null, null])
  const [isCalculatingFromRate, setIsCalculatingFromRate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showAddInvestor, setShowAddInvestor] = useState(false)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [investorImagePreview, setInvestorImagePreview] = useState<string | null>(null)
  const [customerImagePreview, setCustomerImagePreview] = useState<string | null>(null)
  const [localInvestors, setLocalInvestors] = useState<any>(investors)
  const [localCustomers, setLocalCustomers] = useState<any>(customers)
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("userData");
      if(userData){
        const parsedData = JSON.parse(userData);
    const onlyInvestors = parsedData.filter((user: any) => user.userType === "investor");
    const onlyCustomers = parsedData.filter((user: any) => user.userType === "customer");

    setLocalInvestors(onlyInvestors);
    setLocalCustomers(onlyCustomers);
    }
  }, [])
  // Initialize main form
  const form = useForm<InstallmentFormValues>({
    resolver: zodResolver(installmentFormSchema),
    defaultValues: {
      investorIds: [],
      customerId: "",
      itemName: "",
      costPrice: "",
      sellPrice: "",
      interestRate: "10", // Default interest rate
      timePeriod: "12", // Default time period (12 months)
      guarantors: [{ name: "", contact: "", cnicNumber: "", cnicFront: undefined, cnicBack: undefined }],
      itemImage: undefined,
    },
  })

  // Initialize investor form
  const investorForm = useForm<InvestorFormValues>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      username: "",
      contact: "",
      email: "",
      cnicNumber: "",
      address: "",
      profilePicture: "",
    },
  })

  // Initialize customer form
  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      username: "",
      contact: "",
      email: "",
      cnicNumber: "",
      address: "",
      profilePicture: undefined,
    },
  })

  const watchCostPrice = form.watch("costPrice")
  const watchSellPrice = form.watch("sellPrice")
  const watchInterestRate = form.watch("interestRate")
  const watchTimePeriod = form.watch("timePeriod")

  // Calculate sell price or interest rate based on inputs
  useEffect(() => {
    const costPrice = Number.parseFloat(watchCostPrice) || 0
    const timePeriod = Number.parseInt(watchTimePeriod) || 12

    if (isCalculatingFromRate) {
      // Calculate sell price based on interest rate
      const interestRate = Number.parseFloat(watchInterestRate) || 0
      const totalInterest = (costPrice * interestRate * timePeriod) / (100 * 12)
      const calculatedSellPrice = costPrice + totalInterest

      form.setValue("sellPrice", calculatedSellPrice.toFixed(2), { shouldValidate: true })
    } else {
      // Calculate interest rate based on sell price
      const sellPrice = Number.parseFloat(watchSellPrice) || 0
      if (costPrice > 0 && sellPrice > costPrice && timePeriod > 0) {
        const totalInterest = sellPrice - costPrice
        const calculatedRate = (totalInterest * 100 * 12) / (costPrice * timePeriod)

        form.setValue("interestRate", calculatedRate.toFixed(2), { shouldValidate: true })
      }
    }
  }, [watchCostPrice, watchSellPrice, watchInterestRate, watchTimePeriod, isCalculatingFromRate, form])

  // Handle image upload and preview for main form
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    index?: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
  
    const reader = new FileReader()
    reader.onload = async () => {
      const result = reader.result as string
  
      // 👇 Generate unique filename
      const fileName = `${fieldName}_${Date.now()}.${file.name.split(".").pop()}`
  
      // 👇 Upload to Supabase
      const { data, error } = await supabase.storage
        .from("restaurant-images") // your bucket name
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        })
  
      if (error) {
        console.error("Upload failed:", error.message)
        return
      }
  
      // 👇 Get public URL
      const { data: urlData } = supabase.storage.from("restaurant-images").getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl
  
      // 👇 Handle different field types
      if (fieldName === "itemImage") {
        setItemImagePreview(result)
        form.setValue("itemImage", publicUrl) // set URL, not file
      } else if (fieldName === "cnicFront" && index !== undefined) {
        const newPreviews = [...guarantorCnicFrontPreviews]
        newPreviews[index] = result
        setGuarantorCnicFrontPreviews(newPreviews)
  
        const guarantors = form.getValues("guarantors")
        guarantors[index].cnicFront = publicUrl // set URL
        form.setValue("guarantors", guarantors)
      } else if (fieldName === "cnicBack" && index !== undefined) {
        const newPreviews = [...guarantorCnicBackPreviews]
        newPreviews[index] = result
        setGuarantorCnicBackPreviews(newPreviews)
  
        const guarantors = form.getValues("guarantors")
        guarantors[index].cnicBack = publicUrl // set URL
        form.setValue("guarantors", guarantors)
      }
  
      console.log("Image uploaded to:", publicUrl)
    }
  
    reader.readAsDataURL(file)
  }
  
  // Handle image upload for investor/customer forms
  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "investor" | "customer"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Generate a unique filename
    const fieldName = "profileImage";
    const fileName = `${fieldName}_${Date.now()}.${file.name.split(".").pop()}`;
  
    // Read the file to preview
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
  
  
      // Upload image to Supabase
      const { data, error } = await supabase.storage
        .from("restaurant-images")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        });
  
      if (error) {
        console.error("Upload error:", error.message);
        return;
      }
  
      // Get public URL
      const { data: urlData } = supabase.storage
        .from("restaurant-images")
        .getPublicUrl(fileName);
  
      const publicUrl = urlData?.publicUrl;
  
      if (publicUrl) {
        // setUrl(publicUrl); // Optional state if you need it
  
        // Set image URL in form
        if (type === "investor") {
          investorForm.setValue("profilePicture", publicUrl);
          setInvestorImagePreview(publicUrl);
        } else {
          customerForm.setValue("profilePicture", publicUrl);
          setCustomerImagePreview(publicUrl);
        }
  
        console.log(`${fieldName} uploaded successfully:`, publicUrl);
      }
    };
  
    reader.readAsDataURL(file);
  };
  
  
  // Add guarantor
  const addGuarantor = () => {
    const currentGuarantors = form.getValues("guarantors")
    if (currentGuarantors.length < 2) {
      form.setValue("guarantors", [
        ...currentGuarantors,
        { name: "", contact: "", cnicNumber: "", cnicFront: "", cnicBack: "" },
      ])
    }
  }

  // Remove guarantor
  const removeGuarantor = (index: number) => {
    const currentGuarantors = form.getValues("guarantors")
    if (currentGuarantors.length > 1) {
      const newGuarantors = currentGuarantors.filter((_, i) => i !== index)
      form.setValue("guarantors", newGuarantors)

      // Update previews
      const newFrontPreviews = guarantorCnicFrontPreviews.filter((_, i) => i !== index)
      setGuarantorCnicFrontPreviews([...newFrontPreviews, null])

      const newBackPreviews = guarantorCnicBackPreviews.filter((_, i) => i !== index)
      setGuarantorCnicBackPreviews([...newBackPreviews, null])
    }
  }

  // Handle main form submission
  const onSubmit = async (data: InstallmentFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", {
      ...data,
      investors: data.investorIds.map((id) => localInvestors.find((inv: any) => inv.id.toString() === id)),
      customer: localCustomers.find((cust: any) => cust.id.toString() === data.customerId),
    })


    // Save to local storage or send to API
    const existingInstallments = JSON.parse(localStorage.getItem("installments") || "[]")
    const newInstallment = {
      id: existingInstallments.length + 1,
      ...data,
      investors: data.investorIds.map((id) => localInvestors.find((inv: any) => inv.id.toString() === id)),
      customer: localCustomers.find((cust: any) => cust.id.toString() === data.customerId),
    }
    existingInstallments.push(newInstallment)
    localStorage.setItem("installments", JSON.stringify(existingInstallments))


    setIsSubmitting(false)
    setIsSuccess(true)
    setShowAddInvestor(false)

    toast({
      title: "Installment Created",
      description: "The installment has been created successfully.",
      variant: "default",
    })

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      form.reset()
      setItemImagePreview(null)
      setGuarantorCnicFrontPreviews([null, null])
      setGuarantorCnicBackPreviews([null, null])
    }, 2000)
  }

  // Handle investor form submission
  const onInvestorSubmit = async (data: InvestorFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const activeSince = new Date()
    // Create new investor
    const newInvestor = {
      id: Math.max(...localInvestors.map((inv: any) => inv.id)) + 1,
      username: data.username,
      profilePicture: investorImagePreview || "/placeholder.svg?height=40&width=40",
      userType: "investor",
      status: "Inactive",
      activeSince: activeSince,
    }

    // Add to local investors
    setLocalInvestors([...localInvestors, newInvestor])
    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]")
  
      // ⬇️ Add the new user to the array
      const updatedUsers = [...existingUsers, newInvestor]
  
      // ⬇️ Save the updated array back to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUsers))
  
    // Add to selected investors
    const currentIds = form.getValues("investorIds")
    form.setValue("investorIds", [...currentIds, newInvestor.id.toString()])

    // Reset form and close
    investorForm.reset()
    setInvestorImagePreview(null)
    setShowAddInvestor(false)
    console.log("Investor added:", data);
    
    toast({
      title: "Investor Added",
      description: `${data.username} has been added successfully.`,
      variant: "default",
    })
  }

  // Handle customer form submission
  const onCustomerSubmit = async (data: CustomerFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const activeSince = new Date()
    // Create new customer
    const newCustomer = {
      id: Math.max(...localCustomers.map((cust: any) => cust.id)) + 1,
      username: data.username,
      email: data.email,
      profilePicture: customerImagePreview || "/placeholder.svg?height=40&width=40",
      userType: "customer",
      status: "Inactive",
      activeSince: activeSince,
    }

    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]")
  
      // ⬇️ Add the new user to the array
      const updatedUsers = [...existingUsers, newCustomer]
  
      // ⬇️ Save the updated array back to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUsers))
  

    // Add to local customers
    setLocalCustomers([...localCustomers, newCustomer])

    // Set as selected customer
    form.setValue("customerId", newCustomer.id.toString())
console.log("Customer added:", data);

    // Reset form and close
    customerForm.reset()
    setCustomerImagePreview(null)
    setShowAddCustomer(false)

    toast({
      title: "Customer Added",
      description: `${data.username} has been added successfully.`,
      variant: "default",
    })
  }

  // Calculate monthly installment amount
  const calculateMonthlyInstallment = () => {
    const sellPrice = Number.parseFloat(watchSellPrice) || 0
    const timePeriod = Number.parseInt(watchTimePeriod) || 1
    return sellPrice / timePeriod
  }

  // Format currency
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) : value
    if (isNaN(numValue)) return "$0.00"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Installment</h1>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Installment Created</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
              The installment has been created successfully.
            </p>
            <Button onClick={() => setIsSuccess(false)}>Create Another</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-violet-500" />
                        Investor Selection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="investorIds"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <FormLabel>Select Investors</FormLabel>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAddInvestor(true)}
                                className="text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/30"
                              >
                                <Plus className="mr-1 h-3 w-3" />
                                Add New Investor
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between border-2 py-6 text-base",
                                        field.value.length > 0
                                          ? "border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20"
                                          : "text-muted-foreground",
                                      )}
                                    >
                                      {field.value.length > 0
                                        ? `${field.value.length} investor${field.value.length > 1 ? "s" : ""} selected`
                                        : "Select investors"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0 border-2 border-violet-200 dark:border-violet-800 shadow-lg shadow-violet-100 dark:shadow-violet-900/20 min-w-[300px]">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search investors..."
                                      className="border-b-2 border-violet-100 dark:border-violet-800/50 py-3 text-base"
                                    />
                                    <CommandEmpty>
                                      <div className="flex flex-col items-center justify-center p-4 text-center">
                                        <UserPlus className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                                          No investor found
                                        </p>
                                        <Button
                                          type="button"
                                          size="sm"
                                          onClick={() => setShowAddInvestor(true)}
                                          className="bg-violet-600 hover:bg-violet-700 text-white"
                                        >
                                          <Plus className="mr-1 h-3 w-3" />
                                          Add New Investor
                                        </Button>
                                      </div>
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList className="max-h-[350px] overflow-y-auto py-2">
                                        {localInvestors.map((investor: any) => (
                                          <CommandItem
                                            key={investor.id}
                                            value={investor.username}
                                            onSelect={() => {
                                              const currentIds = [...field.value]
                                              const investorId = investor.id.toString()

                                              if (currentIds.includes(investorId)) {
                                                // Remove if already selected
                                                field.onChange(currentIds.filter((id) => id !== investorId))
                                              } else {
                                                // Add if not selected
                                                field.onChange([...currentIds, investorId])
                                              }
                                            }}
                                            className="cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/30 py-2 px-3 m-1 rounded-md transition-colors"
                                          >
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-8 w-8">
                                                <img src={investor.profilePicture || "/placeholder.svg"} alt={investor.username} />
                                              </Avatar>
                                              <span>{investor.username}</span>
                                            </div>
                                            <CheckCircle2
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                field.value.includes(investor.id.toString())
                                                  ? "opacity-100 text-violet-500"
                                                  : "opacity-0",
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>

                              {/* Display selected investors */}
                              {field.value.length > 0 && (
                                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3 border-2 border-violet-200 dark:border-violet-800">
                                  <h4 className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-2">
                                    Selected Investors:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {field.value.map((investorId) => {
                                      const investor = localInvestors.find((inv: any) => inv.id.toString() === investorId)
                                      if (!investor) return null

                                      return (
                                        <div
                                          key={investorId}
                                          className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-md border border-violet-200 dark:border-violet-800"
                                        >
                                          <Avatar className="h-6 w-6">
                                            <img src={investor.profilePicture || "/placeholder.svg"} alt={investor.username} />
                                          </Avatar>
                                          <span className="text-sm">{investor.username}</span>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 ml-1 text-violet-500 hover:text-violet-700 hover:bg-violet-100 dark:hover:bg-violet-800"
                                            onClick={() => {
                                              field.onChange(field.value.filter((id) => id !== investorId))
                                            }}
                                          >
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove</span>
                                          </Button>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-500" />
                        Customer Selection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="customerId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <FormLabel>Select Customer</FormLabel>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAddCustomer(true)}
                                className="text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
                              >
                                <Plus className="mr-1 h-3 w-3" />
                                Add New Customer
                              </Button>
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between border-2 py-6 text-base",
                                      field.value
                                        ? "border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/20"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? localCustomers.find((customer: any) => customer.id.toString() === field.value)?.username
                                      : "Select customer"}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 border-2 border-cyan-200 dark:border-cyan-800 shadow-lg shadow-cyan-100 dark:shadow-cyan-900/20 min-w-[300px]">
                                <Command>
                                  <CommandInput
                                    placeholder="Search customer..."
                                    className="border-b-2 border-cyan-100 dark:border-cyan-800/50 py-3 text-base"
                                  />
                                  <CommandEmpty>
                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                      <UserPlus className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
                                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                                        No customer found
                                      </p>
                                      <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => setShowAddCustomer(true)}
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                      >
                                        <Plus className="mr-1 h-3 w-3" />
                                        Add New Customer
                                      </Button>
                                    </div>
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList className="max-h-[350px] overflow-y-auto py-2 cursor-pointer">
                                      {localCustomers.map((customer: any) => (
                                        <CommandItem
                                          key={customer.id}
                                          value={customer.username}
                                           
                                          onSelect={() => {
                                            form.setValue("customerId", customer.id.toString())
                                          }}
                                          className="cursor-pointer  hover:bg-cyan-50 dark:hover:bg-cyan-900/30 py-2 px-3 m-1 rounded-md transition-colors"
                                        >
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                              <img src={customer.profilePicture || "/placeholder.svg"} alt={customer.username} />
                                            </Avatar>
                                            <div className="flex flex-col">
                                              <span>{customer.username}</span>
                                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {customer.email}
                                              </span>
                                            </div>
                                          </div>
                                          <CheckCircle2
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              customer.id.toString() === field.value
                                                ? "opacity-100 text-cyan-500"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-500" />
                        Guarantors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel>Add Guarantors</FormLabel>
                          {form.getValues("guarantors").length < 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addGuarantor}
                              className="text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                            >
                              <Plus className="mr-1 h-3 w-3" />
                              Add Guarantor
                            </Button>
                          )}
                        </div>

                        {form.getValues("guarantors").map((_, index) => (
                          <Card
                            key={index}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          >
                            <CardContent className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-900 dark:text-white">Guarantor {index + 1}</h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeGuarantor(index)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <X className="mr-1 h-3 w-3" />
                                    Remove
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`guarantors.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                          <Input placeholder="Full name" className="pl-9" {...field} />
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`guarantors.${index}.contact`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Contact</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                          <Input placeholder="Phone number" className="pl-9" {...field} />
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`guarantors.${index}.cnicNumber`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CNIC Number</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                          <Input
                                            placeholder="13-digit CNIC"
                                            className="pl-9"
                                            maxLength={13}
                                            {...field}
                                          />
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                  <FormLabel>CNIC Front</FormLabel>
                                  <div className="mt-1 space-y-2">
                                    <div
                                      className={cn(
                                        "h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden transition-all duration-300",
                                        guarantorCnicFrontPreviews[index]
                                          ? "border-amber-500 dark:border-amber-400"
                                          : "border-slate-300 dark:border-slate-700",
                                      )}
                                    >
                                      {guarantorCnicFrontPreviews[index] ? (
                                        <img
                                          src={guarantorCnicFrontPreviews[index] || "/placeholder.svg"}
                                          alt="CNIC Front"
                                          className="w-full h-full object-contain p-2"
                                        />
                                      ) : (
                                        <div className="flex flex-col items-center text-center p-4">
                                          <Upload className="h-8 w-8 text-slate-400 dark:text-slate-600 mb-2" />
                                          <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Upload CNIC front image
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <Label
                                      htmlFor={`cnic-front-${index}`}
                                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-md text-sm font-medium transition-colors"
                                    >
                                      <Upload className="mr-2 h-4 w-4" />
                                      Upload Front
                                    </Label>
                                    <Input
                                      id={`cnic-front-${index}`}
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(e, "cnicFront", index)}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <FormLabel>CNIC Back</FormLabel>
                                  <div className="mt-1 space-y-2">
                                    <div
                                      className={cn(
                                        "h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden transition-all duration-300",
                                        guarantorCnicBackPreviews[index]
                                          ? "border-amber-500 dark:border-amber-400"
                                          : "border-slate-300 dark:border-slate-700",
                                      )}
                                    >
                                      {guarantorCnicBackPreviews[index] ? (
                                        <img
                                          src={guarantorCnicBackPreviews[index] || "/placeholder.svg"}
                                          alt="CNIC Back"
                                          className="w-full h-full object-contain p-2"
                                        />
                                      ) : (
                                        <div className="flex flex-col items-center text-center p-4">
                                          <Upload className="h-8 w-8 text-slate-400 dark:text-slate-600 mb-2" />
                                          <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Upload CNIC back image
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <Label
                                      htmlFor={`cnic-back-${index}`}
                                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-md text-sm font-medium transition-colors"
                                    >
                                      <Upload className="mr-2 h-4 w-4" />
                                      Upload Back
                                    </Label>
                                    <Input
                                      id={`cnic-back-${index}`}
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(e, "cnicBack", index)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-emerald-500" />
                        Item Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter item name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <FormLabel>Item Image</FormLabel>
                          <div className="mt-1 space-y-2">
                            <div
                              className={cn(
                                "h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden transition-all duration-300",
                                itemImagePreview
                                  ? "border-emerald-500 dark:border-emerald-400"
                                  : "border-slate-300 dark:border-slate-700",
                              )}
                            >
                              {itemImagePreview ? (
                                <img
                                  src={itemImagePreview || "/placeholder.svg"}
                                  alt="Item"
                                  className="w-full h-full object-contain p-2"
                                />
                              ) : (
                                <div className="flex flex-col items-center text-center p-4">
                                  <Camera className="h-8 w-8 text-slate-400 dark:text-slate-600 mb-2" />
                                  <p className="text-sm text-slate-500 dark:text-slate-400">Upload item image</p>
                                </div>
                              )}
                            </div>
                            <Label
                              htmlFor="item-image"
                              className="cursor-pointer inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Image
                            </Label>
                            <Input
                              id="item-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, "itemImage")}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="costPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cost Price</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                  <Input
                                    placeholder="0.00"
                                    className="pl-9"
                                    {...field}
                                    onChange={(e) => {
                                      // Only allow numbers and decimal point
                                      const value = e.target.value.replace(/[^0-9.]/g, "")
                                      field.onChange(value)
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sellPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sell Price</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                  <Input
                                    placeholder="0.00"
                                    className="pl-9"
                                    {...field}
                                    onChange={(e) => {
                                      // Only allow numbers and decimal point
                                      const value = e.target.value.replace(/[^0-9.]/g, "")
                                      field.onChange(value)
                                      setIsCalculatingFromRate(false)
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="interestRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interest Rate (%)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                  <Input
                                    placeholder="0.00"
                                    className="pl-9"
                                    {...field}
                                    onChange={(e) => {
                                      // Only allow numbers and decimal point
                                      const value = e.target.value.replace(/[^0-9.]/g, "")
                                      field.onChange(value)
                                      setIsCalculatingFromRate(true)
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timePeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time Period (Months)</FormLabel>
                              <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                  <FormControl>
                                    <div className="relative">
                                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                      <Input type="number" min="1" max="48" className="pl-9" {...field} />
                                    </div>
                                  </FormControl>
                                  <span className="text-sm text-slate-500 dark:text-slate-400 w-10">
                                    {field.value} {Number.parseInt(field.value) === 1 ? "month" : "months"}
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[Number.parseInt(field.value)]}
                                  min={1}
                                  max={48}
                                  step={1}
                                  onValueChange={(value) => {
                                    field.onChange(value[0].toString())
                                  }}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                  <span>1 month</span>
                                  <span>24 months</span>
                                  <span>48 months</span>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-4">
                    <Button type="button" onClick={() => dispatch(setIsShowCreateInstallment(false))} variant="outline">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating...
                        </>
                      ) : (
                        "Create Installment"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Cost Price:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(watchCostPrice || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Sell Price:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(watchSellPrice || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Interest Rate:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{watchInterestRate || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Time Period:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {watchTimePeriod || 0} {Number.parseInt(watchTimePeriod || "0") === 1 ? "month" : "months"}
                      </span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Monthly Installment:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(calculateMonthlyInstallment())}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Selected Investors:</h4>
                    <div className="space-y-2">
                      {form.getValues("investorIds").length > 0 ? (
                        form.getValues("investorIds").map((investorId) => {
                          const investor = localInvestors.find((inv: any) => inv.id.toString() === investorId)
                          if (!investor) return null

                          return (
                            <div
                              key={investorId}
                              className="flex items-center gap-2 p-2 bg-violet-50 dark:bg-violet-900/20 rounded-md"
                            >
                              <Avatar className="h-6 w-6">
                                <img src={investor.profilePicture || "/placeholder.svg"} alt={investor.username} />
                              </Avatar>
                              <span className="text-sm">{investor.username}</span>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">No investors selected</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Selected Customer:</h4>
                    {form.getValues("customerId") ? (
                      <div className="flex items-center gap-2 p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-md">
                        <Avatar className="h-6 w-6">
                          <img
                            src={
                              localCustomers.find((c: any) => c.id.toString() === form.getValues("customerId"))?.profilePicture ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt="Customer"
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {localCustomers.find((c: any) => c.id.toString() === form.getValues("customerId"))?.username}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {localCustomers.find((c: any) => c.id.toString() === form.getValues("customerId"))?.email}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No customer selected</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Add Investor Form */}
      <AnimatePresence>
        {showAddInvestor && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md h-full bg-white dark:bg-slate-900 overflow-y-auto border-l border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add New Investor</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddInvestor(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <Form {...investorForm}>
                  <form onSubmit={investorForm.handleSubmit(onInvestorSubmit)} className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div
                          className={cn(
                            "h-24 w-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden",
                            investorImagePreview
                              ? "border-violet-500 dark:border-violet-400"
                              : "border-slate-300 dark:border-slate-700",
                          )}
                        >
                          {investorImagePreview ? (
                            <img
                              src={investorImagePreview || "/placeholder.svg"}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                          )}
                        </div>
                        <Label
                          htmlFor="investor-profile-image"
                          className="absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2 cursor-pointer shadow-md"
                        >
                          <Camera className="h-4 w-4" />
                        </Label>
                        <Input
                          id="investor-profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleProfileImageUpload(e, "investor")}
                        />
                      </div>
                    </div>

                    <FormField
                      control={investorForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input placeholder="John Doe" className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={investorForm.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Phone number" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={investorForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Email" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={investorForm.control}
                      name="cnicNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNIC Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input placeholder="13-digit CNIC" className="pl-9" maxLength={13} {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={investorForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowAddInvestor(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
                        Add Investor
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Customer Form */}
      <AnimatePresence>
        {showAddCustomer && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md h-full bg-white dark:bg-slate-900 overflow-y-auto border-l border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add New Customer</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddCustomer(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <Form {...customerForm}>
                  <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div
                          className={cn(
                            "h-24 w-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden",
                            customerImagePreview
                              ? "border-cyan-500 dark:border-cyan-400"
                              : "border-slate-300 dark:border-slate-700",
                          )}
                        >
                          {customerImagePreview ? (
                            <img
                              src={customerImagePreview || "/placeholder.svg"}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                          )}
                        </div>
                        <Label
                          htmlFor="customer-profile-image"
                          className="absolute bottom-0 right-0 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-2 cursor-pointer shadow-md"
                        >
                          <Camera className="h-4 w-4" />
                        </Label>
                        <Input
                          id="customer-profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleProfileImageUpload(e, "customer")}
                        />
                      </div>
                    </div>

                    <FormField
                      control={customerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input placeholder="John Doe" className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={customerForm.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Phone number" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={customerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Email" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={customerForm.control}
                      name="cnicNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNIC Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input placeholder="13-digit CNIC" className="pl-9" maxLength={13} {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={customerForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowAddCustomer(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        Add Customer
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
