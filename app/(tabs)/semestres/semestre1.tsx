import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

// Dados mockados para o MVP
const semestreData = {
  semestre: '2025.1',
  ips: {
    major: 2,
    minor: 15,
    patch: 8,
    build: 47,
    decimal: 9355335,
    hex: '0x8EC307',
    cor: '#8EC307'
  },
  iqb: 0.87, // 87%
  disciplinas: [
    {
      id: 1,
      nome: 'Programação Avançada',
      codigo: 'PAD-301',
      presencas: 28,
      totalAulas: 32,
      atividades: [
        { nome: 'Issue #23', pontuacao: 8.5, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #24', pontuacao: 9.0, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #25', pontuacao: 0, maxPontuacao: 10, entregue: false },
      ],
      habilidades: [
        { nome: 'Resolução de Problemas', nivel: 7, maxNivel: 10 },
        { nome: 'Pensamento Crítico', nivel: 6, maxNivel: 10 },
      ],
      mediaAtual: 8.75
    },
    {
      id: 2,
      nome: 'Banco de Dados II',
      codigo: 'BD-302',
      presencas: 30,
      totalAulas: 32,
      atividades: [
        { nome: 'Issue #18', pontuacao: 7.5, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #19', pontuacao: 8.0, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #20', pontuacao: 9.5, maxPontuacao: 10, entregue: true },
      ],
      habilidades: [
        { nome: 'Modelagem de Dados', nivel: 8, maxNivel: 10 },
        { nome: 'SQL Avançado', nivel: 7, maxNivel: 10 },
      ],
      mediaAtual: 8.33
    },
    {
      id: 3,
      nome: 'Engenharia de Software',
      codigo: 'ES-303',
      presencas: 26,
      totalAulas: 32,
      atividades: [
        { nome: 'Issue #12', pontuacao: 9.0, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #13', pontuacao: 8.5, maxPontuacao: 10, entregue: true },
        { nome: 'Issue #14', pontuacao: 0, maxPontuacao: 10, entregue: false },
      ],
      habilidades: [
        { nome: 'Gestão de Projetos', nivel: 6, maxNivel: 10 },
        { nome: 'Documentação Técnica', nivel: 8, maxNivel: 10 },
      ],
      mediaAtual: 8.75
    }
  ]
};

const SemestreScreen = () => {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<number | null>(null);

  // HTML com anime.js para o WebView
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          width: 100%;
          padding: 20px;
          text-align: center;
        }
        .ips-circle {
          width: 180px;
          height: 180px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: ${semestreData.ips.cor};
          box-shadow: 0 0 40px ${semestreData.ips.cor}80,
                      0 0 80px ${semestreData.ips.cor}40;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .ips-circle::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent 0deg,
            ${semestreData.ips.cor}40 180deg,
            transparent 360deg
          );
          animation: rotate 3s linear infinite;
        }
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }
        .ips-content {
          position: relative;
          z-index: 1;
          background: #0f172a;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .version {
          font-size: 28px;
          font-weight: 800;
          color: white;
          margin-bottom: 5px;
        }
        .hex-code {
          font-size: 12px;
          color: #94a3b8;
          font-family: monospace;
        }
        .iqb-container {
          margin-top: 30px;
        }
        .iqb-label {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .iqb-bar {
          width: 100%;
          max-width: 300px;
          height: 40px;
          background: #1e293b;
          border-radius: 20px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
          border: 2px solid #334155;
        }
        .iqb-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 15px;
        }
        .iqb-percentage {
          color: white;
          font-weight: bold;
          font-size: 18px;
        }
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="ips-circle">
          <div class="ips-content">
            <div class="version">v${semestreData.ips.major}.${semestreData.ips.minor}.${semestreData.ips.patch}.${semestreData.ips.build}</div>
            <div class="hex-code">${semestreData.ips.hex}</div>
          </div>
        </div>
        
        <div class="iqb-container">
          <div class="iqb-label">Índice de Qualidade de Build (IQB)</div>
          <div class="iqb-bar">
            <div class="iqb-fill" id="iqbFill" style="width: 0%">
              <span class="iqb-percentage">${Math.round(semestreData.iqb * 100)}%</span>
            </div>
          </div>
        </div>
        
        <div class="particles" id="particles"></div>
      </div>
      
      <script>
        // Animação da entrada do círculo IPS
        anime({
          targets: '.ips-circle',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeOutElastic(1, .8)'
        });
        
        // Animação do texto
        anime({
          targets: '.version, .hex-code',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          delay: anime.stagger(100, {start: 500}),
          easing: 'easeOutQuad'
        });
        
        // Animação da barra IQB
        anime({
          targets: '#iqbFill',
          width: ['0%', '${semestreData.iqb * 100}%'],
          duration: 1500,
          delay: 800,
          easing: 'easeOutExpo'
        });
        
        // Partículas flutuantes
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particlesContainer.appendChild(particle);
          
          anime({
            targets: particle,
            translateY: [0, -100],
            translateX: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.6, 0],
            duration: 3000 + Math.random() * 2000,
            delay: Math.random() * 2000,
            loop: true,
            easing: 'easeInOutQuad'
          });
        }
      </script>
    </body>
    </html>
  `;

  const renderDisciplina = (disciplina: typeof semestreData.disciplinas[0]) => {
    const percentualPresenca = (disciplina.presencas / disciplina.totalAulas) * 100;
    const atividadesCompletas = disciplina.atividades.filter(a => a.entregue).length;
    
    return (
      <TouchableOpacity
        key={disciplina.id}
        style={styles.disciplinaCard}
        onPress={() => setDisciplinaSelecionada(
          disciplinaSelecionada === disciplina.id ? null : disciplina.id
        )}
        activeOpacity={0.8}
      >
        <View style={styles.disciplinaHeader}>
          <View style={styles.disciplinaInfo}>
            <Text style={styles.disciplinaNome}>{disciplina.nome}</Text>
            <Text style={styles.disciplinaCodigo}>{disciplina.codigo}</Text>
          </View>
          <View style={styles.mediaContainer}>
            <Text style={styles.mediaValor}>{disciplina.mediaAtual.toFixed(2)}</Text>
            <Text style={styles.mediaLabel}>Média</Text>
          </View>
        </View>

        {/* Barra de progresso de atividades */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Atividades</Text>
            <Text style={styles.progressText}>
              {atividadesCompletas}/{disciplina.atividades.length}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(atividadesCompletas / disciplina.atividades.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Barra de presenças */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Presença</Text>
            <Text style={styles.progressText}>
              {disciplina.presencas}/{disciplina.totalAulas} ({percentualPresenca.toFixed(0)}%)
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFillPresenca,
                { 
                  width: `${percentualPresenca}%`,
                  backgroundColor: percentualPresenca >= 75 ? '#10b981' : '#ef4444'
                }
              ]} 
            />
          </View>
        </View>

        {/* Detalhes expandidos */}
        {disciplinaSelecionada === disciplina.id && (
          <View style={styles.detalhesContainer}>
            {/* Atividades */}
            <View style={styles.secaoDetalhes}>
              <Text style={styles.tituloSecao}>Atividades Recentes</Text>
              {disciplina.atividades.map((atividade, idx) => (
                <View key={idx} style={styles.atividadeItem}>
                  <View style={styles.atividadeInfo}>
                    <Text style={styles.atividadeNome}>{atividade.nome}</Text>
                    <Text style={[
                      styles.atividadeStatus,
                      { color: atividade.entregue ? '#10b981' : '#94a3b8' }
                    ]}>
                      {atividade.entregue ? 'Entregue' : 'Pendente'}
                    </Text>
                  </View>
                  <Text style={styles.atividadePontuacao}>
                    {atividade.entregue ? atividade.pontuacao.toFixed(1) : '--'}/{atividade.maxPontuacao}
                  </Text>
                </View>
              ))}
            </View>

            {/* Habilidades */}
            <View style={styles.secaoDetalhes}>
              <Text style={styles.tituloSecao}>Habilidades Desenvolvidas</Text>
              {disciplina.habilidades.map((habilidade, idx) => (
                <View key={idx} style={styles.habilidadeItem}>
                  <View style={styles.habilidadeHeader}>
                    <Text style={styles.habilidadeNome}>{habilidade.nome}</Text>
                    <Text style={styles.habilidadeNivel}>
                      Nv. {habilidade.nivel}/{habilidade.maxNivel}
                    </Text>
                  </View>
                  <View style={styles.habilidadeBar}>
                    <View 
                      style={[
                        styles.habilidadeFill,
                        { width: `${(habilidade.nivel / habilidade.maxNivel) * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* WebView com animações */}
      <View style={styles.webviewContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          scrollEnabled={false}
          bounces={false}
        />
      </View>

      {/* Lista de disciplinas */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.semestreHeader}>
          <Text style={styles.semestreTitulo}>Semestre {semestreData.semestre}</Text>
          <Text style={styles.semestreSubtitulo}>
            {semestreData.disciplinas.length} disciplinas ativas
          </Text>
        </View>

        {semestreData.disciplinas.map(renderDisciplina)}

        {/* Espaçamento para a TabBar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webviewContainer: {
    height: height * 0.35,
    width: '100%',
  },
  webview: {
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  semestreHeader: {
    marginTop: 20,
    marginBottom: 16,
  },
  semestreTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  semestreSubtitulo: {
    fontSize: 14,
    color: '#94a3b8',
  },
  disciplinaCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  disciplinaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  disciplinaInfo: {
    flex: 1,
  },
  disciplinaNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  disciplinaCodigo: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  mediaContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  mediaValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mediaLabel: {
    fontSize: 10,
    color: '#dbeafe',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressFillPresenca: {
    height: '100%',
    borderRadius: 4,
  },
  detalhesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  secaoDetalhes: {
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  atividadeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  atividadeInfo: {
    flex: 1,
  },
  atividadeNome: {
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  atividadeStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  atividadePontuacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  habilidadeItem: {
    marginBottom: 12,
  },
  habilidadeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  habilidadeNome: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  habilidadeNivel: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  habilidadeBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  habilidadeFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
});

export default SemestreScreen;