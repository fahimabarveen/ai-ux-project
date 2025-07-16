"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle, AlertCircle, FileText, ArrowRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FormData {
  departmentName: string
  projectApprovalCode: string
  projectName: string
  projectDescription: string
  projectOwnerName: string
  projectOwnerEmail: string
  projectApproval: string
  projectApprovalStatus: string
  projectApprovalDateTime: string
  applicationId: string
}

interface ProjectFormProps {
  onSubmit: (data: FormData) => void
  onBack: () => void
}

export default function ProjectForm({ onSubmit, onBack }: ProjectFormProps) {
  const [formData, setFormData] = useState<FormData>({
    departmentName: "",
    projectApprovalCode: "",
    projectName: "",
    projectDescription: "",
    projectOwnerName: "",
    projectOwnerEmail: "",
    projectApproval: "",
    projectApprovalStatus: "Pending",
    projectApprovalDateTime: "",
    applicationId: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-generate codes when form loads
  useEffect(() => {
    const approvalCode = `PAC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    const appId = `APP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const currentDateTime = new Date().toLocaleString()

    setFormData((prev) => ({
      ...prev,
      projectApprovalCode: approvalCode,
      applicationId: appId,
      projectApprovalDateTime: currentDateTime,
    }))
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.departmentName.trim()) newErrors.departmentName = "Department name is required"
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required"
    if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project description is required"
    if (!formData.projectOwnerName.trim()) newErrors.projectOwnerName = "Project owner name is required"
    if (!formData.projectOwnerEmail.trim()) {
      newErrors.projectOwnerEmail = "Project owner email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.projectOwnerEmail)) {
      newErrors.projectOwnerEmail = "Invalid email format"
    }
    if (!formData.projectApproval) newErrors.projectApproval = "Project approver is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const departments = [
    "Depart A",
    "Depart B",
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
    "IT",
    "Research & Development",
  ]

  const approvers = [
    "John Smith - Engineering Manager",
    "Sarah Johnson - Marketing Director",
    "Mike Davis - CTO",
    "Lisa Wilson - VP Engineering",
    "David Brown - Operations Manager",
    "Emily Chen - Finance Director",
  ]

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">CloudSlize - New Project</h1>
          </div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <Card className="bg-card border border-border shadow-lg">
            <CardHeader className="border-b border-border bg-gradient-to-r from-card to-accent">
              <CardTitle className="text-3xl text-foreground text-center flex items-center justify-center py-2">
                <FileText className="w-8 h-8 mr-3 text-primary" />
                Project Profile
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Department / Unit Name */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <Label htmlFor="departmentName" className="text-foreground font-semibold text-lg">
                    Department / Unit Name
                  </Label>
                  <Select
                    value={formData.departmentName}
                    onValueChange={(value) => updateFormData("departmentName", value)}
                  >
                    <SelectTrigger
                      className={`bg-input border-border h-12 text-lg text-foreground ${errors.departmentName ? "border-destructive ring-destructive" : ""}`}
                    >
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-foreground border-border">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept} className="hover:bg-accent">
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.departmentName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.departmentName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Approval Code */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectApprovalCode" className="text-foreground font-semibold text-lg">
                    Project Approval Code
                  </Label>
                  <div className="relative">
                    <Input
                      id="projectApprovalCode"
                      value={formData.projectApprovalCode}
                      readOnly
                      className="bg-muted border-border text-muted-foreground cursor-not-allowed h-12 text-lg"
                    />
                    <Badge className="absolute right-3 top-3 bg-green-500/20 text-green-400 border-green-500/30">
                      Auto-Generated
                    </Badge>
                  </div>
                </motion.div>

                {/* Project Name */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectName" className="text-foreground font-semibold text-lg">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => updateFormData("projectName", e.target.value)}
                    className={`bg-input border-border h-12 text-lg text-foreground ${errors.projectName ? "border-destructive ring-destructive" : ""}`}
                    placeholder="Enter project name"
                  />
                  {errors.projectName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Description */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectDescription" className="text-foreground font-semibold text-lg">
                    Project description
                  </Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => updateFormData("projectDescription", e.target.value)}
                    className={`bg-input border-border text-lg text-foreground ${errors.projectDescription ? "border-destructive ring-destructive" : ""}`}
                    placeholder="Provide a detailed description of your project"
                    rows={4}
                  />
                  {errors.projectDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectDescription}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Owner Name */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectOwnerName" className="text-foreground font-semibold text-lg">
                    Project Owner Name
                  </Label>
                  <Input
                    id="projectOwnerName"
                    value={formData.projectOwnerName}
                    onChange={(e) => updateFormData("projectOwnerName", e.target.value)}
                    className={`bg-input border-border h-12 text-lg text-foreground ${errors.projectOwnerName ? "border-destructive ring-destructive" : ""}`}
                    placeholder="Enter owner's full name"
                  />
                  {errors.projectOwnerName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectOwnerName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Owner Email */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectOwnerEmail" className="text-foreground font-semibold text-lg">
                    Project Owner Email
                  </Label>
                  <Input
                    id="projectOwnerEmail"
                    type="email"
                    value={formData.projectOwnerEmail}
                    onChange={(e) => updateFormData("projectOwnerEmail", e.target.value)}
                    className={`bg-input border-border h-12 text-lg text-foreground ${errors.projectOwnerEmail ? "border-destructive ring-destructive" : ""}`}
                    placeholder="Enter owner's email address"
                  />
                  {errors.projectOwnerEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectOwnerEmail}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Approval */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectApproval" className="text-foreground font-semibold text-lg">
                    Project Approval
                  </Label>
                  <Select
                    value={formData.projectApproval}
                    onValueChange={(value) => updateFormData("projectApproval", value)}
                  >
                    <SelectTrigger
                      className={`bg-input border-border h-12 text-lg text-foreground ${errors.projectApproval ? "border-destructive ring-destructive" : ""}`}
                    >
                      <SelectValue placeholder="Select Approver Name" />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-foreground border-border">
                      {approvers.map((approver) => (
                        <SelectItem key={approver} value={approver} className="hover:bg-accent">
                          {approver}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectApproval && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectApproval}
                    </motion.p>
                  )}
                </motion.div>

                {/* Project Approval Status */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectApprovalStatus" className="text-foreground font-semibold text-lg">
                    Project Approval Status
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
                      {formData.projectApprovalStatus}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Status will update after submission</span>
                  </div>
                </motion.div>

                {/* Project Approval Date & Time */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.9 }}
                  className="space-y-3"
                >
                  <Label htmlFor="projectApprovalDateTime" className="text-foreground font-semibold text-lg">
                    Project Approval Data & Time
                  </Label>
                  <Input
                    id="projectApprovalDateTime"
                    value={formData.projectApprovalDateTime}
                    readOnly
                    className="bg-muted border-border text-muted-foreground cursor-not-allowed h-12 text-lg"
                  />
                </motion.div>

                {/* Application ID */}
                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 1.0 }}
                  className="space-y-3"
                >
                  <Label htmlFor="applicationId" className="text-foreground font-semibold text-lg">
                    Application ID
                  </Label>
                  <Input
                    id="applicationId"
                    value={formData.applicationId}
                    readOnly
                    className="bg-muted border-border text-muted-foreground cursor-not-allowed h-12 text-lg"
                  />
                </motion.div>

                {/* Form Actions */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex justify-center space-x-6 pt-8 border-t border-border"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 mr-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="border-border text-foreground hover:bg-accent bg-transparent px-12 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </motion.div>

                {/* Next Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex justify-center pt-6"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-primary hover:text-primary/90 hover:bg-accent px-8 py-2 text-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
