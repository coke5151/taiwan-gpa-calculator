
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Download, Upload, Target } from "lucide-react";
import type { GradeSystem } from "@/types/gpa";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  gradeSystems: GradeSystem[];
  selectedGradeSystemId: string;
  onGradeSystemChange: (id: string) => void;
  targetGpa: number | null;
  onTargetGpaChange: (gpa: number | null) => void;
  onSaveData: () => void;
  onLoadData: (file: File) => Promise<void>;
}

export default function SettingsPanel({
  gradeSystems,
  selectedGradeSystemId,
  onGradeSystemChange,
  targetGpa,
  onTargetGpaChange,
  onSaveData,
  onLoadData,
}: SettingsPanelProps) {
  const [currentTargetGpaInput, setCurrentTargetGpaInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentTargetGpaInput(targetGpa === null ? "" : String(targetGpa));
  }, [targetGpa]);

  const handleTargetGpaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTargetGpaInput(e.target.value);
  };

  const handleTargetGpaSet = () => {
    if (currentTargetGpaInput === "") {
      onTargetGpaChange(null);
      toast({ title: "成功", description: "目標 GPA 已清除。" });
      return;
    }

    const newTarget = parseFloat(currentTargetGpaInput);
    const selectedSystem = gradeSystems.find(gs => gs.id === selectedGradeSystemId);
    const maxPossibleGpa = selectedSystem?.points.reduce((max, p) => Math.max(max, p.value), 0) ?? 4.0;
    
    if (!isNaN(newTarget) && newTarget >= 0 && newTarget <= maxPossibleGpa) {
      onTargetGpaChange(newTarget);
      toast({ title: "成功", description: "目標 GPA 已更新。" });
    } else {
      toast({ variant: "destructive", title: "錯誤", description: `無效的目標 GPA。請輸入一個有效的數字 (例如 0.0 至 ${maxPossibleGpa.toFixed(1)})。` });
      // Optionally reset input to current valid targetGpa or empty
      setCurrentTargetGpaInput(targetGpa === null ? "" : String(targetGpa));
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await onLoadData(file);
        toast({ title: "成功", description: "資料載入成功。" });
      } catch (error) {
        toast({ variant: "destructive", title: "載入資料時發生錯誤", description: (error as Error).message });
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Settings className="h-6 w-6 text-primary" />
          設定與資料
        </CardTitle>
        <CardDescription>設定您的 GPA 計算偏好並管理您的課程資料。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="grade-system-select">評分系統</Label>
          <Select value={selectedGradeSystemId} onValueChange={onGradeSystemChange}>
            <SelectTrigger id="grade-system-select">
              <SelectValue placeholder="選擇評分系統" />
            </SelectTrigger>
            <SelectContent>
              {gradeSystems.map((system) => (
                <SelectItem key={system.id} value={system.id}>
                  {system.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-gpa-input">目標 GPA</Label>
          <div className="flex items-center gap-2">
            <Input
              id="target-gpa-input"
              type="number"
              placeholder="例如：3.5"
              value={currentTargetGpaInput}
              onChange={handleTargetGpaInputChange}
              step="0.01"
              min="0"
            />
            <Button onClick={handleTargetGpaSet} variant="outline">
              <Target className="mr-2 h-4 w-4" /> 設定目標
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">管理資料</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={onSaveData} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" /> 儲存資料到檔案
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> 從檔案載入資料
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
                aria-hidden="true"
            />
            </div>
            <CardDescription className="text-xs">您的課程會自動儲存在瀏覽器中。使用這些選項來備份或傳輸您的資料。</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
