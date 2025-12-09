"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Briefcase,
  List,
  BookOpen,
  UserCheck,
  MessageSquare,
  Tag,
  BarChart3,
  ShoppingCart,
  PieChart,
  Award,
  MessageCircle,
  Cake,
  HelpCircle,
  MapPin,
  Trophy,
  Network,
} from "lucide-react";

const modules = [
  { id: "network", label: "Network", icon: Network },
  { id: "communities", label: "Communities", icon: Users },
  { id: "events", label: "Events", icon: Calendar },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "listing", label: "Listing", icon: List },
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "mentorship", label: "Mentorship", icon: UserCheck },
  { id: "forums", label: "Forums", icon: MessageSquare },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "surveys", label: "Surveys", icon: BarChart3 },
  { id: "shop", label: "Shop", icon: ShoppingCart },
  { id: "polls", label: "Polls", icon: PieChart },
  { id: "wall-of-fame", label: "Wall of Fame", icon: Award },
  { id: "feedback", label: "Feedback", icon: MessageCircle },
  { id: "birthdays", label: "Birthdays", icon: Cake },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "new-to-city", label: "New to City", icon: MapPin },
  { id: "gamification", label: "Gamification", icon: Trophy },
];

interface ModulesSelectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function ModulesSelection({
  onNext,
  onPrevious,
}: ModulesSelectionProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Modules</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose the modules you want to include in your plan
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={module.id}
                  checked={selectedModules.includes(module.id)}
                  onCheckedChange={() => handleModuleToggle(module.id)}
                />
                <Icon className="h-5 w-5 text-muted-foreground" />
                <Label
                  htmlFor={module.id}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {module.label}
                </Label>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button type="button" onClick={onNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
