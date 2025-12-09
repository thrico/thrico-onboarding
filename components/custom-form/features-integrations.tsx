"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings } from "lucide-react"
import { useCustomFormStore } from "@/lib/custom-form-store"

interface FeaturesIntegrationsProps {
  onNext: () => void
  onPrevious: () => void
}

const featureOptions = [
  { label: "Custom branding/white-label", value: "branding" },
  { label: "Advanced analytics & reporting", value: "analytics" },
  { label: "API access & integrations", value: "api" },
  { label: "Mobile applications", value: "mobile" },
  { label: "Single Sign-On (SSO)", value: "sso" },
  { label: "Advanced security features", value: "security" },
  { label: "Custom workflows", value: "workflows" },
  { label: "Multi-language support", value: "multilanguage" },
  { label: "Dedicated infrastructure", value: "infrastructure" },
  { label: "24/7 priority support", value: "support" },
  { label: "Custom training & onboarding", value: "training" },
  { label: "Data export & migration tools", value: "export" },
]

export default function FeaturesIntegrations({ onNext, onPrevious }: FeaturesIntegrationsProps) {
  const { features, setFeatures } = useCustomFormStore()
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(features?.features || [])

  const handleFeatureChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, value])
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeatures({ features: selectedFeatures })
    onNext()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold">Features</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Required Features (Select all that apply)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featureOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${option.value}`}
                    checked={selectedFeatures.includes(option.value)}
                    onCheckedChange={(checked) => handleFeatureChange(option.value, checked as boolean)}
                  />
                  <Label htmlFor={`feature-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
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
