"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  CheckCircle,
  Calendar,
  FileText,
  Hash,
  ArrowRight,
  Info,
  Clock,
} from "lucide-react"

interface Project {
  id: string
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
  createdAt: string
}

interface ProjectDisplayProps {
  project: Project
  onBack: () => void
}

export default function ProjectDisplay({ project, onBack }: ProjectDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-600 border-red-500/30"
      default:
        return "bg-muted/20 text-muted-foreground border-border"
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <div className="flex-1 p-8 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1">
          {project.projectApprovalCode}
        </Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="glassmorphic shadow-lg">
          <CardHeader className="border-b border-border bg-gradient-to-r from-card to-accent py-6">
            <CardTitle className="text-4xl text-foreground flex items-center">
              <FileText className="w-10 h-10 mr-4 text-primary" />
              {project.projectName}
            </CardTitle>
            <div className="flex items-center space-x-4 mt-4">
              <Badge className={`${getStatusColor(project.projectApprovalStatus)} px-3 py-1`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                {project.projectApprovalStatus}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-1" /> Created {formatDate(project.createdAt)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-10 space-y-10">
            {/* Project Information Grid */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left Column - Basic Information */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <Info className="w-6 h-6 mr-3 text-primary" />
                    Project Information
                  </h3>
                  <div className="space-y-6">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                      className="flex items-start space-x-4 p-4 bg-muted rounded-lg border border-border"
                    >
                      <Building className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Department / Unit Name</p>
                        <p className="text-foreground font-semibold text-lg">{project.departmentName}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.4 }}
                      className="flex items-start space-x-4 p-4 bg-muted rounded-lg border border-border"
                    >
                      <User className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Project Owner Name</p>
                        <p className="text-foreground font-semibold text-lg">{project.projectOwnerName}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 }}
                      className="flex items-start space-x-4 p-4 bg-muted rounded-lg border border-border"
                    >
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Project Owner Email</p>
                        <p className="text-foreground font-semibold text-lg">{project.projectOwnerEmail}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.6 }}
                      className="flex items-start space-x-4 p-4 bg-muted rounded-lg border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Project Approval</p>
                        <p className="text-foreground font-semibold text-lg">{project.projectApproval}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">Project Description</h4>
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <p className="text-muted-foreground leading-relaxed text-lg">{project.projectDescription}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Status and Tracking */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    Status & Tracking
                  </h3>
                  <div className="space-y-6">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30"
                    >
                      <span className="text-foreground font-medium">Project Approval Status</span>
                      <Badge className={`${getStatusColor(project.projectApprovalStatus)} px-3 py-1`}>
                        {project.projectApprovalStatus}
                      </Badge>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between p-5 bg-muted rounded-lg border border-border"
                    >
                      <span className="text-foreground font-medium">Project Approval Code</span>
                      <span className="text-foreground font-mono text-lg font-semibold">
                        {project.projectApprovalCode}
                      </span>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.7 }}
                      className="flex items-center justify-between p-5 bg-muted rounded-lg border border-border"
                    >
                      <span className="text-foreground font-medium">Application ID</span>
                      <span className="text-foreground font-mono text-lg font-semibold">{project.applicationId}</span>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.8 }}
                      className="flex items-start space-x-4 p-5 bg-muted rounded-lg border border-border"
                    >
                      <Calendar className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Project Approval Data & Time</p>
                        <p className="text-foreground font-semibold text-lg">{project.projectApprovalDateTime}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <Separator className="bg-border" />

                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.9 }}
                  className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30"
                >
                  <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Hash className="w-5 h-5 mr-2" />
                    Project Summary
                  </h4>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Created:</span>
                      <span className="text-foreground font-semibold">{formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Department:</span>
                      <span className="text-foreground font-semibold">{project.departmentName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Status:</span>
                      <Badge className={`${getStatusColor(project.projectApprovalStatus)} text-sm px-2 py-1`}>
                        {project.projectApprovalStatus}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Next Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center pt-8 border-t border-border"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 shadow-primary/30">
                Next
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
