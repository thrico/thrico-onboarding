"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useCustomFormStore } from "@/lib/custom-form-store"

interface ContactInformationProps {
  onNext: () => void
  onPrevious: () => void
}

export default function ContactInformation({ onNext, onPrevious }: ContactInformationProps) {
  const { contact, setContact, teamRequirements, features, timeLine, security } = useCustomFormStore()
  const [firstName, setFirstName] = useState(contact?.firstName || "")
  const [lastName, setLastName] = useState(contact?.lastName || "")
  const [email, setEmail] = useState(contact?.email || "")
  const [phone, setPhone] = useState(contact?.phone || "")
  const [jobTitle, setJobTitle] = useState(contact?.jobTitle || "")
  const [contactMethod, setContactMethod] = useState(contact?.contactMethod || "email")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    jobTitle?: string
  }>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    const newErrors: typeof errors = {}
    if (!firstName) newErrors.firstName = "Please enter your first name"
    if (!lastName) newErrors.lastName = "Please enter your last name"
    if (!email) newErrors.email = "Please enter your email"
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email"
    if (!jobTitle) newErrors.jobTitle = "Please enter your job title"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    const contactData = { firstName, lastName, email, phone, jobTitle, contactMethod }
    setContact(contactData)

    try {
      const response = await fetch("/api/custom-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamRequirements,
          features,
          timeLine,
          contact: contactData,
          security,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setApiError("Too many requests. Please wait a moment and try again.")
        } else if (data.errors && Array.isArray(data.errors)) {
          setApiError(data.errors.join(", "))
        } else {
          setApiError(data.error || "Something went wrong. Please try again.")
        }
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      onNext()
    } catch (error) {
      console.error("Submission error:", error)
      setApiError("Network error. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
        </div>

        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Business Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobTitle"
                placeholder="CTO, IT Director, etc."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMethod">Preferred Contact Method</Label>
              <Select value={contactMethod} onValueChange={setContactMethod}>
                <SelectTrigger id="contactMethod">
                  <SelectValue placeholder="Select preferred method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
