"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCustomFormStore } from "@/lib/custom-form-store"

interface SecurityRequirementsProps {
  onNext: () => void
  onPrevious: () => void
}

export default function SecurityRequirements({ onNext, onPrevious }: SecurityRequirementsProps) {
  const { security, setSecurity } = useCustomFormStore()
  const [technicalRequirements, setTechnicalRequirements] = useState(security?.technicalRequirements || "")
  const [additionalInfo, setAdditionalInfo] = useState(security?.additionalInfo || "")
  const [referral, setReferral] = useState(security?.referral || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSecurity({ technicalRequirements, additionalInfo, referral })
    onNext()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Security & Additional Requirements</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="technicalRequirements">Specific Technical Requirements</Label>
            <Textarea
              id="technicalRequirements"
              placeholder="Any specific technical requirements, infrastructure needs, or constraints..."
              rows={4}
              value={technicalRequirements}
              onChange={(e) => setTechnicalRequirements(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Anything else you'd like us to know about your requirements..."
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referral">How did you hear about Thrico?</Label>
            <Select value={referral} onValueChange={setReferral}>
              <SelectTrigger id="referral">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="event">Event or Conference</SelectItem>
                <SelectItem value="ad">Online Advertisement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
