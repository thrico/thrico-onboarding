"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCustomFormStore } from "@/lib/custom-form-store"

interface BudgetTimelineProps {
  onNext: () => void
  onPrevious: () => void
}

export default function BudgetTimeline({ onNext, onPrevious }: BudgetTimelineProps) {
  const { timeLine, setTimeLine } = useCustomFormStore()
  const [budget, setBudget] = useState(timeLine?.budget || "")
  const [timeline, setTimeline] = useState(timeLine?.timeline || "")
  const [decisionMakers, setDecisionMakers] = useState(timeLine?.decisionMakers || "")
  const [errors, setErrors] = useState<{ budget?: string; timeline?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { budget?: string; timeline?: string } = {}
    if (!budget) newErrors.budget = "Please select your budget range"
    if (!timeline) newErrors.timeline = "Please select implementation timeline"
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setTimeLine({ budget, timeline, decisionMakers })
    onNext()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Budget & Timeline</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="budget">
              Annual Budget Range <span className="text-destructive">*</span>
            </Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under25k">Under $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="over250k">Over $250,000</SelectItem>
              </SelectContent>
            </Select>
            {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
          </div>

          <div className="space-y-3">
            <Label>
              Implementation Timeline <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={timeline} onValueChange={setTimeline}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate" className="font-normal cursor-pointer">
                  Immediate (within 30 days)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-3" id="1-3" />
                <Label htmlFor="1-3" className="font-normal cursor-pointer">
                  1-3 months
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-6" id="3-6" />
                <Label htmlFor="3-6" className="font-normal cursor-pointer">
                  3-6 months
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6plus" id="6plus" />
                <Label htmlFor="6plus" className="font-normal cursor-pointer">
                  6+ months
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exploring" id="exploring" />
                <Label htmlFor="exploring" className="font-normal cursor-pointer">
                  Just exploring options
                </Label>
              </div>
            </RadioGroup>
            {errors.timeline && <p className="text-sm text-destructive">{errors.timeline}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="decisionMakers">Who else is involved in the decision-making process?</Label>
            <Textarea
              id="decisionMakers"
              placeholder="e.g., CTO, IT Director, Procurement team..."
              rows={4}
              value={decisionMakers}
              onChange={(e) => setDecisionMakers(e.target.value)}
            />
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
