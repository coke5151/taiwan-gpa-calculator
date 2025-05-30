
"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ListChecks, Pencil, GripVertical } from "lucide-react";
import type { Course } from "@/types/gpa";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface SortableCourseRowProps {
  course: Course;
  onRemoveCourse: (id: string) => void;
  onEditCourse: (id: string) => void;
  onToggleCourseEnabled: (id: string) => void;
}

function SortableCourseRow({ course, onRemoveCourse, onEditCourse, onToggleCourseEnabled }: SortableCourseRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: course.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 100 : 'auto',
    backgroundColor: isDragging ? 'hsl(var(--muted))' : 'transparent',
  };

  return (
    <TableRow 
      ref={setNodeRef} 
      style={style} 
      {...attributes}
      className={cn(!course.isEnabled && "opacity-50", isDragging && "cursor-grabbing")}
    >
      <TableCell className="w-[40px] cursor-grab pl-2 pr-0">
        <span {...listeners} className="p-2 inline-block" aria-label={`拖曳以排序課程 ${course.subjectName}`}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </span>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center">
            <Switch
            id={`toggle-${course.id}`}
            checked={course.isEnabled}
            onCheckedChange={() => onToggleCourseEnabled(course.id)}
            aria-label={`切換課程 ${course.subjectName} 是否計入GPA`}
            />
        </div>
      </TableCell>
      <TableCell className="font-medium">{course.subjectName}</TableCell>
      <TableCell className="text-right">{course.credits.toFixed(1)}</TableCell>
      <TableCell className="text-right">{course.grade}</TableCell>
      <TableCell className="text-right w-[100px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEditCourse(course.id)}
          aria-label="編輯課程"
          className="mr-1"
        >
          <Pencil className="h-4 w-4 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveCourse(course.id)}
          aria-label="移除課程"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface CourseTableProps {
  courses: Course[];
  onRemoveCourse: (id: string) => void;
  onEditCourse: (id: string) => void;
  onToggleCourseEnabled: (id: string) => void;
  onReorderCourses: (oldIndex: number, newIndex: number) => void;
}

export default function CourseTable({
  courses,
  onRemoveCourse,
  onEditCourse,
  onToggleCourseEnabled,
  onReorderCourses,
}: CourseTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (courses.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ListChecks className="h-6 w-6 text-primary" />
            課程列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">尚未新增任何課程。請使用上方的表單新增課程，即可在此處查看。</p>
        </CardContent>
      </Card>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = courses.findIndex((c) => c.id === active.id);
      const newIndex = courses.findIndex((c) => c.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorderCourses(oldIndex, newIndex);
      }
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ListChecks className="h-6 w-6 text-primary" />
          課程列表
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={courses.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px] pl-3 pr-0"></TableHead> 
                    <TableHead className="w-[60px] text-center">計入</TableHead>
                    <TableHead>科目名稱</TableHead>
                    <TableHead className="text-right">學分</TableHead>
                    <TableHead className="text-right">成績</TableHead>
                    <TableHead className="text-right w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <SortableCourseRow
                      key={course.id}
                      course={course}
                      onEditCourse={onEditCourse}
                      onRemoveCourse={onRemoveCourse}
                      onToggleCourseEnabled={onToggleCourseEnabled}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
