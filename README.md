# Mini Game Collection 🎮

迷你遊戲集合平台（React + TypeScript + Vite）

A mini game collection built with **React + TypeScript + Vite + Tailwind CSS**.

---

## 🔗 Demo / 線上展示

https://chunwei0312.github.io/Mini-Game/

---

## 📖 專案介紹 | Project Overview

這是一個使用 **React、TypeScript、Vite 與 Tailwind CSS** 開發的迷你遊戲平台，  
目前包含 **俄羅斯方塊（Tetris）** 與 **點擊怪物（Click Monster）**，  
並已成功部署至 **GitHub Pages**，支援桌機與手機操作。

This project is a mini game collection built with **React, TypeScript, Vite, and Tailwind CSS**.  
It currently includes **Tetris** and **Click Monster**, and is deployed on **GitHub Pages**.  
The application supports both **desktop and mobile interactions**.

---

## ✨ 專案特色 | Features

- ⚛️ React 18 + TypeScript
- ⚡ Vite with fast HMR
- 🎨 Tailwind CSS responsive UI
- 📱 Desktop & mobile support (keyboard + touch)
- 🧩 Multi-game architecture, easy to extend
- 🚀 Deployed with GitHub Pages

---

## 🛠 使用技術 | Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub Pages

---

## 🎮 遊戲內容 | Games Included

### 📱 俄羅斯方塊（Tetris）

**功能特色/Features：**

- 鍵盤操作（左右移動、旋轉、快速下落）| Keyboard controls (move, rotate, hard drop)
- 手機觸控與滑動手勢 | Touch and swipe gestures on mobile
- 下一個方塊預覽（Next）| Next piece preview
- 分數、行數、等級與加速機制 | Score, lines, and level-based speed
- Game Over 與重新開始 | Game over and restart
- 可返回主畫面 | Back to main menu

### ⌨️ 操作說明 | Controls (Tetris)

**桌機 | Desktop**

- ← →：左右移動 / Move left & right

- ↑：旋轉 / Rotate

- ↓：直接落到底 / Hard drop

- Space(空白鍵)：交換下一個方塊 / Swap next piece

**手機 | Mobile**

- 左右滑動：左右移動 / Swipe left & right

- 上滑：旋轉 / Swipe up to rotate

- 下滑：快速落下 / Swipe down to drop

- 螢幕按鈕操作 / On-screen controls

---

### 👾 點擊怪物（Click Monster）

**功能特色 | Features：**

- 倒數計時制 | Countdown timer
- 怪物隨機位置移動 | Random monster position
- 點擊計分 | Click-based scoring
- 可重新開始與返回主畫面 | Restart and back to main menu

---

## 🧱 專案結構 | Project Structure

```text
src/
├─ components/        # 共用元件 / Shared components
├─ pages/             # 主畫面 / Main pages
├─ games/
│  ├─ tetris/         # 俄羅斯方塊
│  └─ clickMonster/   # 點擊怪物
├─ index.css          # Tailwind & global styles
├─ main.tsx
└─ App.tsx
```

## 🚀 開發與啟動 | Development

**安裝依賴 | Install dependencies**

```
npm install
```

**本地開發 | Run locally**

```
npm run dev
```

**建置專案 | Build project**

```
npm run build
```

**部署到 GitHub Pages | Deploy to GitHub Pages**

```
npm run deploy
```
