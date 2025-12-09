"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import { useCustomFormStore } from "@/lib/custom-form-store";

interface TeamRequirementsProps {
  onNext: () => void;
}

const painPointOptions = [
  { label: "Current solution is too expensive", value: "expensive" },
  { label: "Limited scalability", value: "scalability" },
  { label: "Poor user experience", value: "ux" },
  { label: "Lack of mobile access", value: "mobile" },
  { label: "Insufficient analytics/reporting", value: "analytics" },
  { label: "Security concerns", value: "security" },
  { label: "Integration challenges", value: "integration" },
  { label: "Poor customer support", value: "support" },
  { label: "Missing key features", value: "features" },
  { label: "Compliance issues", value: "compliance" },
];

export default function TeamRequirements({ onNext }: TeamRequirementsProps) {
  const { teamRequirements, setTeamRequirements } = useCustomFormStore();
  const [memberSize, setMemberSize] = useState(
    teamRequirements?.memberSize || ""
  );
  const [currentSolution, setCurrentSolution] = useState(
    teamRequirements?.currentSolution || ""
  );
  const [painPoints, setPainPoints] = useState<string[]>(
    teamRequirements?.painPoints || []
  );
  const [communityOnboarding, setCommunityOnboarding] = useState(
    teamRequirements?.communityOnboarding || ""
  );
  const [errors, setErrors] = useState<{ memberSize?: string }>({});

  const handlePainPointChange = (value: string, checked: boolean) => {
    if (checked) {
      setPainPoints([...painPoints, value]);
    } else {
      setPainPoints(painPoints.filter((p) => p !== value));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setPainPoints(painPointOptions.map((option) => option.value));
    } else {
      setPainPoints([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberSize) {
      setErrors({ memberSize: "Please select expected member size" });
      return;
    }
    setTeamRequirements({
      memberSize,
      currentSolution,
      painPoints,
      communityOnboarding,
    });
    onNext();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold">Members & Requirements</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="memberSize">
              Expected Member Size <span className="text-destructive">*</span>
            </Label>
            <Select value={memberSize} onValueChange={setMemberSize}>
              <SelectTrigger id="memberSize">
                <SelectValue placeholder="Select expected member size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 members</SelectItem>
                <SelectItem value="11-50">11-50 members</SelectItem>
                <SelectItem value="51-200">51-200 members</SelectItem>
                <SelectItem value="201-500">201-500 members</SelectItem>
                <SelectItem value="501-1000">501-1000 members</SelectItem>
                <SelectItem value="1000plus">1000+ members</SelectItem>
              </SelectContent>
            </Select>
            {errors.memberSize && (
              <p className="text-sm text-destructive">{errors.memberSize}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSolution">Current Solution</Label>
            <Input
              id="currentSolution"
              placeholder="What solution are you currently using?"
              value={currentSolution}
              onChange={(e) => setCurrentSolution(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="communityOnboarding">
              Community Onboarding Setup
            </Label>
            <Select
              value={communityOnboarding}
              onValueChange={setCommunityOnboarding}
            >
              <SelectTrigger id="communityOnboarding">
                <SelectValue placeholder="Select onboarding preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self-service">
                  Self-service onboarding
                </SelectItem>
                <SelectItem value="guided">Guided onboarding</SelectItem>
                <SelectItem value="white-glove">White-glove setup</SelectItem>
                <SelectItem value="custom">Custom onboarding plan</SelectItem>
                <SelectItem value="none">No onboarding needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>
                What are your main pain points? (Select all that apply)
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={painPoints.length === painPointOptions.length}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked as boolean)
                  }
                />
                <Label
                  htmlFor="select-all"
                  className="font-normal cursor-pointer text-sm"
                >
                  Select All
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {painPointOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={painPoints.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handlePainPointChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
