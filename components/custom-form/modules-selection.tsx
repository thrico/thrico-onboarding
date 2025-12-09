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
  BookOpen,
  UserCheck,
  MessageSquare,
  Tag,
  BarChart3,
  ShoppingCart,
  Award,
  MessageCircle,
  Image,
  HelpCircle,
  MapPin,
  Trophy,
  Network,
  Rss,
  FileText,
  Radio,
  Mail,
  Newspaper,
  Navigation,
  MessageCircleMore,
  Building2,
  Star,
  Megaphone,
  Cake,
  PartyPopper,
  UserPlus,
  Gift,
  TrendingUp,
  Coins,
  Heart,
  FolderKanban,
  GraduationCap,
  School,
} from "lucide-react";

interface Module {
  id: string;
  label: string;
  icon: any;
}

interface ModuleCategory {
  category: string;
  modules: Module[];
}

const moduleCategories: ModuleCategory[] = [
  {
    category: "Content",
    modules: [
      { id: "feed", label: "Feed", icon: Rss },
      { id: "stories", label: "Stories", icon: BookOpen },
      { id: "media", label: "Media", icon: FileText },
      { id: "newsletter", label: "Newsletter", icon: Mail },
      { id: "news", label: "News", icon: Newspaper },
    ],
  },
  {
    category: "Connections",
    modules: [
      { id: "network", label: "Network", icon: Network },
      { id: "nearby", label: "Nearby", icon: Navigation },
      { id: "new-to-city", label: "New to City", icon: MapPin },
    ],
  },
  {
    category: "Conversations",
    modules: [
      { id: "events", label: "Events", icon: Calendar },
      { id: "forums", label: "Discussion Forums", icon: MessageSquare },
      { id: "chat", label: "Chat", icon: MessageCircleMore },
    ],
  },
  {
    category: "Communities",
    modules: [{ id: "communities", label: "Communities", icon: Users }],
  },
  {
    category: "Commerce",
    modules: [
      { id: "shop", label: "Shop", icon: ShoppingCart },
      { id: "offers", label: "Offers", icon: Tag },
      { id: "marketplace", label: "Marketplace", icon: Radio },
    ],
  },
  {
    category: "Careers",
    modules: [
      { id: "jobs", label: "Jobs", icon: Briefcase },
      { id: "mentorship", label: "Mentorship", icon: UserCheck },
    ],
  },
  {
    category: "Companies",
    modules: [{ id: "companies", label: "Companies", icon: Building2 }],
  },
  {
    category: "Celebrations",
    modules: [
      { id: "wall-of-fame", label: "Wall of Fame", icon: Award },
      { id: "spotlight", label: "Spotlight", icon: Star },
      { id: "memories", label: "Memories", icon: Image },
      { id: "birthdays", label: "Birthdays", icon: Cake },
      { id: "anniversaries", label: "Anniversaries", icon: PartyPopper },
      { id: "announcements", label: "Announcements", icon: Megaphone },
    ],
  },
  {
    category: "Care",
    modules: [
      { id: "polls", label: "Polls", icon: BarChart3 },
      { id: "surveys", label: "Surveys", icon: BarChart3 },
      { id: "feedback", label: "Feedback", icon: MessageCircle },
      { id: "faq", label: "FAQ", icon: HelpCircle },
    ],
  },
  {
    category: "Champion",
    modules: [
      { id: "invite", label: "Invite", icon: UserPlus },
      { id: "refer", label: "Refer", icon: Gift },
    ],
  },
  {
    category: "Collectibles (Gamification)",
    modules: [
      { id: "leaders-dashboard", label: "Leaders Dashboard", icon: TrendingUp },
      { id: "redeem-points", label: "Redeem Points", icon: Coins },
      { id: "badges", label: "Badges", icon: Award },
      { id: "ranks", label: "Ranks", icon: Trophy },
    ],
  },
  {
    category: "Charity (Future wave) *",
    modules: [{ id: "giving", label: "Giving", icon: Heart }],
  },
  {
    category: "Collaboration (Future wave) *",
    modules: [{ id: "projects", label: "Projects", icon: FolderKanban }],
  },
  {
    category: "Courses (Future wave) *",
    modules: [
      { id: "courses", label: "Courses", icon: GraduationCap },
      { id: "coaches", label: "Coaches", icon: School },
    ],
  },
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

  const handleCategorySelectAll = (
    category: ModuleCategory,
    checked: boolean
  ) => {
    const categoryModuleIds = category.modules.map((m) => m.id);
    if (checked) {
      setSelectedModules((prev) => [
        ...new Set([...prev, ...categoryModuleIds]),
      ]);
    } else {
      setSelectedModules((prev) =>
        prev.filter((id) => !categoryModuleIds.includes(id))
      );
    }
  };

  const isCategoryFullySelected = (category: ModuleCategory) => {
    return category.modules.every((m) => selectedModules.includes(m.id));
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
        {moduleCategories.map((category) => (
          <div key={category.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{category.category}</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`select-all-${category.category}`}
                  checked={isCategoryFullySelected(category)}
                  onCheckedChange={(checked) =>
                    handleCategorySelectAll(category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`select-all-${category.category}`}
                  className="font-normal cursor-pointer text-sm"
                >
                  Select All
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.modules.map((module) => {
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
          </div>
        ))}

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
