# 🎮 React + TypeScript Mini Game Hub

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.0-green?logo=vite)

A modular mini-game platform built with **React + TypeScript**,  
designed to demonstrate **component architecture, custom hooks, and scalable frontend design** through playable games.

一個使用 **React + TypeScript** 實作的「小遊戲中心」，  
透過可玩的遊戲示範 **元件架構、Custom Hook 與可擴充前端設計**。

---

## ✨ Highlights / 專案亮點

- Feature-based project structure / 功能導向資料夾架構
- Custom Hooks for game logic separation / 遊戲邏輯使用 Custom Hook 拆分
- Type-safe design with TypeScript / TypeScript 型別安全
- Easily extensible game registry / 可擴充遊戲註冊表
- Single-page multi-game experience / 單頁多遊戲切換

---

## 🕹️ Implemented Games / 已實作遊戲

### 🎲 Tetris / 俄羅斯方塊

- Color-coded tetrominoes / 顏色區分
- Keyboard controls (move, rotate, soft drop) / 鍵盤操作
- Hard Drop (Space key) / 空白鍵瞬間下落
- Line clearing logic / 消行邏輯
- Game Over detection / 遊戲結束判定

### 👾 Click Monster / 點擊怪物

- Randomly moving target / 隨機移動怪物
- Time-limited gameplay / 限時遊戲
- Score tracking / 計分
- Game state control (start / end) / 遊戲狀態控制

---

## 📁 Project Structure / 專案結構

```txt
src/
├─ games/
│  ├─ tetris/
│  │  ├─ TetrisGame.tsx
│  │  ├─ useTetris.ts
│  │  ├─ BoardView.tsx
│  │  └─ types.ts
│  │
│  ├─ clickMonster/
│  │  ├─ ClickMonsterGame.tsx
│  │  ├─ useClickMonster.ts
│  │  └─ types.ts
│  │
│  └─ index.ts
├─ pages/
│  └─ GameHub.tsx
├─ App.tsx
└─ main.tsx
```
