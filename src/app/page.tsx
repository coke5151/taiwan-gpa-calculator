import GpaCalculatorPage from '@/components/gpa-calculator/GpaCalculatorPage';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <GpaCalculatorPage />
      <Toaster />
    </>
  );
}
