# 台灣 GPA 計算機 (Taiwan GPA Calculator)
一個專為台灣學生設計的現代化 GPA 計算工具，支援多種評分系統，提供直觀的課程管理和 GPA 追蹤功能。

## ✨ 主要功能
### 📚 課程管理
- **新增課程**：輸入課程名稱、學分數和成績
- **編輯課程**：隨時修改已新增的課程資訊
- **刪除課程**：移除不需要的課程
- **拖拽排序**：透過拖拽重新排列課程順序
- **啟用/停用**：選擇性地將課程納入或排除於 GPA 計算

### 🎯 GPA 計算
- **即時計算**：自動計算並顯示當前 GPA
- **多種評分系統**：
  - 台灣 4.3 GPA 制（百分制對應）
  - 標準 4.0 等級制（美國字母等級）
  - 百分制轉 4.0（簡化版）
  - 英國榮譽學位（簡化版）
- **目標設定**：設定目標 GPA 並追蹤進度

### 💾 資料管理
- **本地儲存**：自動儲存課程資料和設定到瀏覽器
- **匯出功能**：將資料匯出為 JSON 檔案
- **匯入功能**：從 JSON 檔案載入先前儲存的資料
- **資料驗證**：確保匯入資料的完整性和正確性

### 🎨 使用者介面
- **響應式設計**：支援桌面和行動裝置
- **現代化 UI**：使用 Tailwind CSS 和 Radix UI 組件
- **深色/淺色主題**：自動適應系統主題偏好
- **即時通知**：操作成功或錯誤的即時回饋

## 🚀 技術架構

### 前端技術
- **Next.js 15.2.3**：React 全端框架
- **React 18**：使用者介面函式庫
- **TypeScript**：型別安全的 JavaScript
- **Tailwind CSS**：實用優先的 CSS 框架
- **Radix UI**：無障礙的 UI 組件庫

### 開發工具
- **React Hook Form**：表單狀態管理
- **Zod**：資料驗證
- **@dnd-kit**：拖拽功能
- **Lucide React**：圖示庫
- **date-fns**：日期處理

## 📦 安裝與執行
### 系統需求
- Node.js 18.0 或更高版本
- npm 或 yarn 套件管理器

### 安裝步驟
1. **複製專案**
   ```bash
   git clone https://github.com/your-username/taiwan-gpa-calculator.git
   cd taiwan-gpa-calculator
   ```

2. **安裝相依套件**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. **開啟瀏覽器**
   前往 [http://localhost:9002](http://localhost:9002) 查看應用程式

### 可用指令
```bash
# 開發模式（使用 Turbopack）
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm run start

# 程式碼檢查
npm run lint

# 型別檢查
npm run typecheck

# 建置並匯出靜態檔案
npm run export

# 準備部署檔案
npm run deploy
```

## 🚀 GitHub Pages 部署

此專案已配置為可自動部署到 GitHub Pages。

### 自動部署設定

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "準備部署到 GitHub Pages"
   git push origin main
   ```

2. **啟用 GitHub Pages**
   - 前往您的 GitHub 儲存庫
   - 點擊 `Settings` 標籤
   - 在左側選單找到 `Pages`
   - 在 `Source` 選擇 `GitHub Actions`
   - 儲存設定

3. **自動部署**
   - 每次推送到 `main` 分支時會自動觸發部署
   - 部署完成後可在 `https://your-username.github.io/taiwan-gpa-calculator/` 查看

### 手動部署

如果需要手動部署：

```bash
# 建置靜態檔案
npm run build

# 檔案會輸出到 out/ 資料夾
# 將 out/ 資料夾的內容上傳到您的靜態網站主機
```

### 部署注意事項

- 專案已配置為靜態導出模式
- 所有圖片都設定為未優化模式以支援靜態部署
- 使用相對路徑確保在子路徑下正常運作
- 包含 `.nojekyll` 檔案避免 Jekyll 處理

## 📖 使用指南
### 基本操作

1. **新增課程**
   - 在「新增課程」區域輸入課程資訊
   - 選擇適當的成績等級
   - 點擊「新增課程」按鈕

2. **管理課程**
   - 使用表格中的編輯按鈕修改課程
   - 使用刪除按鈕移除課程
   - 使用核取方塊啟用/停用課程
   - 拖拽課程列來重新排序

3. **設定評分系統**
   - 在設定面板選擇適合的評分系統
   - 系統會自動重新計算 GPA

4. **設定目標 GPA**
   - 在設定面板輸入目標 GPA
   - 系統會顯示當前進度

5. **資料備份與還原**
   - 使用「匯出資料」儲存當前資料
   - 使用「匯入資料」載入先前儲存的資料

### 評分系統說明
#### 台灣 4.3 GPA 制
- A+ (90-100): 4.3
- A (85-89): 4.0
- A- (80-84): 3.7
- B+ (77-79): 3.3
- B (73-76): 3.0
- B- (70-72): 2.7
- C+ (67-69): 2.3
- C (63-66): 2.0
- C- (60-62): 1.7
- F (0-59): 0.0

#### 標準 4.0 等級制
- A: 4.0
- A-: 3.7
- B+: 3.3
- B: 3.0
- B-: 2.7
- C+: 2.3
- C: 2.0
- C-: 1.7
- D+: 1.3
- D: 1.0
- F: 0.0

## 🗂️ 專案結構
```
taiwan-gpa-calculator/
├── src/
│   ├── app/                    # Next.js 應用程式路由
│   │   ├── globals.css         # 全域樣式
│   │   ├── layout.tsx          # 根佈局
│   │   └── page.tsx            # 首頁
│   ├── components/             # React 組件
│   │   ├── gpa-calculator/     # GPA 計算機組件
│   │   │   ├── AppHeader.tsx
│   │   │   ├── CourseForm.tsx
│   │   │   ├── CourseTable.tsx
│   │   │   ├── GpaCalculatorPage.tsx
│   │   │   ├── GpaOverview.tsx
│   │   │   └── SettingsPanel.tsx
│   │   └── ui/                 # 基礎 UI 組件
│   ├── config/                 # 配置檔案
│   │   └── gradeSystems.ts     # 評分系統定義
│   ├── hooks/                  # 自定義 React Hooks
│   │   ├── use-mobile.tsx      # 行動裝置檢測
│   │   └── use-toast.ts        # Toast 通知
│   ├── lib/                    # 工具函式
│   │   ├── schemas/            # 資料驗證 Schema
│   │   ├── gpaUtils.ts         # GPA 計算工具
│   │   └── utils.ts            # 通用工具
│   └── types/                  # TypeScript 型別定義
│       └── gpa.ts              # GPA 相關型別
├── docs/                       # 文件
│   └── blueprint.md            # 專案藍圖
├── public/                     # 靜態資源
├── package.json                # 專案配置
├── tailwind.config.ts          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 專案說明
```

## 🔧 自訂與擴展
### 新增評分系統

1. 編輯 `src/config/gradeSystems.ts`
2. 新增評分系統物件：
   ```typescript
   {
     id: 'custom-system',
     name: '自訂評分系統',
     points: [
       { grade: 'A', value: 4.0 },
       // ... 其他等級
     ],
   }
   ```

### 修改樣式
1. 編輯 `tailwind.config.ts` 調整主題
2. 修改 `src/app/globals.css` 調整全域樣式
3. 在組件中使用 Tailwind CSS 類別

### 新增功能
1. 在 `src/components/gpa-calculator/` 新增組件
2. 在 `src/lib/` 新增工具函式
3. 在 `src/types/` 新增型別定義


## 📄 授權條款
此專案採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 檔案。

## 🙏 致謝
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - UI 組件庫
- [Lucide](https://lucide.dev/) - 圖示庫

---

**台灣 GPA 計算機** - 讓 GPA 計算變得簡單直觀 🎓