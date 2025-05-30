"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calculator, Target, TrendingUp } from "lucide-react";

interface GpaOverviewProps {
  currentGpa: number;
  targetGpa: number | null;
}

export default function GpaOverview({ currentGpa, targetGpa }: GpaOverviewProps) {
  const progressPercentage = targetGpa && targetGpa > 0 ? Math.min((currentGpa / targetGpa) * 100, 100) : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="h-6 w-6 text-primary" />
          GPA 總覽
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">您目前的 GPA</p>
          <p className="text-5xl font-bold text-primary">{currentGpa.toFixed(2)}</p>
        </div>

        {targetGpa !== null && (
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">目標 GPA：</span>
                    <span className="text-sm font-semibold text-foreground">{targetGpa.toFixed(2)}</span>
                </div>
                {currentGpa >= targetGpa && (
                    <div className="flex items-center gap-1 text-accent-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">已達成目標！</span>
                    </div>
                )}
            </div>
            <Progress value={progressPercentage} aria-label={`目標 GPA 進度：${progressPercentage.toFixed(0)}%`} className="h-3 [&>div]:bg-accent" />
            <p className="text-xs text-muted-foreground text-right">距離目標 {progressPercentage.toFixed(0)}%</p>
          </div>
        )}
        {targetGpa === null && (
            <CardDescription className="text-center">
                在設定面板中設定目標 GPA 以追蹤您的進度。
            </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
