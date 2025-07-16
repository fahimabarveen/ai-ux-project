"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Lightbulb, Zap, Users } from "lucide-react"
import ProjectForm from "./components/project-form"
import './globals.css';


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

interface Department {
  name: string
  projects: Project[]
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])

  // State for mouse position for radial gradient
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleGetStarted = () => {
    setShowForm(true)
    setSelectedProject(null)
  }

  const handleFormSubmit = (projectData: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    setDepartments((prev) => {
      const updatedDepartments = [...prev]
      const deptIndex = updatedDepartments.findIndex((d) => d.name === projectData.departmentName)

      if (deptIndex >= 0) {
        updatedDepartments[deptIndex].projects.push(newProject)
      } else {
        updatedDepartments.push({
          name: projectData.departmentName,
          projects: [newProject],
        })
      }

      return updatedDepartments
    })

    setSelectedProject(newProject)
    setShowForm(false)
  }


  const handleBackToHome = () => {
    setShowForm(false)
    setSelectedProject(null)
  }

  const hasProjects = departments.some((d) => d.projects.length > 0);

if (hasProjects) {
  console.log("There are departments with projects.");
}


  // CloudSlize Logo SVG
  const CloudSlizeLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-24 h-24 text-primary animate-[cloud-float_4s_ease-in-out_infinite]"
    >
      <path d="M18.364 10.043C17.334 7.412 14.784 5.5 11.882 5.5c-2.902 0-5.452 1.912-6.482 4.543C2.91 10.89 1 13.5 1 16.5c0 3.59 2.91 6.5 6.5 6.5h10c3.59 0 6.5-2.91 6.5-6.5 0-3-1.91-5.61-4.636-6.457zM12 19.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
  )

  // Show form in full screen
  if (showForm) {
    return <ProjectForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />
  }

  // Show selected project details if a project is selected
  if (selectedProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-foreground">
        <Card className="max-w-xl w-full">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">{selectedProject.projectName}</h2>
            <p className="mb-2"><strong>Description:</strong> {selectedProject.projectDescription}</p>
            <p className="mb-2"><strong>Owner:</strong> {selectedProject.projectOwnerName} ({selectedProject.projectOwnerEmail})</p>
            <p className="mb-2"><strong>Department:</strong> {selectedProject.departmentName}</p>
            <p className="mb-2"><strong>Approval Status:</strong> {selectedProject.projectApprovalStatus}</p>
            <Button onClick={handleBackToHome} className="mt-6">Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show full-screen home page if no projects exist
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-foreground animate-radial-pan"
      style={{ "--x": `${mousePosition.x}%`, "--y": `${mousePosition.y}%` } as React.CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Hero Section with CloudSlize Branding */}
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <CloudSlizeLogo />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 mt-4 animate-[text-reveal_1s_ease-out_forwards]"
          >
            CloudSlize
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          Transform your project management experience with our innovative platform. Create, manage, and track your
          projects with ease and efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group transform hover:scale-105 animate-[pulse-glow_2s_ease-in-out_infinite]"
          >
            Get Started
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Lightbulb,
              title: "Intuitive Design",
              desc: "Experience a clean, modern interface designed for ultimate productivity and ease of use.",
            },
            {
              icon: Zap,
              title: "Smart Automation",
              desc: "Automate repetitive tasks and streamline workflows to focus on what truly matters.",
            },
            {
              icon: Users,
              title: "Seamless Collaboration",
              desc: "Empower your team with integrated tools for real-time communication and shared progress.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <Card className="bg-card/80 backdrop-blur-sm border border-border hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <feature.icon className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary to-secondary rounded-2xl text-primary-foreground shadow-2xl shadow-primary/30"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your projects?</h2>
          <p className="text-xl mb-6 text-primary-foreground/80">
            Join thousands of teams who trust CloudSlize for their project management needs.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Your First Project
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
