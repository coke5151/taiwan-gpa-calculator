import { z } from "zod";

export const courseSchema = z.object({
  subjectName: z.string().min(1, "科目名稱為必填。").max(100, "科目名稱過長。"),
  credits: z.coerce.number().min(0.1, "學分必須為正數。").max(20, "學分數值似乎過高 (最多 20)。"),
  grade: z.string().min(1, "成績為必填。"),
});
