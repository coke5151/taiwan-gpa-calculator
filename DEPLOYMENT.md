# GitHub Pages 部署指南

本文件詳細說明如何將台灣 GPA 計算機部署到 GitHub Pages。

## 🚀 快速部署步驟

### 1. 準備 GitHub 儲存庫

1. 在 GitHub 上建立新的儲存庫，名稱建議為 `taiwan-gpa-calculator`
2. 將本地專案推送到 GitHub：

```bash
git init
git add .
git commit -m "初始提交：台灣 GPA 計算機"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/taiwan-gpa-calculator.git
git push -u origin main
```

### 2. 啟用 GitHub Pages

1. 前往您的 GitHub 儲存庫頁面
2. 點擊 **Settings** 標籤
3. 在左側選單中找到 **Pages**
4. 在 **Source** 部分選擇 **GitHub Actions**
5. 點擊 **Save** 儲存設定

### 3. 自動部署

一旦設定完成，每次推送到 `main` 分支時會自動觸發部署：

1. GitHub Actions 會自動執行建置流程
2. 建置完成後會自動部署到 GitHub Pages
3. 您的網站將可在以下網址存取：
   ```
   https://YOUR_USERNAME.github.io/taiwan-gpa-calculator/
   ```

## 📋 已配置的功能

### Next.js 靜態導出配置

專案已配置以下設定以支援 GitHub Pages：

- **靜態導出模式**：`output: 'export'`
- **路徑配置**：自動處理 GitHub Pages 的子路徑
- **圖片優化**：停用以支援靜態部署
- **尾隨斜線**：確保路由正確運作

### GitHub Actions 工作流程

`.github/workflows/deploy.yml` 包含：

- Node.js 18 環境設定
- 依賴套件安裝
- 專案建置
- 自動部署到 GitHub Pages

### 檔案結構

```
taiwan-gpa-calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署工作流程
├── public/
│   └── .nojekyll              # 避免 Jekyll 處理
├── out/                       # 建置輸出目錄（自動生成）
├── next.config.ts             # Next.js 配置（已修改）
└── package.json               # 新增部署指令
```

## 🔧 本地測試

在推送到 GitHub 之前，您可以本地測試建置：

```bash
# 建置專案
npm run build

# 檢查 out/ 目錄是否正確生成
ls -la out/

# 可選：使用簡單的 HTTP 伺服器測試
npx serve out
```

## 🐛 常見問題排解

### 問題 1：部署失敗

**解決方案：**
1. 檢查 GitHub Actions 的執行日誌
2. 確認 Node.js 版本相容性
3. 檢查 package.json 中的依賴套件

### 問題 2：頁面顯示 404

**解決方案：**
1. 確認 GitHub Pages 設定為 "GitHub Actions"
2. 檢查 `basePath` 配置是否正確
3. 確認 `.nojekyll` 檔案存在

### 問題 3：CSS 或 JS 檔案載入失敗

**解決方案：**
1. 檢查 `assetPrefix` 配置
2. 確認相對路徑設定正確
3. 檢查瀏覽器開發者工具的網路標籤

### 問題 4：圖片無法顯示

**解決方案：**
1. 確認 `images.unoptimized: true` 已設定
2. 使用相對路徑引用圖片
3. 將圖片放在 `public/` 目錄下

## 📝 自訂網域（可選）

如果您有自訂網域：

1. 在儲存庫根目錄建立 `CNAME` 檔案
2. 在檔案中輸入您的網域名稱
3. 在 DNS 設定中新增 CNAME 記錄指向 `YOUR_USERNAME.github.io`

## 🔄 更新部署

要更新已部署的網站：

```bash
# 修改程式碼後
git add .
git commit -m "更新功能"
git push origin main
```

GitHub Actions 會自動重新建置和部署。

## 📊 監控部署狀態

1. 前往儲存庫的 **Actions** 標籤
2. 查看最新的工作流程執行狀態
3. 點擊特定執行來查看詳細日誌

---

**注意：** 首次部署可能需要幾分鐘時間。後續更新通常會更快完成。
