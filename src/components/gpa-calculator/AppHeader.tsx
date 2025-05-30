import { GraduationCap } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="w-full py-6 mb-8 text-center border-b">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <GraduationCap className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          GPA 計算機
        </h1>
      </div>
    </header>
  );
}
