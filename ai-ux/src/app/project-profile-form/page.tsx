"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ProjectProfileForm() {
  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Project Profile</h2>
      <form className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="department-name" className="text-right">
            Department / Unit Name
          </Label>
          <Select>
            <SelectTrigger id="department-name">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dept-a">Department A</SelectItem>
              <SelectItem value="dept-b">Department B</SelectItem>
              <SelectItem value="dept-c">Department C</SelectItem>
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
          <Input id="project-name" placeholder="Enter project name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          <Label htmlFor="project-description" className="text-right pt-2">
            Project description
          </Label>
          <Textarea id="project-description" placeholder="Enter project description" rows={4} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="owner-name" className="text-right">
            Project Owner Name
          </Label>
          <Input id="owner-name" placeholder="Enter owner name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Label htmlFor="owner-email" className="text-right">
            Project Owner Email
          </Label>
          <Input id="owner-email" type="email" placeholder="Enter owner email" />
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
              <SelectItem value="approver-1">John Doe</SelectItem>
              <SelectItem value="approver-2">Jane Smith</SelectItem>
              <SelectItem value="approver-3">Alice Johnson</SelectItem>
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

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-6 pt-6 border-t">
          <Label htmlFor="application-id" className="text-right">
            Application ID
          </Label>
          <Input id="application-id" placeholder="Auto-generated ID" readOnly className="bg-muted" />
        </div>
      </form>
    </div>
  )
}
