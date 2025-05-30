# GitHub Pages 部署檢查清單

## ✅ 已完成的配置

### 1. Next.js 配置 (`next.config.ts`)
- [x] 啟用靜態導出：`output: 'export'`
- [x] 設定基礎路徑：`basePath: '/taiwan-gpa-calculator'`
- [x] 設定資源前綴：`assetPrefix: '/taiwan-gpa-calculator/'`
- [x] 啟用尾隨斜線：`trailingSlash: true`
- [x] 停用圖片優化：`images.unoptimized: true`

### 2. GitHub Actions 工作流程 (`.github/workflows/deploy.yml`)
- [x] 設定 Node.js 18 環境
- [x] 安裝依賴套件
- [x] 執行建置
- [x] 配置 GitHub Pages 權限
- [x] 上傳建置產物
- [x] 自動部署

### 3. 專案檔案
- [x] 新增 `public/.nojekyll` 檔案
- [x] 更新 `package.json` 新增部署指令
- [x] 更新 `README.md` 新增部署說明
- [x] 建立 `DEPLOYMENT.md` 詳細指南

### 4. 建置測試
- [x] 本地建置成功
- [x] 靜態檔案正確生成到 `out/` 目錄
- [x] HTML 檔案包含正確的路徑前綴

## 📋 部署前檢查清單

在推送到 GitHub 之前，請確認：

### GitHub 儲存庫設定
- [ ] 已在 GitHub 建立儲存庫
- [ ] 儲存庫名稱為 `taiwan-gpa-calculator`（或更新 `basePath` 配置）
- [ ] 本地程式碼已推送到 `main` 分支

### GitHub Pages 設定
- [ ] 前往儲存庫 Settings > Pages
- [ ] Source 設定為 "GitHub Actions"
- [ ] 儲存設定

### 檔案檢查
- [ ] `.github/workflows/deploy.yml` 存在
- [ ] `public/.nojekyll` 存在
- [ ] `next.config.ts` 包含正確配置
- [ ] `package.json` 包含部署指令

## 🚀 部署步驟

1. **推送程式碼**
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   git push origin main
   ```

2. **監控部署**
   - 前往 GitHub 儲存庫的 Actions 標籤
   - 查看工作流程執行狀態
   - 等待部署完成（通常需要 2-5 分鐘）

3. **驗證部署**
   - 前往 `https://YOUR_USERNAME.github.io/taiwan-gpa-calculator/`
   - 確認網站正常載入
   - 測試所有功能是否正常運作

## 🔧 故障排除

### 常見問題
1. **404 錯誤**
   - 檢查 GitHub Pages 設定
   - 確認 `basePath` 配置正確

2. **資源載入失敗**
   - 檢查 `assetPrefix` 配置
   - 確認 `.nojekyll` 檔案存在

3. **建置失敗**
   - 檢查 GitHub Actions 日誌
   - 確認所有依賴套件正確安裝

### 除錯指令
```bash
# 本地測試建置
npm run build

# 檢查輸出檔案
ls -la out/

# 本地測試靜態檔案
npx serve out
```

## 📝 注意事項

- 首次部署可能需要較長時間
- 每次推送到 `main` 分支都會觸發重新部署
- 確保所有敏感資訊都已從程式碼中移除
- 建議在部署前進行本地測試

## 🎉 部署完成後

部署成功後，您的台灣 GPA 計算機將可在以下網址存取：
```
https://YOUR_USERNAME.github.io/taiwan-gpa-calculator/
```

記得將 `YOUR_USERNAME` 替換為您的 GitHub 使用者名稱。
