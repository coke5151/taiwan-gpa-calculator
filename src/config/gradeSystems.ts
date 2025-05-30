import type { GradeSystem } from '@/types/gpa';

export const GRADE_SYSTEMS: GradeSystem[] = [
  {
    id: 'taiwan-4.3',
    name: '台灣 4.3 GPA 制 (百分制對應)',
    points: [
      { grade: 'A+ (90-100)', value: 4.3 },
      { grade: 'A (85-89)', value: 4.0 },
      { grade: 'A- (80-84)', value: 3.7 },
      { grade: 'B+ (77-79)', value: 3.3 },
      { grade: 'B (73-76)', value: 3.0 },
      { grade: 'B- (70-72)', value: 2.7 },
      { grade: 'C+ (67-69)', value: 2.3 },
      { grade: 'C (63-66)', value: 2.0 },
      { grade: 'C- (60-62)', value: 1.7 },
      { grade: 'F (0-59)', value: 0.0 },
    ],
  },
  {
    id: 'standard-4.0',
    name: '標準 4.0 等級制 (美國字母等級)',
    points: [
      { grade: 'A', value: 4.0 },
      { grade: 'A-', value: 3.7 },
      { grade: 'B+', value: 3.3 },
      { grade: 'B', value: 3.0 },
      { grade: 'B-', value: 2.7 },
      { grade: 'C+', value: 2.3 },
      { grade: 'C', value: 2.0 },
      { grade: 'C-', value: 1.7 },
      { grade: 'D+', value: 1.3 },
      { grade: 'D', value: 1.0 },
      { grade: 'F', value: 0.0 },
    ],
  },
  {
    id: 'percentage-4.0-simple',
    name: '百分制轉 4.0 (簡化)',
    points: [
      { grade: '90-100%', value: 4.0 },
      { grade: '80-89%', value: 3.0 },
      { grade: '70-79%', value: 2.0 },
      { grade: '60-69%', value: 1.0 },
      { grade: '0-59%', value: 0.0 },
    ],
  },
  {
    id: 'standard-uk',
    name: '英國榮譽學位 (簡化)',
    points: [
        { grade: '一等榮譽 (1st)', value: 4.0 }, // 範例對應
        { grade: '二等一級榮譽 (2:1)', value: 3.3 },
        { grade: '二等二級榮譽 (2:2)', value: 2.7 },
        { grade: '三等榮譽 (3rd)', value: 2.0 },
        { grade: '及格 (Pass)', value: 1.0 },
        { grade: '不及格 (Fail)', value: 0.0 },
    ]
  }
];

export const DEFAULT_GRADE_SYSTEM_ID = GRADE_SYSTEMS[0].id; // Set Taiwanese 4.3 scale as default
