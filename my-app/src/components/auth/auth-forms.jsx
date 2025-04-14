"use client";

import React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Phone,
  CreditCard,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Sign-in form schema
const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must not be longer than 100 characters" }),
});

// Sign-up form schema
const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(50, { message: "Username must not be longer than 50 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    contact: z
      .string()
      .min(10, { message: "Contact number must be at least 10 digits" })
      .max(15, { message: "Contact number must not be longer than 15 digits" }),
    cnicNumber: z
      .string()
      .min(13, { message: "CNIC number must be at least 13 digits" })
      .max(15, { message: "CNIC number must not be longer than 15 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password must not be longer than 100 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function AuthForms() {
  const [activeTab, setActiveTab] = useState("signin");
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to Our Platform
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Sign in to your account or create a new one
          </p>
        </div>
        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-md mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onSuccess={() => setActiveTab("signup")} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={() => setActiveTab("signin")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SignInForm({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    // In a real app, you would handle authentication here
    console.log(data);
    toast({
      title: "Sign in successful",
      description: "You have been signed in successfully.",
    });
    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="email@example.com"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() =>
              document.querySelector('[data-value="signup"]')?.click()
            }
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}

function SignUpForm({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [cnicFrontImage, setCnicFrontImage] = useState(null);
  const [cnicBackImage, setCnicBackImage] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      contact: "",
      cnicNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data) {
    // Validate that all required images are uploaded
    if (!profileImage || !cnicFrontImage || !cnicBackImage) {
      toast({
        title: "Missing images",
        description: "Please upload all required images",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would handle registration here
    console.log({ ...data, profileImage, cnicFrontImage, cnicBackImage });
    toast({
      title: "Account created",
      description: "Your account has been created successfully.",
    });
    onSuccess();
  }

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Upload */}
            <div className="mb-6">
              <Label className="block mb-2">Profile Picture</Label>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center mb-2 overflow-hidden",
                    profileImage ? "border-primary" : "border-muted-foreground"
                  )}
                >
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <Label
                  htmlFor="profile-image"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="johndoe"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="email@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="+1234567890"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnicNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="3520112345678"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CNIC Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="block mb-2">CNIC Front Image</Label>
                <div
                  className={cn(
                    "h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center mb-2",
                    cnicFrontImage
                      ? "border-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {cnicFrontImage ? (
                    <img
                      src={cnicFrontImage || "/placeholder.svg"}
                      alt="CNIC Front"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload CNIC front
                      </p>
                    </>
                  )}
                </div>
                <Label
                  htmlFor="cnic-front"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Front
                </Label>
                <Input
                  id="cnic-front"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setCnicFrontImage)}
                />
              </div>
              <div>
                <Label className="block mb-2">CNIC Back Image</Label>
                <div
                  className={cn(
                    "h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center mb-2",
                    cnicBackImage ? "border-primary" : "border-muted-foreground"
                  )}
                >
                  {cnicBackImage ? (
                    <img
                      src={cnicBackImage || "/placeholder.svg"}
                      alt="CNIC Back"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload CNIC back
                      </p>
                    </>
                  )}
                </div>
                <Label
                  htmlFor="cnic-back"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Back
                </Label>
                <Input
                  id="cnic-back"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setCnicBackImage)}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword
                              ? "Hide password"
                              : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-6">
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() =>
              document.querySelector('[data-value="signin"]')?.click()
            }
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
