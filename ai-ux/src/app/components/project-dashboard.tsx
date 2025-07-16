"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CheckCircle,
  User,
  Mail,
  Building,
  Network,
  Server,
  Database,
  LayoutDashboard,
  Info,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"

interface FormData {
  projectName: string
  projectDescription: string
  ownerName: string
  ownerEmail: string
  department: string
  approver: string
  architecture: string
  vnetConfig: string
  subnetConfig: string
}

interface ProjectDashboardProps {
  formData: FormData
  onBack: () => void
}

export default function ProjectDashboard({ formData, onBack }: ProjectDashboardProps) {
  const projectCode = `PRJ-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  const deploymentId = `DEP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  const sidebarItems = [
    { title: "Project Overview", icon: LayoutDashboard, active: true },
    { title: "Architecture", icon: Network },
    { title: "Deployment", icon: Server },
    { title: "Monitoring", icon: Database },
    { title: "Settings", icon: User },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "deployed":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "failed":
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
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar className="border-r border-border shadow-lg">
          <SidebarHeader className="p-6 border-b border-border">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-bold text-foreground mb-2">{formData.projectName}</h2>
              <Badge className={getStatusColor("deployed")}>
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </motion.div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={item.active} className="text-foreground hover:bg-accent">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-foreground hover:bg-accent" />
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
              <Badge variant="outline" className="border-secondary/50 text-secondary px-3 py-1">
                {projectCode}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Project Details */}
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Card className="glassmorphic shadow-lg">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="text-foreground flex items-center text-2xl">
                      <Info className="w-6 h-6 mr-3 text-primary" />
                      Project Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                        className="flex items-start space-x-3 p-3 bg-muted rounded-md border border-border"
                      >
                        <User className="w-4 h-4 text-primary mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Project Owner</p>
                          <p className="text-foreground font-medium">{formData.ownerName}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="flex items-start space-x-3 p-3 bg-muted rounded-md border border-border"
                      >
                        <Mail className="w-4 h-4 text-primary mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Contact Email</p>
                          <p className="text-foreground font-medium">{formData.ownerEmail}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                        className="flex items-start space-x-3 p-3 bg-muted rounded-md border border-border"
                      >
                        <Building className="w-4 h-4 text-primary mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Department</p>
                          <p className="text-foreground font-medium capitalize">{formData.department}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="flex items-start space-x-3 p-3 bg-muted rounded-md border border-border"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Approver</p>
                          <p className="text-foreground font-medium">
                            {formData.approver.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    <Separator className="bg-border" />

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Description</p>
                      <p className="text-foreground">{formData.projectDescription}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Architecture & Deployment */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <Card className="glassmorphic shadow-lg">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="text-foreground flex items-center text-2xl">
                      <Network className="w-6 h-6 mr-3 text-primary" />
                      Architecture Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                      <p className="text-sm text-muted-foreground">Selected Architecture</p>
                      <p className="text-foreground font-medium capitalize">
                        {formData.architecture.replace("-", " ")}
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                      >
                        <p className="text-sm text-muted-foreground">VNET Config</p>
                        <p className="text-foreground font-mono text-sm">{formData.vnetConfig}</p>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-sm text-muted-foreground">Subnet Config</p>
                        <p className="text-foreground font-mono text-sm">{formData.subnetConfig}</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphic shadow-lg">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="text-foreground flex items-center text-2xl">
                      <Server className="w-6 h-6 mr-3 text-primary" />
                      Deployment Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={getStatusColor("deployed")}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Deployed
                      </Badge>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">Deployment ID</span>
                      <span className="text-foreground font-mono text-sm">{deploymentId}</span>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.0 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-foreground text-sm">
                        {currentDate} at {currentTime}
                      </span>
                    </motion.div>

                    <Separator className="bg-border" />

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.1 }}
                      className="space-y-2"
                    >
                      <p className="text-sm text-muted-foreground">Resources Created</p>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-foreground">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                          Virtual Network (VNET)
                        </div>
                        <div className="flex items-center text-sm text-foreground">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                          Subnet Configuration
                        </div>
                        <div className="flex items-center text-sm text-foreground">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                          Network Security Group
                        </div>
                        {formData.architecture.includes("lb") && (
                          <div className="flex items-center text-sm text-foreground">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                            Load Balancer
                          </div>
                        )}
                        {formData.architecture.includes("vm") && (
                          <div className="flex items-center text-sm text-foreground">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                            Virtual Machine
                          </div>
                        )}
                        {formData.architecture.includes("storage") && (
                          <div className="flex items-center text-sm text-foreground">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                            Storage Account
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
