import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'GPA 計算機',
  description: '輕鬆計算和追蹤您的 GPA。設定目標並在本機儲存您的進度。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.variable,
        GeistMono.variable
      )}>
        {children}
      </body>
    </html>
  );
}
