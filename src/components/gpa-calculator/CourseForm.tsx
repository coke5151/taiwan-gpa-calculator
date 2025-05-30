
"use client";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit3, XCircle } from "lucide-react";
import type { Course, GradeSystem } from "@/types/gpa";
import { courseSchema } from "@/lib/schemas/courseSchema";

interface CourseFormProps {
  onSubmitCourse: (courseData: Omit<Course, "id">, idToUpdate?: string) => void;
  gradeSystem: GradeSystem | undefined;
  courseToEdit: Course | null;
  onCancelEdit?: () => void;
}

export default function CourseForm({ onSubmitCourse, gradeSystem, courseToEdit, onCancelEdit }: CourseFormProps) {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      subjectName: "",
      credits: "" as unknown as number, 
      grade: "",
    },
  });

  useEffect(() => {
    if (courseToEdit) {
      form.reset({
        subjectName: courseToEdit.subjectName,
        credits: courseToEdit.credits,
        grade: courseToEdit.grade,
      });
    } else {
      form.reset({
        subjectName: "",
        credits: "" as unknown as number,
        grade: "",
      });
    }
  }, [courseToEdit, form]);

  function handleSubmit(values: z.infer<typeof courseSchema>) {
    onSubmitCourse(values, courseToEdit?.id);
    if (!courseToEdit) { 
      form.reset();
    }
  }

  const isEditing = !!courseToEdit;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {isEditing ? <Edit3 className="h-6 w-6 text-primary" /> : <PlusCircle className="h-6 w-6 text-primary" />}
          {isEditing ? "編輯課程" : "新增課程"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>科目名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="例如：程式設計入門" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>學分</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="例如：3"
                        {...field}
                        value={field.value === undefined || field.value === null ? "" : String(field.value)}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "") {
                            field.onChange(""); // Allow clearing
                            return;
                          }
                          const numericValue = parseFloat(inputValue);
                          if (isNaN(numericValue)) {
                            // Handles cases like typing just "-" or "abc"
                            field.onChange("");
                          } else if (numericValue < 0) {
                            // If a negative number is formed (e.g., -5), clear the input.
                            field.onChange("");
                          } else {
                            field.onChange(numericValue);
                          }
                        }}
                        step="1"
                        min="0" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>獲得成績</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={!gradeSystem}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={gradeSystem ? "選擇成績" : "請先選擇評分系統"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeSystem?.points.map((point) => (
                          <SelectItem key={point.grade} value={point.grade}>
                            {point.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                {isEditing ? <Edit3 className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                {isEditing ? "更新課程" : "新增課程"}
              </Button>
              {isEditing && onCancelEdit && (
                <Button type="button" variant="outline" onClick={onCancelEdit} className="w-full md:w-auto">
                  <XCircle className="mr-2 h-4 w-4" />
                  取消編輯
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
