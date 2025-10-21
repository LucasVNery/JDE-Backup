import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const ProgressScreen = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Progresso - O Código da Vida</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      padding: 20px;
      overflow: hidden;
      height: 100vh;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 10px;
    }

    .container::-webkit-scrollbar {
      width: 8px;
    }

    .container::-webkit-scrollbar-track {
      background: #21262d;
      border-radius: 4px;
    }

    .container::-webkit-scrollbar-thumb {
      background: #30363d;
      border-radius: 4px;
    }

    .container::-webkit-scrollbar-thumb:hover {
      background: #484f58;
    }

    /* Background decorativo */
    .background-decor {
      position: fixed;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0;
      pointer-events: none;
    }

    .decor1 {
      top: 100px;
      left: 50px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
    }

    .decor2 {
      bottom: 200px;
      right: 50px;
      width: 180px;
      height: 180px;
      background: radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent);
    }

    .decor3 {
      top: 50%;
      right: 10%;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent);
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(48, 54, 61, 0.5);
      opacity: 0;
    }

    .trophy-icon {
      font-size: 32px;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .header-title {
      font-size: 28px;
      font-weight: 600;
      color: #f0f6fc;
      flex: 1;
    }

    /* Status Container */
    .status-container {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 24px;
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 32px;
      border: 1px solid #30363d;
      opacity: 0;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .status-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent);
      opacity: 0.5;
    }

    .version-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .version-label {
      font-size: 12px;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .version-number {
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }

    .ips-value {
      font-size: 14px;
      color: #58a6ff;
      font-weight: 500;
      background: rgba(88, 166, 255, 0.1);
      padding: 4px 12px;
      border-radius: 12px;
      display: inline-block;
      width: fit-content;
    }

    .quality-circle {
      position: relative;
      width: 120px;
      height: 120px;
    }

    .quality-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .quality-number {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }

    .quality-label {
      font-size: 11px;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    /* Section */
    .section {
      margin-bottom: 32px;
      opacity: 0;
    }

    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #f0f6fc;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::before {
      content: '';
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #3b82f6, #8b5cf6);
      border-radius: 2px;
    }

    /* Phase Container */
    .phase-container {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #30363d;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }

    .phase-container:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .phase-progress-bar {
      width: 100%;
      height: 12px;
      background: #21262d;
      border-radius: 6px;
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .phase-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 6px;
      width: 0;
      transition: width 1.5s ease-out;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    }

    .phase-text {
      font-size: 14px;
      color: #8b949e;
      text-align: center;
      font-weight: 500;
    }

    /* Epic Card */
    .epic-card {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #30363d;
      margin-bottom: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .epic-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .epic-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
      border-color: currentColor;
    }

    .epic-card:hover::before {
      opacity: 1;
    }

    .epic-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .epic-name {
      font-size: 15px;
      font-weight: 600;
      color: #f0f6fc;
    }

    .epic-status {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.05);
    }

    .epic-progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .epic-progress-background {
      flex: 1;
      height: 8px;
      background: #21262d;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .epic-progress-fill {
      height: 100%;
      border-radius: 4px;
      width: 0;
      transition: width 1.5s ease-out;
      box-shadow: 0 0 10px currentColor;
    }

    .epic-progress-text {
      font-size: 13px;
      color: #ffffff;
      font-weight: 600;
      min-width: 40px;
      text-align: right;
    }

    /* Skill Card */
    .skill-card {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #30363d;
      margin-bottom: 12px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .skill-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .skill-name {
      font-size: 14px;
      font-weight: 600;
      color: #f0f6fc;
      margin-bottom: 12px;
    }

    .skill-level-container {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
    }

    .skill-level {
      width: 24px;
      height: 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .skill-level.filled {
      box-shadow: 0 0 8px currentColor;
    }

    .skill-level-text {
      font-size: 12px;
      color: #8b949e;
      font-weight: 500;
    }

    /* Badge Card */
    .badges-scroll-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 12px;
      margin: 0 -20px;
      padding-left: 20px;
      padding-right: 20px;
      -webkit-overflow-scrolling: touch;
    }

    .badges-scroll-wrapper::-webkit-scrollbar {
      height: 8px;
    }

    .badges-scroll-wrapper::-webkit-scrollbar-track {
      background: #21262d;
      border-radius: 4px;
    }

    .badges-scroll-wrapper::-webkit-scrollbar-thumb {
      background: #30363d;
      border-radius: 4px;
    }

    .badges-scroll-wrapper::-webkit-scrollbar-thumb:hover {
      background: #484f58;
    }

    .badges-container {
      display: flex;
      gap: 16px;
      width: max-content;
    }

    .badge-card {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 16px;
      padding: 16px;
      border: 1px solid #30363d;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 180px;
      min-width: 150px;
      max-width: 150px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      flex-shrink: 0;
    }

    .badge-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .badge-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }

    .badge-card.unlocked:hover::before {
      opacity: 1;
    }

    .badge-card.unlocked {
      opacity: 1;
    }

    .badge-card.locked {
      opacity: 0.5;
    }

    .badge-rarity {
      padding: 4px 10px;
      border-radius: 10px;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #000000;
      letter-spacing: 0.5px;
    }

    .badge-icon-container {
      position: relative;
      margin: 8px 0;
    }

    .badge-icon {
      font-size: 40px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .badge-unlocked-indicator {
      position: absolute;
      top: -6px;
      right: -6px;
      background: #10b981;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
    }

    .badge-name {
      font-size: 12px;
      color: #f0f6fc;
      text-align: center;
      font-weight: 600;
      line-height: 1.3;
      min-height: 32px;
      display: flex;
      align-items: center;
    }

    .badge-progress-bar {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .badge-progress-fill {
      height: 100%;
      border-radius: 2px;
      width: 0;
      transition: width 1s ease-out;
      box-shadow: 0 0 6px currentColor;
    }

    .badge-progress-text {
      font-size: 10px;
      color: #8b949e;
      font-weight: 600;
    }

    /* Commit Graph */
    .commit-graph-container {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #30363d;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .commit-graph-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .commit-graph-title {
      font-size: 16px;
      font-weight: 600;
      color: #f0f6fc;
    }

    .commit-legend {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #8b949e;
    }

    .legend-box {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .commit-grid {
      display: grid;
      grid-template-columns: repeat(28, 1fr);
      gap: 4px;
      margin-bottom: 16px;
    }

    .commit-day {
      aspect-ratio: 1;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .commit-day:hover {
      transform: scale(1.4);
      box-shadow: 0 0 16px currentColor;
      z-index: 10;
      border-color: currentColor;
    }

    .commit-day.has-commits {
      color: #10b981;
    }

    .commit-graph-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid #30363d;
    }

    .commit-stats {
      font-size: 12px;
      color: #8b949e;
      font-weight: 500;
    }

    .commit-streak {
      font-size: 12px;
      color: #58a6ff;
      font-weight: 600;
    }

    /* Sparkles effect */
    .sparkle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .modal-overlay.active {
      display: flex;
      opacity: 1;
    }

    .modal-content {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border-radius: 20px;
      padding: 32px;
      max-width: 500px;
      width: 100%;
      border: 2px solid #30363d;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }

    .modal-overlay.active .modal-content {
      transform: scale(1);
    }

    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #30363d;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 18px;
      color: #8b949e;
    }

    .modal-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #f0f6fc;
      transform: rotate(90deg);
    }

    .modal-badge-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #30363d;
    }

    .modal-badge-icon-wrapper {
      position: relative;
      margin-bottom: 16px;
    }

    .modal-badge-icon {
      font-size: 72px;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
    }

    .modal-badge-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      opacity: 0.3;
      filter: blur(30px);
    }

    .modal-badge-rarity {
      padding: 6px 16px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #000000;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }

    .modal-badge-title {
      font-size: 24px;
      font-weight: 700;
      color: #f0f6fc;
      text-align: center;
      margin-bottom: 8px;
    }

    .modal-badge-description {
      font-size: 14px;
      color: #8b949e;
      text-align: center;
      line-height: 1.6;
    }

    .modal-badge-status {
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 20px;
    }

    .modal-badge-status.unlocked {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .modal-badge-status.locked {
      background: rgba(139, 148, 158, 0.1);
      border: 1px solid rgba(139, 148, 158, 0.2);
    }

    .modal-badge-status-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .modal-badge-status-text {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .modal-badge-status.unlocked .modal-badge-status-text {
      color: #10b981;
    }

    .modal-badge-status.locked .modal-badge-status-text {
      color: #8b949e;
    }

    .modal-badge-status-date {
      font-size: 12px;
      color: #8b949e;
    }

    .modal-badge-progress {
      margin-top: 16px;
    }

    .modal-badge-progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .modal-badge-progress-label {
      font-size: 12px;
      color: #8b949e;
      font-weight: 600;
    }

    .modal-badge-progress-value {
      font-size: 12px;
      color: #f0f6fc;
      font-weight: 600;
    }

    .modal-badge-progress-bar {
      height: 8px;
      background: #21262d;
      border-radius: 4px;
      overflow: hidden;
    }

    .modal-badge-progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.6s ease-out;
      box-shadow: 0 0 10px currentColor;
    }

    .modal-commit-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #30363d;
    }

    .modal-commit-day-indicator {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      flex-shrink: 0;
    }

    .modal-commit-info h3 {
      font-size: 18px;
      color: #f0f6fc;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .modal-commit-info p {
      font-size: 12px;
      color: #8b949e;
    }

    .modal-commit-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .modal-commit-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 12px;
      transition: all 0.2s ease;
    }

    .modal-commit-item:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(4px);
    }

    .modal-commit-type {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 6px;
      color: #000000;
    }

    .modal-commit-message {
      font-size: 13px;
      color: #f0f6fc;
      line-height: 1.5;
      font-family: 'SF Mono', Monaco, monospace;
    }

    /* Responsive */
    @media (max-width: 600px) {
      body {
        padding: 16px;
      }

      .status-container {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .quality-circle {
        margin: 0 auto;
      }

      .badges-container {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      }

      .commit-grid {
        grid-template-columns: repeat(14, 1fr);
      }

      .header-title {
        font-size: 22px;
      }
    }
  </style>
</head>
<body>
  <div class="background-decor decor1"></div>
  <div class="background-decor decor2"></div>
  <div class="background-decor decor3"></div>

  <div class="container">
    <!-- Header -->
    <div class="header">
    </div>

    <!-- Status Container -->
    <div class="status-container">
      <div class="version-container">
        <div class="version-label">Versão Atual</div>
        <div class="version-number">v0.2.15.42</div>
        <div class="ips-value">IPS: 167,210</div>
      </div>
      <div class="quality-circle">
        <svg width="120" height="120">
          <circle cx="60" cy="60" r="50" stroke="rgba(59, 130, 246, 0.1)" stroke-width="8" fill="none"/>
          <circle id="qualityCircle" cx="60" cy="60" r="50" stroke="#3b82f6" stroke-width="8" fill="none"
                  stroke-dasharray="314" stroke-dashoffset="314" stroke-linecap="round"
                  transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1.5s ease-out"/>
        </svg>
        <div class="quality-center">
          <div class="quality-number" id="iqbNumber">0.0</div>
          <div class="quality-label">IQB</div>
        </div>
      </div>
    </div>

    <!-- Phase Section -->
    <div class="section" id="phaseSection">
      <h2 class="section-title">Fase Atual - 2º Semestre</h2>
      <div class="phase-container">
        <div class="phase-progress-bar">
          <div class="phase-progress-fill" id="phaseFill"></div>
        </div>
        <div class="phase-text">2/8 semestres</div>
      </div>
    </div>

    <!-- Epics Section -->
    <div class="section" id="epicsSection">
      <h2 class="section-title">Épicos - Disciplinas</h2>
      <div id="epicsContainer"></div>
    </div>

    <!-- Skills Section -->
    <div class="section" id="skillsSection">
      <h2 class="section-title">Habilidades & Competências</h2>
      <div id="skillsContainer"></div>
    </div>

    <!-- Badges Section -->
    <div class="section" id="badgesSection">
      <h2 class="section-title">Insígnias Conquistadas</h2>
      <div class="badges-scroll-wrapper">
        <div class="badges-container" id="badgesContainer"></div>
      </div>
    </div>

    <!-- Commit Graph Section -->
    <div class="section" id="commitSection">
      <h2 class="section-title">Histórico de Commits</h2>
      <div class="commit-graph-container">
        <div class="commit-graph-header">
          <div class="commit-graph-title">Últimas 4 semanas</div>
          <div class="commit-legend">
            <div class="legend-item">
              <div class="legend-box" style="background: rgba(255, 255, 255, 0.1)"></div>
              <span>0</span>
            </div>
            <div class="legend-item">
              <div class="legend-box" style="background: #0d4429"></div>
              <span>1-2</span>
            </div>
            <div class="legend-item">
              <div class="legend-box" style="background: #006d32"></div>
              <span>3-4</span>
            </div>
            <div class="legend-item">
              <div class="legend-box" style="background: #00a83a"></div>
              <span>5+</span>
            </div>
          </div>
        </div>
        <div class="commit-grid" id="commitGrid"></div>
        <div class="commit-graph-footer">
          <div class="commit-stats">42 commits neste semestre</div>
          <div class="commit-streak">🔥 Sequência: 5 dias</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Badge Modal -->
  <div class="modal-overlay" id="badgeModal">
    <div class="modal-content">
      <div class="modal-close" onclick="closeBadgeModal()">✕</div>
      <div id="badgeModalContent"></div>
    </div>
  </div>

  <!-- Commit Modal -->
  <div class="modal-overlay" id="commitModal">
    <div class="modal-content">
      <div class="modal-close" onclick="closeCommitModal()">✕</div>
      <div id="commitModalContent"></div>
    </div>
  </div>

  <script>
    const studentData = {
      epics: [
        { name: 'Algoritmos e Programação', progress: 100, status: 'completed', color: '#10b981' },
        { name: 'Fundamentos de BD', progress: 78, status: 'in_progress', color: '#3b82f6' },
        { name: 'Estruturas de Dados', progress: 45, status: 'in_progress', color: '#8b5cf6' },
        { name: 'Interface Humano-Comp.', progress: 0, status: 'locked', color: '#6b7280' },
      ],
      skills: [
        { name: 'Pensamento Lógico', level: 8, maxLevel: 10, color: '#3b82f6' },
        { name: 'Resolução de Problemas', level: 6, maxLevel: 10, color: '#8b5cf6' },
        { name: 'Comunicação Técnica', level: 4, maxLevel: 10, color: '#ec4899' },
        { name: 'Trabalho em Equipe', level: 5, maxLevel: 10, color: '#10b981' },
      ],
      badges: [
        {
          name: 'Primeiro Algoritmo',
          unlocked: true,
          icon: '🎯',
          rarity: 'common',
          color: '#9ca3af',
          progress: { current: 1, target: 1 },
          description: 'Complete seu primeiro algoritmo com sucesso',
          unlockedAt: '2024-01-15'
        },
        {
          name: 'Caçador de Bugs',
          unlocked: true,
          icon: '🐛',
          rarity: 'uncommon',
          color: '#10b981',
          progress: { current: 15, target: 10 },
          description: 'Corrija 10 bugs no seu código',
          unlockedAt: '2024-01-28'
        },
        {
          name: 'Otimizador',
          unlocked: false,
          icon: '⚡',
          rarity: 'rare',
          color: '#3b82f6',
          progress: { current: 2, target: 5 },
          description: 'Otimize o desempenho de 5 algoritmos'
        },
        {
          name: 'Mestre dos Dados',
          unlocked: false,
          icon: '📊',
          rarity: 'rare',
          color: '#3b82f6',
          progress: { current: 3, target: 7 },
          description: 'Domine 7 estruturas de dados diferentes'
        },
        {
          name: 'Full Stack',
          unlocked: true,
          icon: '🔄',
          rarity: 'uncommon',
          color: '#10b981',
          progress: { current: 1, target: 1 },
          description: 'Integre entrada, processamento e saída',
          unlockedAt: '2024-02-01'
        },
        {
          name: 'Multitarefa',
          unlocked: false,
          icon: '🤝',
          rarity: 'common',
          color: '#9ca3af',
          progress: { current: 2, target: 5 },
          description: 'Trabalhe em 5 projetos em equipe'
        },
        {
          name: 'Maratonista',
          unlocked: false,
          icon: '🏃',
          rarity: 'epic',
          color: '#8b5cf6',
          progress: { current: 12, target: 30 },
          description: 'Complete 30 dias consecutivos de commits'
        },
        {
          name: 'Code Master',
          unlocked: false,
          icon: '👨‍💻',
          rarity: 'legendary',
          color: '#f59e0b',
          progress: { current: 0, target: 1 },
          description: 'Alcance a excelência em todas as áreas'
        },
      ],
      commitHistory: [
        { date: '2024-02-01', count: 3, messages: [
          { type: 'feat', context: 'ALG', message: 'adicionar ordenação bubble sort' },
          { type: 'fix', context: 'ALG', message: 'corrigir loop infinito' },
          { type: 'docs', context: 'ALG', message: 'atualizar documentação' }
        ]},
        { date: '2024-02-02', count: 1, messages: [
          { type: 'test', context: 'FBD', message: 'adicionar testes unitários' }
        ]},
        { date: '2024-02-03', count: 4, messages: [
          { type: 'feat', context: 'FBD', message: 'criar modelagem ER' },
          { type: 'feat', context: 'FBD', message: 'implementar normalização' },
          { type: 'fix', context: 'FBD', message: 'corrigir foreign keys' },
          { type: 'docs', context: 'FBD', message: 'documentar relacionamentos' }
        ]},
        { date: '2024-02-04', count: 2, messages: [
          { type: 'feat', context: 'ED', message: 'implementar pilha' },
          { type: 'feat', context: 'ED', message: 'implementar fila' }
        ]},
        { date: '2024-02-05', count: 0, messages: [] },
        { date: '2024-02-06', count: 3, messages: [
          { type: 'feat', context: 'ED', message: 'adicionar lista ligada' },
          { type: 'test', context: 'ED', message: 'testar estruturas' },
          { type: 'refactor', context: 'ED', message: 'refatorar código' }
        ]},
        { date: '2024-02-07', count: 5, messages: [
          { type: 'feat', context: 'ALG', message: 'implementar quick sort' },
          { type: 'feat', context: 'ALG', message: 'adicionar merge sort' },
          { type: 'test', context: 'ALG', message: 'comparar performance' },
          { type: 'docs', context: 'ALG', message: 'documentar complexidade' },
          { type: 'style', context: 'ALG', message: 'formatar código' }
        ]},
        { date: '2024-02-08', count: 2, messages: [
          { type: 'fix', context: 'FBD', message: 'corrigir query SQL' },
          { type: 'perf', context: 'FBD', message: 'otimizar índices' }
        ]},
        { date: '2024-02-09', count: 1, messages: [
          { type: 'chore', context: 'GERAL', message: 'atualizar dependências' }
        ]},
        { date: '2024-02-10', count: 0, messages: [] },
        { date: '2024-02-11', count: 4, messages: [
          { type: 'feat', context: 'ED', message: 'implementar árvore binária' },
          { type: 'feat', context: 'ED', message: 'adicionar busca em árvore' },
          { type: 'test', context: 'ED', message: 'testar travessias' },
          { type: 'docs', context: 'ED', message: 'documentar árvore' }
        ]},
        { date: '2024-02-12', count: 3, messages: [
          { type: 'feat', context: 'ALG', message: 'implementar busca binária' },
          { type: 'test', context: 'ALG', message: 'testar busca' },
          { type: 'docs', context: 'ALG', message: 'adicionar exemplos' }
        ]},
        { date: '2024-02-13', count: 2, messages: [
          { type: 'fix', context: 'ED', message: 'corrigir balanceamento' },
          { type: 'refactor', context: 'ED', message: 'melhorar estrutura' }
        ]},
        { date: '2024-02-14', count: 1, messages: [
          { type: 'docs', context: 'GERAL', message: 'atualizar README' }
        ]},
        { date: '2024-02-15', count: 3, messages: [
          { type: 'feat', context: 'FBD', message: 'criar stored procedures' },
          { type: 'test', context: 'FBD', message: 'testar procedures' },
          { type: 'docs', context: 'FBD', message: 'documentar SQL' }
        ]},
        { date: '2024-02-16', count: 4, messages: [
          { type: 'feat', context: 'ALG', message: 'implementar dijkstra' },
          { type: 'feat', context: 'ALG', message: 'adicionar grafo' },
          { type: 'test', context: 'ALG', message: 'testar caminhos' },
          { type: 'perf', context: 'ALG', message: 'otimizar algoritmo' }
        ]},
        { date: '2024-02-17', count: 0, messages: [] },
        { date: '2024-02-18', count: 2, messages: [
          { type: 'fix', context: 'ED', message: 'corrigir heap' },
          { type: 'test', context: 'ED', message: 'adicionar casos teste' }
        ]},
        { date: '2024-02-19', count: 3, messages: [
          { type: 'feat', context: 'ALG', message: 'implementar DFS' },
          { type: 'feat', context: 'ALG', message: 'implementar BFS' },
          { type: 'docs', context: 'ALG', message: 'documentar travessias' }
        ]},
        { date: '2024-02-20', count: 1, messages: [
          { type: 'style', context: 'GERAL', message: 'aplicar linter' }
        ]},
        { date: '2024-02-21', count: 4, messages: [
          { type: 'feat', context: 'FBD', message: 'implementar triggers' },
          { type: 'feat', context: 'FBD', message: 'adicionar views' },
          { type: 'test', context: 'FBD', message: 'testar integridade' },
          { type: 'docs', context: 'FBD', message: 'documentar schema' }
        ]},
        { date: '2024-02-22', count: 2, messages: [
          { type: 'refactor', context: 'ALG', message: 'simplificar código' },
          { type: 'perf', context: 'ALG', message: 'melhorar cache' }
        ]},
        { date: '2024-02-23', count: 3, messages: [
          { type: 'feat', context: 'ED', message: 'implementar hash table' },
          { type: 'test', context: 'ED', message: 'testar colisões' },
          { type: 'docs', context: 'ED', message: 'explicar hashing' }
        ]},
        { date: '2024-02-24', count: 1, messages: [
          { type: 'chore', context: 'GERAL', message: 'limpar código antigo' }
        ]},
        { date: '2024-02-25', count: 2, messages: [
          { type: 'fix', context: 'FBD', message: 'corrigir transação' },
          { type: 'test', context: 'FBD', message: 'testar rollback' }
        ]},
        { date: '2024-02-26', count: 0, messages: [] },
        { date: '2024-02-27', count: 3, messages: [
          { type: 'feat', context: 'ALG', message: 'implementar A*' },
          { type: 'test', context: 'ALG', message: 'comparar algoritmos' },
          { type: 'docs', context: 'ALG', message: 'adicionar benchmarks' }
        ]},
        { date: '2024-02-28', count: 4, messages: [
          { type: 'feat', context: 'PROJETO', message: 'iniciar projeto final' },
          { type: 'feat', context: 'PROJETO', message: 'configurar ambiente' },
          { type: 'docs', context: 'PROJETO', message: 'escrever proposta' },
          { type: 'chore', context: 'PROJETO', message: 'setup repositório' }
        ]}
      ]
    };

    function initAnimations() {
      // Animar backgrounds com movimento contínuo
      anime({
        targets: '.background-decor',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 2000,
        delay: anime.stagger(300),
        easing: 'easeOutExpo'
      });

      anime({
        targets: '.decor1',
        translateX: [0, 40],
        translateY: [0, 30],
        duration: 10000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      anime({
        targets: '.decor2',
        translateX: [0, -30],
        translateY: [0, 40],
        duration: 12000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      anime({
        targets: '.decor3',
        translateX: [0, 25],
        translateY: [0, -35],
        duration: 11000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      // Animar header
      anime({
        targets: '.header',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
      });

      // Animar status container
      anime({
        targets: '.status-container',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 1200,
        delay: 400,
        easing: 'easeOutExpo'
      });

      // Animar IQB com counter
      setTimeout(() => {
        const circle = document.getElementById('qualityCircle');
        const iqbText = document.getElementById('iqbNumber');
        const targetIQB = 87.3;
        const circumference = 314;
        const offset = circumference - (targetIQB / 100) * circumference;

        circle.style.strokeDashoffset = offset;

        anime({
          targets: { value: 0 },
          value: targetIQB,
          duration: 1500,
          easing: 'easeOutExpo',
          update: function(anim) {
            iqbText.textContent = anim.animations[0].currentValue.toFixed(1);
          }
        });
      }, 800);

      // Animar phase fill
      setTimeout(() => {
        document.getElementById('phaseFill').style.width = '25%';
      }, 1000);

      // Animar seções com stagger
      anime({
        targets: '.section',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        delay: anime.stagger(150, {start: 1200}),
        easing: 'easeOutExpo'
      });
    }

    function renderEpics() {
      const container = document.getElementById('epicsContainer');
      studentData.epics.forEach((epic, index) => {
        const card = document.createElement('div');
        card.className = 'epic-card';
        card.style.opacity = epic.status === 'locked' ? '0.5' : '1';
        card.style.color = epic.color;

        const statusIcon =
          epic.status === 'completed' ? '✓' :
          epic.status === 'in_progress' ? '⚡' : '🔒';

        const statusText =
          epic.status === 'completed' ? 'Concluído' :
          epic.status === 'in_progress' ? 'Em andamento' : 'Bloqueado';

        card.innerHTML = \`
          <div class="epic-header">
            <div class="epic-name">\${epic.name}</div>
            <div class="epic-status" style="color: \${epic.color}">
              <span>\${statusIcon}</span>
              <span>\${statusText}</span>
            </div>
          </div>
          <div class="epic-progress-container">
            <div class="epic-progress-background">
              <div class="epic-progress-fill" data-progress="\${epic.progress}" style="background-color: \${epic.color}; color: \${epic.color}"></div>
            </div>
            <div class="epic-progress-text">\${epic.progress}%</div>
          </div>
        \`;

        container.appendChild(card);

        setTimeout(() => {
          card.querySelector('.epic-progress-fill').style.width = epic.progress + '%';
        }, 1800 + index * 150);
      });

      // Animar cards com elastic
      anime({
        targets: '.epic-card',
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 1800}),
        easing: 'easeOutElastic(1, .6)'
      });
    }

    function renderSkills() {
      const container = document.getElementById('skillsContainer');
      studentData.skills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-card';

        let levelsHtml = '';
        for (let i = 0; i < skill.maxLevel; i++) {
          const filled = i < skill.level ? 'filled' : '';
          const bgColor = i < skill.level ? skill.color : 'rgba(255, 255, 255, 0.1)';
          levelsHtml += \`<div class="skill-level \${filled}" style="background-color: \${bgColor}; color: \${skill.color}"></div>\`;
        }

        card.innerHTML = \`
          <div class="skill-name">\${skill.name}</div>
          <div class="skill-level-container">\${levelsHtml}</div>
          <div class="skill-level-text">\${skill.level}/\${skill.maxLevel}</div>
        \`;

        container.appendChild(card);
      });

      // Animar skill levels individualmente
      anime({
        targets: '.skill-level.filled',
        scale: [0, 1],
        duration: 400,
        delay: anime.stagger(50, {start: 2200}),
        easing: 'easeOutElastic(1, .7)'
      });
    }

    function renderBadges() {
      const container = document.getElementById('badgesContainer');
      studentData.badges.forEach((badge, index) => {
        const card = document.createElement('div');
        card.className = \`badge-card \${badge.unlocked ? 'unlocked' : 'locked'}\`;
        card.style.borderColor = badge.unlocked ? badge.color : '#30363d';
        card.style.borderWidth = badge.unlocked ? '2px' : '1px';
        card.style.color = badge.color;

        const progress = Math.min((badge.progress.current / badge.progress.target) * 100, 100);

        card.innerHTML = \`
          <div class="badge-rarity" style="background-color: \${badge.color}">\${badge.rarity}</div>
          <div class="badge-icon-container">
            <div class="badge-icon">\${badge.icon}</div>
            \${badge.unlocked ? '<div class="badge-unlocked-indicator">✓</div>' : ''}
          </div>
          <div class="badge-name">\${badge.name}</div>
          \${!badge.unlocked ? \`
            <div class="badge-progress-bar">
              <div class="badge-progress-fill" data-progress="\${progress}" style="background-color: \${badge.color}; color: \${badge.color}"></div>
            </div>
            <div class="badge-progress-text">\${badge.progress.current}/\${badge.progress.target}</div>
          \` : ''}
        \`;

        card.onclick = () => openBadgeModal(badge);
        container.appendChild(card);

        if (!badge.unlocked) {
          setTimeout(() => {
            card.querySelector('.badge-progress-fill').style.width = progress + '%';
          }, 2600 + index * 80);
        }
      });

      // Animar badges com rotação e scale
      anime({
        targets: '.badge-card',
        scale: [0.7, 1],
        opacity: [0, el => el.classList.contains('unlocked') ? 1 : 0.5],
        duration: 800,
        delay: anime.stagger(100, {start: 2600}),
        easing: 'easeOutElastic(1, .6)'
      });

      // Animar ícones apenas na inicialização
      anime({
        targets: '.badge-icon',
        scale: [0, 1],
        duration: 600,
        delay: anime.stagger(120, {start: 2800}),
        easing: 'easeOutElastic(1, .6)'
      });
    }

    function renderCommitGraph() {
      const container = document.getElementById('commitGrid');
      studentData.commitHistory.forEach((commitData, index) => {
        const day = document.createElement('div');
        day.className = 'commit-day';

        const count = commitData.count;
        const bgColor =
          count === 0 ? 'rgba(255, 255, 255, 0.1)' :
          count <= 2 ? '#0d4429' :
          count <= 4 ? '#006d32' : '#00a83a';

        day.style.backgroundColor = bgColor;
        if (count > 0) {
          day.classList.add('has-commits');
        }

        day.onclick = () => {
          if (count > 0) {
            openCommitModal(commitData);
          }
        };

        container.appendChild(day);
      });

      // Animar commit grid com wave effect
      anime({
        targets: '.commit-day',
        scale: [0, 1],
        duration: 500,
        delay: anime.stagger(25, {start: 3000, grid: [28, 1], from: 'first'}),
        easing: 'easeOutElastic(1, .8)'
      });
    }

    // Funções dos Modais
    function getCommitTypeColor(type) {
      const colors = {
        'feat': '#10b981',
        'fix': '#f59e0b',
        'docs': '#3b82f6',
        'test': '#8b5cf6',
        'refactor': '#ec4899',
        'style': '#06b6d4',
        'perf': '#f97316',
        'chore': '#6b7280'
      };
      return colors[type] || '#6b7280';
    }

    function openBadgeModal(badge) {
      const modal = document.getElementById('badgeModal');
      const content = document.getElementById('badgeModalContent');
      const progress = Math.min((badge.progress.current / badge.progress.target) * 100, 100);

      content.innerHTML = \`
        <div class="modal-badge-header">
          <div class="modal-badge-icon-wrapper">
            <div class="modal-badge-glow" style="background: \${badge.color}"></div>
            <div class="modal-badge-icon">\${badge.icon}</div>
          </div>
          <div class="modal-badge-rarity" style="background-color: \${badge.color}">\${badge.rarity}</div>
          <div class="modal-badge-title">\${badge.name}</div>
          <div class="modal-badge-description">\${badge.description}</div>
        </div>

        <div class="modal-badge-status \${badge.unlocked ? 'unlocked' : 'locked'}">
          <div class="modal-badge-status-icon">\${badge.unlocked ? '🎉' : '🔒'}</div>
          <div class="modal-badge-status-text">\${badge.unlocked ? 'Conquista Desbloqueada!' : 'Conquista Bloqueada'}</div>
          \${badge.unlocked && badge.unlockedAt ? \`
            <div class="modal-badge-status-date">Desbloqueada em \${new Date(badge.unlockedAt).toLocaleDateString('pt-BR')}</div>
          \` : ''}

          \${!badge.unlocked ? \`
            <div class="modal-badge-progress">
              <div class="modal-badge-progress-header">
                <div class="modal-badge-progress-label">Progresso</div>
                <div class="modal-badge-progress-value">\${badge.progress.current}/\${badge.progress.target}</div>
              </div>
              <div class="modal-badge-progress-bar">
                <div class="modal-badge-progress-fill" style="width: \${progress}%; background-color: \${badge.color}; color: \${badge.color}"></div>
              </div>
            </div>
          \` : ''}
        </div>
      \`;

      modal.classList.add('active');

      anime({
        targets: '.modal-badge-icon',
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      });
    }

    function closeBadgeModal() {
      const modal = document.getElementById('badgeModal');
      modal.classList.remove('active');
    }

    function openCommitModal(commitData) {
      const modal = document.getElementById('commitModal');
      const content = document.getElementById('commitModalContent');
      const date = new Date(commitData.date);
      const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

      const bgColor = commitData.count <= 2 ? '#0d4429' :
                       commitData.count <= 4 ? '#006d32' : '#00a83a';

      content.innerHTML = \`
        <div class="modal-commit-header">
          <div class="modal-commit-day-indicator" style="background: \${bgColor}">
            \${commitData.count}
          </div>
          <div class="modal-commit-info">
            <h3>\${commitData.count} commit\${commitData.count !== 1 ? 's' : ''}</h3>
            <p>\${formattedDate}</p>
          </div>
        </div>

        <div class="modal-commit-list">
          \${commitData.messages.map(commit => \`
            <div class="modal-commit-item">
              <div class="modal-commit-type" style="background-color: \${getCommitTypeColor(commit.type)}">
                \${commit.type}
              </div>
              <div class="modal-commit-message">\${commit.type}(\${commit.context}): \${commit.message}</div>
            </div>
          \`).join('')}
        </div>
      \`;

      modal.classList.add('active');

      anime({
        targets: '.modal-commit-item',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 400,
        delay: anime.stagger(80),
        easing: 'easeOutExpo'
      });
    }

    function closeCommitModal() {
      const modal = document.getElementById('commitModal');
      modal.classList.remove('active');
    }

    // Fechar modal ao clicar fora
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeBadgeModal();
        closeCommitModal();
      }
    });

    // Interações de click
    function addInteractions() {
      document.querySelectorAll('.epic-card').forEach(card => {
        card.addEventListener('click', () => {
          anime({
            targets: card,
            scale: [1, 0.98, 1],
            duration: 300,
            easing: 'easeInOutQuad'
          });
        });
      });
    }

    // Init
    document.addEventListener('DOMContentLoaded', () => {
      initAnimations();
      renderEpics();
      renderSkills();
      renderBadges();
      renderCommitGraph();
      addInteractions();
    });
  </script>
</body>
</html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ProgressScreen;
