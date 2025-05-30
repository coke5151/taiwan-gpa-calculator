
"use client";

import { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/gpa-calculator/AppHeader';
import CourseForm from '@/components/gpa-calculator/CourseForm';
import CourseTable from '@/components/gpa-calculator/CourseTable';
import GpaOverview from '@/components/gpa-calculator/GpaOverview';
import SettingsPanel from '@/components/gpa-calculator/SettingsPanel';
import { calculateGPA, generateCourseId, exportDataAsJSON, importDataFromJSONFile } from '@/lib/gpaUtils';
import type { Course, GradeSystem } from '@/types/gpa';
import { GRADE_SYSTEMS, DEFAULT_GRADE_SYSTEM_ID } from '@/config/gradeSystems';
import { useToast } from "@/hooks/use-toast";
import { arrayMove } from '@dnd-kit/sortable';


const LOCAL_STORAGE_COURSES_KEY = 'gpaCalculator_courses_v1_zh-Hant';
const LOCAL_STORAGE_SETTINGS_KEY = 'gpaCalculator_settings_v1_zh-Hant';

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedGradeSystemId, setSelectedGradeSystemId] = useState<string>(DEFAULT_GRADE_SYSTEM_ID);
  const [targetGpa, setTargetGpa] = useState<number | null>(null);
  const [currentGpa, setCurrentGpa] = useState<number>(0.0);
  const [isClient, setIsClient] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const storedCourses = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
    if (storedCourses) {
      try {
        const parsedCourses: Course[] = JSON.parse(storedCourses);
        setCourses(parsedCourses.map(c => ({ ...c, isEnabled: c.isEnabled === undefined ? true : c.isEnabled })));
      } catch (e) {
        console.error("解析儲存的課程時發生錯誤:", e);
        localStorage.removeItem(LOCAL_STORAGE_COURSES_KEY);
      }
    }

    const storedSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        if (settings.selectedGradeSystemId && GRADE_SYSTEMS.find(gs => gs.id === settings.selectedGradeSystemId)) {
          setSelectedGradeSystemId(settings.selectedGradeSystemId);
        }
        if (typeof settings.targetGpa === 'number' || settings.targetGpa === null) {
          setTargetGpa(settings.targetGpa);
        }
      } catch (e) {
        console.error("解析儲存的設定時發生錯誤:", e);
        localStorage.removeItem(LOCAL_STORAGE_SETTINGS_KEY);
      }
    }
  }, []);

  const selectedGradeSystem = GRADE_SYSTEMS.find(gs => gs.id === selectedGradeSystemId);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(courses));
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify({ selectedGradeSystemId, targetGpa }));
    
    if (selectedGradeSystem) {
      setCurrentGpa(calculateGPA(courses, selectedGradeSystem));
    }
  }, [courses, selectedGradeSystemId, targetGpa, selectedGradeSystem, isClient]);

  const handleSubmitCourse = useCallback((submittedData: Omit<Course, 'id' | 'isEnabled'>, idToUpdate?: string) => {
    if (!selectedGradeSystem) {
        toast({ variant: "destructive", title: "錯誤", description: "請先選擇一個評分系統。" });
        return;
    }
    const gradeExistsInSystem = selectedGradeSystem.points.some(p => p.grade === submittedData.grade);
    if (!gradeExistsInSystem) {
        toast({ variant: "destructive", title: "無效的成績", description: `成績 "${submittedData.grade}" 在所選的評分系統中無效。` });
        return;
    }

    if (idToUpdate) { // Editing existing course
        setCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === idToUpdate ? { ...course, ...submittedData, isEnabled: course.isEnabled } : course
            )
        );
        toast({ title: "成功", description: `課程 "${submittedData.subjectName}" 已更新。` });
        setCourseToEdit(null); 
    } else { // Adding new course
        const courseWithId: Course = { ...submittedData, id: generateCourseId(), isEnabled: true };
        setCourses(prevCourses => [...prevCourses, courseWithId]);
        toast({ title: "成功", description: `課程 "${courseWithId.subjectName}" 已新增。`});
    }
  }, [selectedGradeSystem, toast, setCourses, setCourseToEdit]);


  const handleRemoveCourse = useCallback((id: string) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    toast({ title: "課程已移除", description: "所選課程已被移除。" });
    if (courseToEdit && courseToEdit.id === id) {
      setCourseToEdit(null); // If the edited course is removed, clear edit state
    }
  }, [toast, courseToEdit, setCourseToEdit, setCourses]);

  const handleStartEditCourse = useCallback((id: string) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      setCourseToEdit(course);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [courses, setCourseToEdit]);

  const handleCancelEdit = useCallback(() => {
    setCourseToEdit(null);
  }, [setCourseToEdit]);

  const handleToggleCourseEnabled = useCallback((id: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id ? { ...course, isEnabled: !course.isEnabled } : course
      )
    );
  }, [setCourses]);

  const handleReorderCourses = useCallback((oldIndex: number, newIndex: number) => {
    setCourses((prevCourses) => {
      const reorderedCourses = arrayMove(prevCourses, oldIndex, newIndex);
      // No toast message for reordering as it's a direct manipulation
      return reorderedCourses;
    });
  }, [setCourses]);


  const handleGradeSystemChange = useCallback((newSystemId: string) => {
    if (newSystemId === selectedGradeSystemId) {
      return; 
    }

    const newSystem = GRADE_SYSTEMS.find(gs => gs.id === newSystemId);
    
    if (courses.length > 0 && newSystem && selectedGradeSystem) {
      const hasIncompatibleGrades = courses.some(course => {
        return !newSystem.points.some(p => p.grade === course.grade);
      });

      if (hasIncompatibleGrades) {
        toast({
          title: "評分系統已變更",
          description: `您已從「${selectedGradeSystem.name}」切換到「${newSystem.name}」。部分現有課程的成績可能與新系統不相容，因此 GPA 可能暫時顯示為 0 或不準確。請檢查或更新您的課程以符合新系統。`,
          duration: 8000,
        });
      }
    }
    setSelectedGradeSystemId(newSystemId);
    setCourseToEdit(null); // Cancel editing if system changes
  }, [courses, selectedGradeSystemId, selectedGradeSystem, toast, setCourseToEdit]);


  const handleTargetGpaChange = useCallback((gpa: number | null) => {
    setTargetGpa(gpa);
  }, []);

  const handleSaveData = useCallback(() => {
    const dataToSave = {
      courses,
      settings: { selectedGradeSystemId, targetGpa },
    };
    exportDataAsJSON(dataToSave, 'gpa_calculator_data_zh-Hant.json');
    toast({ title: "資料已儲存", description: "您的資料已匯出為 JSON 檔案。" });
  }, [courses, selectedGradeSystemId, targetGpa, toast]);

  const handleLoadData = useCallback(async (file: File) => {
    try {
      const loadedData = await importDataFromJSONFile(file);
      if (loadedData.courses && Array.isArray(loadedData.courses)) {
        const validCourses = loadedData.courses.filter((c: any) => 
          c.id && c.subjectName && typeof c.credits === 'number' && c.grade
        ).map((c: any) => ({
          ...c,
          isEnabled: c.isEnabled === undefined ? true : c.isEnabled, // Ensure isEnabled exists
        }));
        setCourses(validCourses);
      } else {
        throw new Error("JSON 檔案中的課程資料遺失或格式錯誤。");
      }
      if (loadedData.settings) {
        if (loadedData.settings.selectedGradeSystemId && GRADE_SYSTEMS.find(gs => gs.id === loadedData.settings.selectedGradeSystemId)) {
          setSelectedGradeSystemId(loadedData.settings.selectedGradeSystemId);
        }
        if (typeof loadedData.settings.targetGpa === 'number' || loadedData.settings.targetGpa === null) {
          setTargetGpa(loadedData.settings.targetGpa);
        }
      }
      setCourseToEdit(null); // Reset edit state on load
      toast({ title: "成功", description: "資料載入成功。" });
    } catch (error) {
      toast({ variant: "destructive", title: "載入資料時發生錯誤", description: (error as Error).message });
    }
  }, [setCourseToEdit, setCourses, setSelectedGradeSystemId, setTargetGpa, toast]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <AppHeader />
        <main className="container mx-auto p-4 md:p-8 flex-grow flex items-center justify-center">
            <p className="text-muted-foreground">正在載入 GPA 計算機...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AppHeader />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CourseForm 
              onSubmitCourse={handleSubmitCourse} 
              gradeSystem={selectedGradeSystem}
              courseToEdit={courseToEdit}
              onCancelEdit={handleCancelEdit}
            />
            <CourseTable 
              courses={courses} 
              onRemoveCourse={handleRemoveCourse}
              onEditCourse={handleStartEditCourse}
              onToggleCourseEnabled={handleToggleCourseEnabled}
              onReorderCourses={handleReorderCourses}
            />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <GpaOverview currentGpa={currentGpa} targetGpa={targetGpa} />
            <SettingsPanel
              gradeSystems={GRADE_SYSTEMS}
              selectedGradeSystemId={selectedGradeSystemId}
              onGradeSystemChange={handleGradeSystemChange}
              targetGpa={targetGpa}
              onTargetGpaChange={handleTargetGpaChange}
              onSaveData={handleSaveData}
              onLoadData={handleLoadData}
            />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-12">
        <p>&copy; 2025 GPA 計算機</p>
      </footer>
    </div>
  );
}

