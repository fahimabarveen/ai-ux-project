"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from "lucide-react"

export function ProjectAForm() {
  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm border">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Project A</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {"If person login from Depart A show only depart a approved projects"}
          </p>
        </div>
      </div>

      <form className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="select-project" className="text-right">
            Project A
          </Label>
          <Select>
            <SelectTrigger id="select-project">
              <SelectValue placeholder="Select your project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-1">Project Alpha</SelectItem>
              <SelectItem value="project-2">Project Beta</SelectItem>
              <SelectItem value="project-3">Project Gamma</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="approval-code" className="text-right">
            Project Approval Code
          </Label>
          <Input id="approval-code" value="AUTO-GENERATED" readOnly className="bg-muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="project-name" className="text-right">
            Project Name
          </Label>
          <Input id="project-name" placeholder="Text Input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          <Label htmlFor="project-description" className="text-right pt-2">
            Project description
          </Label>
          <Textarea id="project-description" placeholder="Text Input" rows={4} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="owner-name" className="text-right">
            Project Owner Name
          </Label>
          <Input id="owner-name" placeholder="Text Input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="owner-email" className="text-right">
            Project Owner Email
          </Label>
          <Input id="owner-email" type="email" placeholder="Text Input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="project-approval" className="text-right">
            Project Approval
          </Label>
          <Select>
            <SelectTrigger id="project-approval">
              <SelectValue placeholder="Select Approver Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approver-1">Approver One</SelectItem>
              <SelectItem value="approver-2">Approver Two</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="approval-status" className="text-right">
            Project Approval Status
          </Label>
          <div id="approval-status" className="py-2 px-3 text-muted-foreground">
            Pending
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="approval-datetime" className="text-right">
            Project Approval Data & Time
          </Label>
          <div id="approval-datetime" className="py-2 px-3 text-muted-foreground">
            N/A
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" className="flex items-center gap-2">
            NEXT <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}


