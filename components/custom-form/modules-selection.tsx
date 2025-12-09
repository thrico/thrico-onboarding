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
  isFutureWave?: boolean;
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
    category: "Charity",
    isFutureWave: true,
    modules: [{ id: "giving", label: "Giving", icon: Heart }],
  },
  {
    category: "Collaboration",
    isFutureWave: true,
    modules: [{ id: "projects", label: "Projects", icon: FolderKanban }],
  },
  {
    category: "Courses",
    isFutureWave: true,
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
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredCategories = moduleCategories
    .map((category) => ({
      ...category,
      modules: category.modules.filter((module) =>
        module.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.modules.length > 0);

  const totalSelected = selectedModules.length;
  const totalModules = moduleCategories.reduce(
    (acc, cat) => acc + cat.modules.length,
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Select Modules</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose the modules you want to include in your plan
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {totalSelected} of {totalModules} selected
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
          {filteredCategories.map((category) => (
            <div key={category.category} className="space-y-3">
              <div className="flex items-center justify-between sticky top-0 bg-background py-2 z-10">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-primary">
                    {category.category}
                  </h3>
                  {category.isFutureWave && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                      Future Wave
                    </span>
                  )}
                </div>
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
                    className="font-normal cursor-pointer text-xs text-muted-foreground"
                  >
                    Select All
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.modules.map((module) => {
                  const Icon = module.icon;
                  const isSelected = selectedModules.includes(module.id);
                  return (
                    <div
                      key={module.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        category.isFutureWave
                          ? isSelected
                            ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-sm"
                            : "border-border hover:border-purple-400 hover:bg-purple-50/30 dark:hover:bg-purple-950/30"
                          : isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/50 hover:bg-accent/30"
                      }`}
                      onClick={() => handleModuleToggle(module.id)}
                    >
                      <Checkbox
                        id={module.id}
                        checked={isSelected}
                        onCheckedChange={() => handleModuleToggle(module.id)}
                        className="pointer-events-none"
                      />
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          category.isFutureWave
                            ? isSelected
                              ? "text-purple-600"
                              : "text-muted-foreground"
                            : isSelected
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <Label
                        htmlFor={module.id}
                        className={`text-sm cursor-pointer flex-1 ${
                          isSelected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {module.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No modules found matching "{searchQuery}"
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={onPrevious}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button type="button" onClick={onNext}>
            Next ({totalSelected} selected)
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
