// RankingScreen.js
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const RankingScreen = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Ranking IPS</title>
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
      overflow-x: hidden;
      min-height: 100vh;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      margin-bottom: 32px;
      opacity: 0;
    }
    
    .header-title {
      font-size: 28px;
      font-weight: 600;
      color: #f0f6fc;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .trophy-icon {
      font-size: 32px;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .header-subtitle {
      font-size: 14px;
      color: #8b949e;
      line-height: 1.5;
    }
    
    .stats-summary {
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      opacity: 0;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    
    .summary-item {
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      background: rgba(88, 166, 255, 0.05);
      transition: all 0.3s ease;
    }
    
    .summary-item:hover {
      background: rgba(88, 166, 255, 0.1);
      transform: translateY(-2px);
    }
    
    .summary-value {
      font-size: 32px;
      font-weight: 700;
      color: #58a6ff;
      margin-bottom: 8px;
      text-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
    }
    
    .summary-label {
      font-size: 12px;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
    
    /* PODIUM STYLES */
    .podium-container {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 12px;
      margin-bottom: 40px;
      padding: 20px;
      opacity: 0;
    }
    
    .podium-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .podium-card.first {
      order: 2;
    }
    
    .podium-card.second {
      order: 1;
    }
    
    .podium-card.third {
      order: 3;
    }
    
    .podium-avatar-container {
      position: relative;
      margin-bottom: 12px;
    }
    
    .podium-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 24px;
      color: white;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      border: 4px solid;
      position: relative;
      z-index: 2;
    }
    
    .podium-card.first .podium-avatar {
      width: 100px;
      height: 100px;
      font-size: 32px;
      border-color: #FFD700;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
    }
    
    .podium-card.second .podium-avatar {
      border-color: #C0C0C0;
      box-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
    }
    
    .podium-card.third .podium-avatar {
      border-color: #CD7F32;
      box-shadow: 0 0 20px rgba(205, 127, 50, 0.5);
    }
    
    .crown {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 36px;
      z-index: 3;
      animation: crownFloat 3s ease-in-out infinite;
    }
    
    @keyframes crownFloat {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-8px); }
    }
    
    .podium-medal {
      font-size: 48px;
      margin-bottom: 8px;
      animation: medalSpin 4s ease-in-out infinite;
    }
    
    @keyframes medalSpin {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
    }
    
    .podium-name {
      font-size: 14px;
      font-weight: 600;
      color: #f0f6fc;
      margin-bottom: 4px;
      text-align: center;
    }
    
    .podium-ips {
      font-family: 'Courier New', monospace;
      font-size: 11px;
      color: #8b949e;
      background: #21262d;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    
    .podium-base {
      width: 100px;
      background: linear-gradient(135deg, #161b22 0%, #1c2128 100%);
      border: 2px solid;
      border-radius: 8px 8px 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 8px;
      position: relative;
      overflow: hidden;
    }
    
    .podium-base::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0.5;
    }
    
    .podium-card.first .podium-base {
      height: 140px;
      border-color: #FFD700;
      color: #FFD700;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
    }
    
    .podium-card.second .podium-base {
      height: 110px;
      border-color: #C0C0C0;
      color: #C0C0C0;
      box-shadow: 0 0 20px rgba(192, 192, 192, 0.3);
    }
    
    .podium-card.third .podium-base {
      height: 90px;
      border-color: #CD7F32;
      color: #CD7F32;
      box-shadow: 0 0 20px rgba(205, 127, 50, 0.3);
    }
    
    .podium-rank {
      font-size: 48px;
      font-weight: 900;
      opacity: 0.3;
      margin-bottom: 8px;
    }
    
    .podium-iqb {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .podium-iqb-label {
      font-size: 10px;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .sparkles {
      position: absolute;
      font-size: 16px;
      opacity: 0;
      animation: sparkle 2s ease-in-out infinite;
    }
    
    .sparkles.s1 { top: 10%; left: -10px; animation-delay: 0s; }
    .sparkles.s2 { top: 30%; right: -10px; animation-delay: 0.5s; }
    .sparkles.s3 { bottom: 20%; left: -15px; animation-delay: 1s; }
    .sparkles.s4 { bottom: 40%; right: -15px; animation-delay: 1.5s; }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1); }
    }
    
    .ranking-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .ranking-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      overflow: hidden;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .ranking-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      border-color: #58a6ff;
    }
    
    .card-content {
      padding: 20px;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
    
    .rank-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 50px;
    }
    
    .rank-badge {
      font-size: 24px;
      font-weight: 700;
      color: #8b949e;
      text-align: center;
    }
    
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 20px;
      color: white;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 3px solid #30363d;
      transition: all 0.3s ease;
    }
    
    .ranking-card:hover .avatar {
      transform: scale(1.1) rotate(5deg);
    }
    
    .user-info {
      flex: 1;
      min-width: 0;
    }
    
    .user-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    
    .user-name {
      font-size: 18px;
      font-weight: 600;
      color: #f0f6fc;
    }
    
    .nivel-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 11px;
      font-weight: 600;
      background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(31, 111, 235, 0.3);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .stat-label {
      font-size: 11px;
      color: #8b949e;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .stat-value {
      font-size: 15px;
      font-weight: 600;
      color: #f0f6fc;
    }
    
    .ips-value {
      font-family: 'Courier New', monospace;
      background: #21262d;
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
    }
    
    .color-display {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .color-box {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 2px solid #30363d;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    .color-hex {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #8b949e;
    }
    
    .progress-section {
      margin-top: 16px;
    }
    
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .progress-label {
      font-size: 12px;
      color: #8b949e;
      font-weight: 600;
    }
    
    .progress-percent {
      font-size: 12px;
      font-weight: 600;
      color: #58a6ff;
    }
    
    .progress-bar {
      height: 8px;
      background: #21262d;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      width: 0;
      transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 10px currentColor;
    }
    
    .habilidades {
      display: flex;
      gap: 8px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    
    .habilidade-tag {
      padding: 6px 12px;
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 16px;
      font-size: 12px;
      color: #8b949e;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .habilidade-tag:hover {
      background: #30363d;
      color: #f0f6fc;
      transform: translateY(-2px);
    }
    
    .section-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 40px 0 24px;
      opacity: 0;
    }
    
    .section-divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #30363d, transparent);
    }
    
    .section-divider-text {
      font-size: 14px;
      font-weight: 600;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    @media (max-width: 600px) {
      body {
        padding: 16px;
      }
      
      .header-title {
        font-size: 24px;
      }
      
      .stats-summary {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .podium-container {
        flex-direction: column;
        align-items: center;
      }
      
      .podium-card {
        order: 0 !important;
        margin-bottom: 20px;
      }
      
      .podium-card.first .podium-base,
      .podium-card.second .podium-base,
      .podium-card.third .podium-base {
        height: 120px;
        width: 120px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .card-content {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .rank-section {
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="header-title">
        <span class="trophy-icon">🏆</span>
        Ranking de Progresso
      </h1>
      <p class="header-subtitle">
        Índice de Progresso SemVer (IPS) e Índice de Qualidade de Build (IQB)<br>
        Acompanhe a evolução dos estudantes através de habilidades e competências
      </p>
    </div>
    
    <div class="stats-summary">
      <div class="summary-item">
        <div class="summary-value">6</div>
        <div class="summary-label">Estudantes</div>
      </div>
      <div class="summary-item">
        <div class="summary-value">0.88</div>
        <div class="summary-label">IQB Médio</div>
      </div>
      <div class="summary-item">
        <div class="summary-value">9.4M</div>
        <div class="summary-label">IPS Líder</div>
      </div>
    </div>
    
    <div class="podium-container" id="podiumContainer"></div>
    
    <div class="section-divider">
      <div class="section-divider-line"></div>
      <div class="section-divider-text">Classificação Completa</div>
      <div class="section-divider-line"></div>
    </div>
    
    <div class="ranking-list" id="rankingList"></div>
  </div>
  
  <script>
    const rankingData = [
      { 
        rank: 1, 
        name: 'Ana Silva', 
        avatar: 'AS',
        ips: '2.15.45.128',
        ipsDecimal: 9355328,
        ipsHex: '#8EC380',
        iqb: 0.94,
        color: '#8EC380',
        nivel: 'Sênior',
        habilidades: ['Comunicação', 'Liderança', 'Programação', 'Design']
      },
      { 
        rank: 2, 
        name: 'Carlos Mendes', 
        avatar: 'CM',
        ips: '1.63.100.255',
        ipsDecimal: 8355071,
        ipsHex: '#7F64FF',
        iqb: 0.91,
        color: '#7F64FF',
        nivel: 'Pleno',
        habilidades: ['Análise', 'Design', 'Banco de Dados']
      },
      { 
        rank: 3, 
        name: 'Beatriz Costa', 
        avatar: 'BC',
        ips: '1.42.89.200',
        ipsDecimal: 7856584,
        ipsHex: '#782AC8',
        iqb: 0.89,
        color: '#782AC8',
        nivel: 'Pleno',
        habilidades: ['UX/UI', 'Frontend', 'Testes']
      },
      { 
        rank: 4, 
        name: 'Daniel Rocha', 
        avatar: 'DR',
        ips: '1.35.67.150',
        ipsDecimal: 7234454,
        ipsHex: '#6E4396',
        iqb: 0.87,
        color: '#6E4396',
        nivel: 'Júnior',
        habilidades: ['Backend', 'APIs', 'DevOps']
      },
      { 
        rank: 5, 
        name: 'Eduarda Lima', 
        avatar: 'EL',
        ips: '1.28.52.100',
        ipsDecimal: 6812260,
        ipsHex: '#641C64',
        iqb: 0.85,
        color: '#641C64',
        nivel: 'Júnior',
        habilidades: ['Mobile', 'React', 'Git']
      },
      { 
        rank: 6, 
        name: 'Fernando Paz', 
        avatar: 'FP',
        ips: '0.63.127.255',
        ipsDecimal: 4227071,
        ipsHex: '#3F7FFF',
        iqb: 0.82,
        color: '#3F7FFF',
        nivel: 'Iniciante',
        habilidades: ['HTML', 'CSS', 'JavaScript']
      }
    ];
    
    const medals = {
      1: '🥇',
      2: '🥈',
      3: '🥉'
    };
    
    const rankPositions = {
      1: 'first',
      2: 'second',
      3: 'third'
    };
    
    function createPodiumCard(user) {
      const podiumCard = document.createElement('div');
      podiumCard.className = \`podium-card \${rankPositions[user.rank]}\`;
      
      const iqbPercent = (user.iqb * 100).toFixed(0);
      
      podiumCard.innerHTML = \`
        <div class="podium-avatar-container">
          \${user.rank === 1 ? '<div class="crown">👑</div>' : ''}
          <div class="podium-avatar" style="background: \${user.color}">
            \${user.avatar}
          </div>
          \${user.rank === 1 ? \`
            <div class="sparkles s1">✨</div>
            <div class="sparkles s2">✨</div>
            <div class="sparkles s3">⭐</div>
            <div class="sparkles s4">⭐</div>
          \` : ''}
        </div>
        <div class="podium-medal">\${medals[user.rank]}</div>
        <div class="podium-name">\${user.name}</div>
        <div class="podium-ips">\${user.ips}</div>
        <div class="podium-base">
          <div class="podium-rank">#\${user.rank}</div>
          <div class="podium-iqb">\${user.iqb}</div>
          <div class="podium-iqb-label">IQB</div>
        </div>
      \`;
      
      return podiumCard;
    }
    
    function createRankingCard(user) {
      const card = document.createElement('div');
      card.className = 'ranking-card';
      
      const iqbPercent = (user.iqb * 100).toFixed(0);
      
      card.innerHTML = \`
        <div class="card-content">
          <div class="rank-section">
            <div class="rank-badge">#\${user.rank}</div>
          </div>
          
          <div class="avatar" style="background: \${user.color}">
            \${user.avatar}
          </div>
          
          <div class="user-info">
            <div class="user-header">
              <div class="user-name">\${user.name}</div>
              <span class="nivel-badge">\${user.nivel}</span>
            </div>
            
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">IPS (SemVer)</span>
                <span class="stat-value ips-value">\${user.ips}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">IQB (Qualidade)</span>
                <span class="stat-value">\${user.iqb}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Cor RGB</span>
                <div class="color-display">
                  <div class="color-box" style="background: \${user.color}"></div>
                  <span class="color-hex">\${user.ipsHex}</span>
                </div>
              </div>
            </div>
            
            <div class="progress-section">
              <div class="progress-header">
                <span class="progress-label">Índice de Qualidade</span>
                <span class="progress-percent">\${iqbPercent}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" 
                     style="background: \${user.color}; color: \${user.color}" 
                     data-progress="\${iqbPercent}"></div>
              </div>
            </div>
            
            <div class="habilidades">
              \${user.habilidades.map(h => \`<span class="habilidade-tag">\${h}</span>\`).join('')}
            </div>
          </div>
        </div>
      \`;
      
      return card;
    }
    
    function populateRanking() {
      const podiumContainer = document.getElementById('podiumContainer');
      const listContainer = document.getElementById('rankingList');
      
      // Top 3 no pódio
      rankingData.slice(0, 3).forEach(user => {
        podiumContainer.appendChild(createPodiumCard(user));
      });
      
      // Demais no ranking
      rankingData.slice(3).forEach(user => {
        listContainer.appendChild(createRankingCard(user));
      });
      
      animateElements();
    }
    
    function animateElements() {
      // Animar header
      anime({
        targets: '.header',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      });
      
      // Animar resumo de estatísticas
      anime({
        targets: '.stats-summary',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
      });
      
      anime({
        targets: '.summary-value',
        innerHTML: [0, (el) => el.innerHTML],
        round: 1,
        duration: 2000,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutExpo'
      });
      
      // Animar pódio
      anime({
        targets: '.podium-container',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1200,
        delay: 800,
        easing: 'easeOutExpo'
      });
      
      anime({
        targets: '.podium-card',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: anime.stagger(200, {start: 1000}),
        easing: 'easeOutElastic(1, .6)'
      });
      
      anime({
        targets: '.podium-avatar',
        scale: [0, 1],
        rotate: [360, 0],
        duration: 1200,
        delay: anime.stagger(150, {start: 1200}),
        easing: 'easeOutElastic(1, .5)'
      });
      
      anime({
        targets: '.podium-base',
        scaleY: [0, 1],
        duration: 800,
        delay: anime.stagger(150, {start: 1400}),
        easing: 'easeOutExpo'
      });
      
      // Animar divisor
      anime({
        targets: '.section-divider',
        opacity: [0, 1],
        duration: 800,
        delay: 2000,
        easing: 'easeOutExpo'
      });
      
      // Animar cards restantes
      anime({
        targets: '.ranking-card',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(150, {start: 2200}),
        easing: 'easeOutExpo'
      });
      
      anime({
        targets: '.avatar',
        scale: [0, 1],
        rotate: [180, 0],
        duration: 1000,
        delay: anime.stagger(100, {start: 2400}),
        easing: 'easeOutElastic(1, .6)'
      });
      
      // Animar barras de progresso após os cards aparecerem
      setTimeout(() => {
        animateProgressBars();
      }, 2500);
    }
    
    function animateProgressBars() {
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, index * 100);
      });
    }
    
    // Popular ranking quando DOM carregar
    document.addEventListener('DOMContentLoaded', populateRanking);
    
    // Adicionar interações com clique
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.ranking-card');
      if (card) {
        anime({
          targets: card,
          scale: [1, 0.98, 1],
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
      
      const podiumCard = e.target.closest('.podium-card');
      if (podiumCard) {
        anime({
          targets: podiumCard.querySelector('.podium-avatar'),
          rotate: [0, 360],
          duration: 600,
          easing: 'easeInOutQuad'
        });
      }
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

export default RankingScreen;