export interface Course {
  id: string;
  subjectName: string;
  credits: number;
  grade: string; // Stores the selected grade string, e.g., "A", "B+", "90-100%"
  isEnabled: boolean; // Indicates if the course is included in GPA calculation
}

export interface GradePoint {
  grade: string; // e.g., "A+", "A", "A-", "Pass", "90-100"
  value: number; // e.g., 4.0, 3.7
}

export interface GradeSystem {
  id: string;
  name: string;
  points: GradePoint[];
}
