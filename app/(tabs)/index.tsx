import React from 'react';
import { View, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const AnimatedWebView = () => {
  // WebView não funciona na web, apenas mobile
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webWarning}>
        <Text style={styles.warningText}>⚠️ WebView com Anime.js</Text>
        <Text style={styles.warningSubtext}>
          Este componente funciona apenas em iOS e Android.
        </Text>
        <Text style={styles.warningSubtext}>
          Teste no emulador ou dispositivo físico!
        </Text>
      </View>
    );
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>GitHub Style Animation</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js"></script>
      <style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0d1117;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.intro-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 100;
  background: #0d1117;
}

.logo {
  font-size: clamp(28px, 7vw, 42px); /* Responsivo */
  font-weight: 700;
  color: #c9d1d9;
  letter-spacing: 2px;
  opacity: 0;
  z-index: 10;
  margin-bottom: clamp(12px, 3vh, 16px);
}

.subtitle {
  font-size: clamp(14px, 3.5vw, 16px); /* Responsivo */
  color: #8b949e;
  opacity: 0;
  z-index: 10;
  padding: 0 5vw;
  text-align: center;
}

.grid-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr)); /* Responsivo */
  grid-auto-rows: minmax(40px, 1fr);
  gap: clamp(2px, 0.5vw, 4px);
  padding: clamp(10px, 3vw, 20px);
  opacity: 0.3;
}

.grid-item {
  background: #161b22;
  border-radius: 4px;
  border: 1px solid #21262d;
  opacity: 0;
  min-height: 30px;
}

.grid-item.active {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  border-color: #7c3aed;

}

.floating-card {
  position: absolute;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: clamp(12px, 3vw, 16px);
  opacity: 0;
}

.card-header {
  width: clamp(50px, 12vw, 60px);
  height: clamp(6px, 1.5vw, 8px);
  background: linear-gradient(90deg, #7c3aed, #3b82f6);
  border-radius: 4px;
  margin-bottom: clamp(6px, 1.5vw, 8px);
}

.card-line {
  width: 100%;
  height: clamp(5px, 1.2vw, 6px);
  background: #21262d;
  border-radius: 3px;
  margin: clamp(4px, 1vw, 6px) 0;
}

/* Background animado permanente */
.background-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(clamp(40px, 10vw, 60px));
  opacity: 0;
}

.bg-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: clamp(30px, 8vw, 50px) clamp(30px, 8vw, 50px);
  opacity: 0;
}

/* Container principal com conteúdo */
.main-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
}
/* Botões laterais - RESPONSIVO */
.side-buttons {
  position: fixed;
  right: clamp(10px, 3vw, 20px); /* Espaçamento responsivo */
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 12px);
  z-index: 20;
}

.side-btn {
  width: clamp(40px, 10vw, 50px); /* Tamanho responsivo */
  height: clamp(40px, 10vw, 50px);
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: clamp(8px, 2vw, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9d1d9;
  font-size: clamp(14px, 3.5vw, 18px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(100px);
}

.side-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  border-color: #7c3aed;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
  transform: scale(1.1) translateX(0);
}

.side-btn.active {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  border-color: #7c3aed;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
}

/* Git Graph Container - TOTALMENTE RESPONSIVO */
.graph-container {
  position: absolute;
  left: 10%; /* Centralizado horizontalmente */
  top: 10%; /* Centralizado verticalmente */
  transform: translate(-50%, -50%);
  padding: clamp(15px, 4vw, 20px);
  opacity: 0;
  
  /* Responsivo com margens laterais para os botões */
  width: calc(100% - clamp(70px, 18vw, 90px)); /* Deixa espaço para botões */
  max-width: 700px;
  height: auto;
  max-height: 80vh; /* Altura máxima responsiva */
  
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.graph-title {
  color: #c9d1d9;
  font-size: clamp(16px, 4vw, 20px); /* Responsivo */
  font-weight: 700;
  margin-bottom: clamp(10px, 2.5vh, 15px);
  text-align: center;
  background: linear-gradient(90deg, #7c3aed, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  width: 100%;
}

/* Estilos do Mermaid - RESPONSIVO */
.mermaid {
  background: transparent !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: clamp(300px, 50vh, 400px); /* Altura mínima responsiva */
}

.mermaid svg {
  max-width: 100% !important;
  height: auto !important;
}

/* Scrollbar customizada - RESPONSIVO */
.graph-container::-webkit-scrollbar {
  width: clamp(6px, 1.5vw, 8px);
  height: clamp(6px, 1.5vw, 8px);
}

.graph-container::-webkit-scrollbar-track {
  background: #0d1117;
  border-radius: 4px;
}

.graph-container::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 4px;
}

.graph-container::-webkit-scrollbar-thumb:hover {
  background: #484f58;
}

/* Media Queries para ajustes finos em telas muito pequenas */
@media (max-width: 360px) {
  .graph-container {
    width: calc(100% - 65px); /* Menos espaço em telas pequenas */
    max-height: 75vh;
  }
  
  .side-buttons {
    right: 8px;
    gap: 6px;
  }
  
  .side-btn {
    width: 38px;
    height: 38px;
    font-size: 13px;
  }
  
  .graph-title {
    font-size: 15px;
  }
}

/* Media Queries para telas médias (tablets em modo portrait) */
@media (min-width: 600px) and (max-width: 900px) {
  .graph-container {
    width: calc(100% - 100px);
    max-width: 600px;
  }
}

/* Landscape mode - ajustes especiais */
@media (orientation: landscape) and (max-height: 500px) {
  .graph-container {
    max-height: 85vh;
    top: 50%;
  }
  
  .side-buttons {
    gap: 8px;
  }
  
  .mermaid {
    min-height: 250px;
  }
}
      </style>
    </head>
    <body>
      <!-- Intro (vai sumir) -->
      <div class="intro-container" id="introContainer">
        <div class="grid-container" id="gridContainer"></div>
        <div class="logo" id="logo">Welcome</div>
      </div>

      <!-- Background permanente -->
      <div class="background-container" id="bgContainer">
        <div class="bg-grid"></div>
      </div>

      <!-- Conteúdo principal -->
      <div class="main-content" id="mainContent">
        <!-- Botões laterais -->
        <div class="side-buttons" id="sideButtons">
          <button class="side-btn" data-btn="1">1</button>
          <button class="side-btn" data-btn="2">2</button>
          <button class="side-btn" data-btn="3">3</button>
          <button class="side-btn active" data-btn="4">4</button>
          <button class="side-btn" data-btn="5">5</button>
        </div>

        <!-- Git Graph -->
        <div class="graph-container" id="graphContainer">
          <div class="graph-title">Git Flow Diagram</div>
          <div class="mermaid" id="mermaidDiagram"></div>
        </div>
      </div>

      <script>
        try {
          // Inicializar Mermaid ANTES de tudo
          mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              darkMode: true,
              primaryColor: '#7c3aed',
              primaryTextColor: '#ffffff',
              primaryBorderColor: '#7c3aed',
              lineColor: '#3b82f6',
              secondaryColor: '#3b82f6',
              tertiaryColor: '#10b981',
              background: 'transparent',           // ← MUDANÇA: transparente
              mainBkg: 'transparent',              // ← MUDANÇA: transparente
              secondBkg: 'transparent',            // ← MUDANÇA: transparente
              border1: '#30363d',
              border2: '#30363d',
              git0: '#7c3aed',
              git1: '#3b82f6',
              git2: '#10b981',
              git3: '#f59e0b',
              gitInv0: '#ffffff',
              gitInv1: '#ffffff',
              gitInv2: '#ffffff',
              gitBranchLabel0: '#ffffff',
              gitBranchLabel1: '#ffffff',
              gitBranchLabel2: '#ffffff',
              commitLabelColor: '#ffffff',
              commitLabelBackground: '#161b22',
              commitLabelFontSize: '14px',
              tagLabelColor: '#ffffff',
              tagLabelBackground: '#7c3aed',
              tagLabelBorder: '#7c3aed',
              tagLabelFontSize: '12px'
            },
            gitGraph: {
              showBranches: true,
              showCommitLabel: true,
              mainBranchName: 'main',
              mainBranchOrder: 0,
              rotateCommitLabel: false,           // ← MUDANÇA: false para melhor legibilidade
              arrowMarkerAbsolute: false
            }
          });

          // Definir o diagrama Mermaid
          const mermaidCode = \`%%{init: {\'theme':'dark', 'gitGraph': {'rotateCommitLabel': false}} }%%
          gitGraph TB:
            commit id: "Init"
            commit id: "Setup"
            branch develop
            commit id: "Dev v1"
            branch feature
            commit id: "Feature A"
            commit id: "Feature B"
            checkout develop
            merge feature
            commit id: "Tests"
            checkout main
            merge develop tag: "v1.0"
            checkout develop
            commit id: "Fixes"
            checkout main
            merge develop tag: "v1.1"\`;

          console.log('Mermaid inicializado');

          // Criar grid de fundo
          const gridContainer = document.getElementById('gridContainer');
          for (let i = 0; i < 96; i++) {
            const item = document.createElement('div');
            item.className = 'grid-item';
            gridContainer.appendChild(item);
          }

          // Criar cards flutuantes
          const introContainer = document.getElementById('introContainer');
          for (let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.className = 'floating-card';
            card.style.width = '120px';
            card.style.height = '80px';
            
            const header = document.createElement('div');
            header.className = 'card-header';
            card.appendChild(header);
            
            for (let j = 0; j < 3; j++) {
              const line = document.createElement('div');
              line.className = 'card-line';
              line.style.width = (60 + Math.random() * 40) + '%';
              card.appendChild(line);
            }
            
            introContainer.appendChild(card);
          }

          // Criar círculos animados para o background
          const bgContainer = document.getElementById('bgContainer');
          for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.className = 'bg-circle';
            const size = 200 + Math.random() * 200;
            circle.style.width = size + 'px';
            circle.style.height = size + 'px';
            
            if (i % 2 === 0) {
              circle.style.background = 'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent)';
            } else {
              circle.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)';
            }
            
            bgContainer.appendChild(circle);
          }

          // ANIMAÇÃO DE INTRO (3 segundos)
          
          // Animação do grid aparecendo
          anime({
            targets: '.grid-item',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            delay: anime.stagger(10, {start: 200}),
            easing: 'easeOutQuad'
          });

          // Alguns itens do grid ficam destacados
          setTimeout(function() {
            const items = document.querySelectorAll('.grid-item');
            const randomIndexes = [];
            while(randomIndexes.length < 12) {
              const r = Math.floor(Math.random() * items.length);
              if(randomIndexes.indexOf(r) === -1) randomIndexes.push(r);
            }
            
            randomIndexes.forEach(function(index) {
              items[index].classList.add('active');
            });

            anime({
              targets: '.grid-item.active',
              scale: [1, 1.1, 1],
              duration: 600,
              delay: anime.stagger(50),
              easing: 'easeOutQuad'
            });
          }, 1000);

          // Animar logo
          anime({
            targets: '#logo',
            opacity: [0, 1],
            translateY: [-30, 0],
            duration: 800,
            delay: 400,
            easing: 'easeOutQuad'
          });

          // Animar subtitle
          anime({
            targets: '#subtitle',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 800,
            delay: 600,
            easing: 'easeOutQuad'
          });

          // Animar cards flutuantes
          anime({
            targets: '.floating-card',
            opacity: [0, 1],
            scale: [0.9, 1],
            translateX: function() {
              return [anime.random(-400, 400), anime.random(-200, 200)];
            },
            translateY: function() {
              return [anime.random(-400, 400), anime.random(-200, 200)];
            },
            rotate: function() {
              return anime.random(-15, 15);
            },
            duration: 1000,
            delay: anime.stagger(200, {start: 800}),
            easing: 'easeOutExpo'
          });

          // TRANSIÇÃO PARA BACKGROUND PERMANENTE (após 3.5 segundos)
          setTimeout(function() {
            // Fade out da intro
            anime({
              targets: '#introContainer',
              opacity: [1, 0],
              duration: 800,
              easing: 'easeOutQuad',
              complete: function() {
                document.getElementById('introContainer').style.display = 'none';
                
                // Mostrar background permanente
                document.getElementById('bgContainer').style.display = 'block';
                
                // Fade in do grid
                anime({
                  targets: '.bg-grid',
                  opacity: [0, 1],
                  duration: 1000,
                  easing: 'easeOutQuad'
                });

                // Posicionar e animar círculos
                const circles = document.querySelectorAll('.bg-circle');
                circles.forEach(function(circle, i) {
                  const x = anime.random(0, window.innerWidth - 300);
                  const y = anime.random(0, window.innerHeight - 300);
                  circle.style.left = x + 'px';
                  circle.style.top = y + 'px';
                });

                anime({
                  targets: '.bg-circle',
                  opacity: [0, 1],
                  scale: [0.8, 1],
                  duration: 1500,
                  delay: anime.stagger(150),
                  easing: 'easeOutQuad'
                });

                // Animação contínua dos círculos
                anime({
                  targets: '.bg-circle',
                  translateX: function() {
                    return anime.random(-100, 100);
                  },
                  translateY: function() {
                    return anime.random(-100, 100);
                  },
                  duration: function() {
                    return anime.random(8000, 12000);
                  },
                  easing: 'easeInOutSine',
                  direction: 'alternate',
                  loop: true
                });

                // Mostrar conteúdo principal após transição
                setTimeout(function() {
                  document.getElementById('mainContent').style.display = 'block';
                  
                  // Renderizar Mermaid diagram
                  const mermaidElement = document.getElementById('mermaidDiagram');
                  
                  mermaid.render('mermaidGraph', mermaidCode).then(function(result) {
                    mermaidElement.innerHTML = result.svg;
                    console.log('Mermaid renderizado com sucesso!');
                  }).catch(function(error) {
                    console.error('Erro ao renderizar Mermaid:', error);
                    mermaidElement.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Erro ao carregar diagrama</p>';
                  });
                  
                  // Animar Git Graph
                  anime({
                    targets: '#graphContainer',
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 1000,
                    easing: 'easeOutExpo'
                  });

                  // Animar botões laterais
                  anime({
                    targets: '.side-btn',
                    opacity: [0, 1],
                    translateX: [100, 0],
                    duration: 600,
                    delay: anime.stagger(100, {start: 300}),
                    easing: 'easeOutExpo'
                  });

                  // Adicionar interatividade aos botões
                  const buttons = document.querySelectorAll('.side-btn');
                  buttons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                      // Remove active de todos
                      buttons.forEach(function(b) {
                        b.classList.remove('active');
                      });
                      // Adiciona active no clicado
                      this.classList.add('active');
                      
                      // Animação de clique
                      anime({
                        targets: this,
                        scale: [1, 1.2, 1],
                        duration: 300,
                        easing: 'easeOutExpo'
                      });

                      // Log para debug
                      console.log('Botão clicado:', this.getAttribute('data-btn'));
                    });
                  });
                }, 500);
              }
            });
          }, 3500);

        } catch (error) {
          console.error('Erro:', error);
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    width: width,
    height: height,
  },
  webWarning: {
    flex: 1,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  warningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  warningSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AnimatedWebView;