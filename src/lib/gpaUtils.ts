import type { Course, GradeSystem } from '@/types/gpa';

export function calculateGPA(courses: Course[], gradeSystem: GradeSystem): number {
  const enabledCourses = courses.filter(course => course.isEnabled);
  
  if (!enabledCourses.length || !gradeSystem) {
    return 0.0;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  enabledCourses.forEach(course => {
    const gradePoint = gradeSystem.points.find(p => p.grade === course.grade);
    if (gradePoint && course.credits > 0) {
      totalPoints += gradePoint.value * course.credits;
      totalCredits += course.credits;
    }
  });

  if (totalCredits === 0) {
    return 0.0;
  }

  const gpa = totalPoints / totalCredits;
  return parseFloat(gpa.toFixed(2)); // Return GPA rounded to 2 decimal places
}

export function generateCourseId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments where crypto.randomUUID is not available
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function exportDataAsJSON(data: any, filename: string): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = filename;
  link.click();
  link.remove();
}

export function importDataFromJSONFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/json') {
      reject(new Error('檔案類型無效。請上傳 JSON 檔案。'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const jsonData = JSON.parse(result);
          resolve(jsonData);
        } else {
          reject(new Error('無法讀取檔案內容。'));
        }
      } catch (error) {
        reject(new Error('解析 JSON 檔案時發生錯誤： ' + (error as Error).message));
      }
    };
    reader.onerror = () => {
      reject(new Error('讀取檔案時發生錯誤。'));
    };
    reader.readAsText(file);
  });
}
