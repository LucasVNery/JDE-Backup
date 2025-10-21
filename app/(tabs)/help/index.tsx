import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const helpSections = [
  {
    id: 'ips',
    title: 'IQB/IPS',
    icon: '📊',
    color: '#3b82f6',
    subtitle: 'Índices de Progresso e Qualidade',
    content: {
      ips: {
        title: 'Índice de Progresso SemVer (IPS)',
        description: 'Sistema de versionamento baseado em SemVer que representa sua evolução acadêmica.',
        formula: 'IPS = (M << 21) | (m << 15) | (p << 8) | b',
        components: [
          { name: 'Major (M)', bits: '3 bits', range: '0-7', description: 'Projetos concluídos' },
          { name: 'Minor (m)', bits: '6 bits', range: '0-63', description: 'Fases e milestones' },
          { name: 'Patch (p)', bits: '7 bits', range: '0-127', description: 'Disciplinas' },
          { name: 'Build (b)', bits: '8 bits', range: '0-255', description: 'Issues resolvidas' },
        ],
        examples: [
          { version: 'v0.0.0.0', hex: '0x000000', meaning: 'Matrícula no curso' },
          { version: 'v0.0.1.0', hex: '0x000100', meaning: 'Primeiro épico concluído' },
          { version: 'v0.1.0.0', hex: '0x008000', meaning: 'Primeira fase concluída' },
          { version: 'v1.0.0.0', hex: '0x400000', meaning: 'Projeto concluído' },
        ]
      },
      iqb: {
        title: 'Índice de Qualidade de Build (IQB)',
        description: 'Demonstra a qualidade das suas entregas baseado na pontuação obtida.',
        formula: 'IQB = Σ(Pontuação obtida / Pontuação esperada) / Quantidade de issues',
        interpretation: [
          { range: '0.90 - 1.00', level: 'Excelente', color: '#10b981' },
          { range: '0.75 - 0.89', level: 'Bom', color: '#3b82f6' },
          { range: '0.60 - 0.74', level: 'Regular', color: '#f59e0b' },
          { range: '0.00 - 0.59', level: 'Precisa Melhorar', color: '#ef4444' },
        ]
      }
    }
  },
  {
    id: 'issues',
    title: 'Issues',
    icon: '📝',
    color: '#8b5cf6',
    subtitle: 'Atividades e Entregas',
    content: {
      definition: 'Issue é uma atividade executada pelo estudante, podendo estar associada ou não a um épico.',
      types: [
        {
          name: 'Issue de Aprendizagem',
          icon: '📚',
          description: 'Atividades avaliativas e exercícios',
          examples: ['Prova', 'Lista de exercícios', 'Quiz']
        },
        {
          name: 'Issue de Prática',
          icon: '⚙️',
          description: 'Projetos e atividades práticas',
          examples: ['Projeto', 'Laboratório', 'Hackathon']
        },
        {
          name: 'Issue de Soft Skills',
          icon: '💬',
          description: 'Desenvolvimento de habilidades interpessoais',
          examples: ['Apresentação', 'Seminário', 'Trabalho em equipe']
        }
      ],
      properties: [
        { name: 'Definition of Done (DoD)', description: 'Requisitos e pontuação mínima para completar' },
        { name: 'Pontuação', description: 'Valor baseado em complexidade e relevância' },
        { name: 'Épico (opcional)', description: 'Agrupamento de issues relacionadas' },
        { name: 'Projeto', description: 'Associação obrigatória ao projeto' },
      ]
    }
  },
  {
    id: 'commits',
    title: 'Commits',
    icon: '🔄',
    color: '#10b981',
    subtitle: 'Entregas e Incrementos',
    content: {
      definition: 'Commit é a ação de realizar um incremento no projeto, representando a entrega de uma issue.',
      workflow: [
        { step: '1', action: 'Estudante pega uma issue', status: 'Em Progresso' },
        { step: '2', action: 'Realiza o commit', status: 'Review' },
        { step: '3', action: 'Issue é avaliada', status: 'Pontuação atribuída' },
        { step: '4', action: 'DoD alcançado', status: 'Concluído' },
      ],
      structure: {
        id: 'Identificador incremental de 24 bits (hex)',
        timestamp: 'Data e hora do commit',
        message: 'Mensagem semântica do commit'
      },
      semantics: [
        {
          prefix: 'feat',
          color: '#10b981',
          description: 'Conquistas ou novas skills',
          example: 'feat(FBD): entrega do exercício de modelagem (#1)'
        },
        {
          prefix: 'fix',
          color: '#f59e0b',
          description: 'Refactors ou correções',
          example: 'fix(PAD): correção do algoritmo de busca (#15)'
        },
        {
          prefix: 'docs',
          color: '#3b82f6',
          description: 'Documentação e relatórios',
          example: 'docs(ES): relatório de análise de requisitos (#8)'
        },
        {
          prefix: 'test',
          color: '#8b5cf6',
          description: 'Provas e avaliações',
          example: 'test(BD): avaliação G1 (#23)'
        },
        {
          prefix: 'release',
          color: '#ef4444',
          description: 'Entregas finais importantes',
          example: 'release: apresentação TCC v1.0.0'
        }
      ]
    }
  },
  {
    id: 'competencias',
    title: 'Níveis/Competências',
    icon: '🎯',
    color: '#f59e0b',
    subtitle: 'Habilidades e Competências',
    content: {
      definitions: {
        habilidade: {
          title: 'Habilidade',
          subtitle: 'O que você sabe fazer',
          description: 'Capacidade prática ou técnica desenvolvida com treino ou estudo. Foco na execução de tarefas específicas.',
          characteristics: ['Pode ser ensinada', 'Pode ser treinada', 'Pode ser medida diretamente']
        },
        competencia: {
          title: 'Competência',
          subtitle: 'Como você aplica o que sabe',
          description: 'Integração de habilidades, conhecimentos e atitudes para resolver problemas reais. Foco na aplicação em contextos diversos.',
          characteristics: ['Mais ampla', 'Envolve julgamento', 'Requer experiência e contexto']
        }
      },
      levels: [
        {
          name: 'Nível do Curso',
          description: 'Progressão ao longo dos semestres',
          example: 'Comunicação oral e escrita (8 níveis: 1º ao 8º período)',
          icon: '📈'
        },
        {
          name: 'Nível da Disciplina',
          description: 'Evolução dentro de uma turma específica',
          example: 'Resolução de problemas (baseado em inputs avaliativos)',
          icon: '📊'
        },
        {
          name: 'Nível de Conteúdo',
          description: 'Desenvolvimento em assuntos específicos',
          example: 'Fundamentos de linguagem de programação',
          icon: '🎓'
        }
      ]
    }
  },
  {
    id: 'epicacoes',
    title: 'Épicos/Ações',
    icon: '⚡',
    color: '#ec4899',
    subtitle: 'Agrupamentos e Ações',
    content: {
      epicos: {
        title: 'Épicos',
        description: 'Agrupamento de issues relacionadas que compõem uma entrega maior ou milestone significativo.',
        characteristics: [
          'Agrupa múltiplas issues relacionadas',
          'Representa objetivos maiores',
          'Pode ser associado a disciplinas',
          'Tem identificador único (ex: FBD, PAD, ES)'
        ],
        example: 'Épico "FBD" (Fundamentos de Banco de Dados) contém issues: #1, #2, #3 relacionadas a modelagem'
      },
      acoes: {
        title: 'Ações do Sistema',
        description: 'Principais ações disponíveis na plataforma',
        items: [
          { action: 'Pegar Issue', description: 'Iniciar trabalho em uma atividade' },
          { action: 'Fazer Commit', description: 'Entregar incremento/solução' },
          { action: 'Review', description: 'Avaliação da entrega' },
          { action: 'Ver Changelog', description: 'Histórico de progressos' },
          { action: 'Consultar IPS/IQB', description: 'Ver métricas de desempenho' },
        ]
      }
    }
  }
];

const HelpScreen = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  // HTML com animação do diagrama
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
          padding: 20px;
        }
        .diagram {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 400px;
        }
        .node {
          position: absolute;
          background: linear-gradient(135deg, #1e293b, #334155);
          border: 2px solid #475569;
          border-radius: 12px;
          padding: 15px 20px;
          color: white;
          font-weight: 600;
          font-size: 13px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          opacity: 0;
          transform: scale(0.5);
        }
        .center {
          width: 140px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          font-size: 16px;
          border: 3px solid #60a5fa;
          z-index: 10;
        }
        .top-left { top: 10%; left: 5%; width: 100px; }
        .top-center { top: 5%; left: 50%; transform: translateX(-50%) scale(0.5); width: 140px; }
        .top-right { top: 10%; right: 5%; width: 100px; }
        .left { top: 50%; left: 0%; transform: translateY(-50%) scale(0.5); width: 90px; }
        .right { top: 50%; right: 0%; transform: translateY(-50%) scale(0.5); width: 90px; }
        .bottom { bottom: 10%; left: 50%; transform: translateX(-50%) scale(0.5); width: 80px; }
        
        svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .connection {
          stroke: #475569;
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      </style>
    </head>
    <body>
      <div class="diagram">
        <svg id="svg"></svg>
        <div class="node center">Épicos/Ações</div>
        <div class="node top-left">IQB/IPS</div>
        <div class="node top-center">Níveis/Competências</div>
        <div class="node top-right">IQB/IPS</div>
        <div class="node left">Issues</div>
        <div class="node right">Commits</div>
        <div class="node bottom">Help</div>
      </div>
      
      <script>
        const nodes = document.querySelectorAll('.node');
        const center = document.querySelector('.center');
        
        // Animar centro primeiro
        anime({
          targets: center,
          scale: [0.5, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutElastic(1, .6)',
          complete: () => {
            // Depois animar outros nós
            anime({
              targets: '.node:not(.center)',
              scale: [0.5, 1],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(100),
              easing: 'easeOutBack'
            });
          }
        });
        
        // Desenhar conexões
        setTimeout(() => {
          const svg = document.getElementById('svg');
          const centerRect = center.getBoundingClientRect();
          const cx = centerRect.left + centerRect.width / 2;
          const cy = centerRect.top + centerRect.height / 2;
          
          nodes.forEach(node => {
            if (!node.classList.contains('center')) {
              const rect = node.getBoundingClientRect();
              const x = rect.left + rect.width / 2;
              const y = rect.top + rect.height / 2;
              
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', cx - svg.getBoundingClientRect().left);
              line.setAttribute('y1', cy - svg.getBoundingClientRect().top);
              line.setAttribute('x2', x - svg.getBoundingClientRect().left);
              line.setAttribute('y2', y - svg.getBoundingClientRect().top);
              line.classList.add('connection');
              svg.appendChild(line);
            }
          });
          
          anime({
            targets: '.connection',
            strokeDashoffset: [1000, 0],
            duration: 1000,
            delay: anime.stagger(100),
            easing: 'easeInOutQuad'
          });
        }, 1000);
        
        // Pulsar centro
        anime({
          targets: center,
          scale: [1, 1.05, 1],
          duration: 2000,
          loop: true,
          easing: 'easeInOutQuad'
        });
      </script>
    </body>
    </html>
  `;

  const renderSectionCard = (section: typeof helpSections[0]) => {
    const isExpanded = expandedCards.has(section.id);
    
    return (
      <TouchableOpacity
        key={section.id}
        style={[styles.sectionCard, { borderLeftColor: section.color }]}
        onPress={() => toggleCard(section.id)}
        activeOpacity={0.8}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <View style={styles.sectionTextContainer}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
        </View>

        {isExpanded && (
          <View style={styles.sectionContent}>
            {renderSectionDetails(section)}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionDetails = (section: typeof helpSections[0]) => {
    switch (section.id) {
      case 'ips':
        return renderIPSContent(section.content);
      case 'issues':
        return renderIssuesContent(section.content);
      case 'commits':
        return renderCommitsContent(section.content);
      case 'competencias':
        return renderCompetenciasContent(section.content);
      case 'epicacoes':
        return renderEpicacoesContent(section.content);
      default:
        return null;
    }
  };

  const renderIPSContent = (content: any) => (
    <View>
      {/* IPS */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>{content.ips.title}</Text>
        <Text style={styles.description}>{content.ips.description}</Text>
        
        <View style={styles.formulaContainer}>
          <Text style={styles.formulaLabel}>Fórmula:</Text>
          <Text style={styles.formulaText}>{content.ips.formula}</Text>
        </View>

        <Text style={styles.componentsTitle}>Componentes:</Text>
        {content.ips.components.map((comp: any, idx: number) => (
          <View key={idx} style={styles.componentItem}>
            <Text style={styles.componentName}>{comp.name}</Text>
            <Text style={styles.componentDetails}>{comp.bits} • {comp.range}</Text>
            <Text style={styles.componentDesc}>{comp.description}</Text>
          </View>
        ))}

        <Text style={styles.examplesTitle}>Exemplos:</Text>
        {content.ips.examples.map((ex: any, idx: number) => (
          <View key={idx} style={styles.exampleItem}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleVersion}>{ex.version}</Text>
              <Text style={styles.exampleHex}>{ex.hex}</Text>
            </View>
            <Text style={styles.exampleMeaning}>{ex.meaning}</Text>
          </View>
        ))}
      </View>

      {/* IQB */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>{content.iqb.title}</Text>
        <Text style={styles.description}>{content.iqb.description}</Text>
        
        <View style={styles.formulaContainer}>
          <Text style={styles.formulaLabel}>Fórmula:</Text>
          <Text style={styles.formulaText}>{content.iqb.formula}</Text>
        </View>

        <Text style={styles.interpretationTitle}>Interpretação:</Text>
        {content.iqb.interpretation.map((interp: any, idx: number) => (
          <View key={idx} style={styles.interpretationItem}>
            <View style={[styles.levelIndicator, { backgroundColor: interp.color }]} />
            <View style={styles.interpretationText}>
              <Text style={styles.levelRange}>{interp.range}</Text>
              <Text style={[styles.levelName, { color: interp.color }]}>{interp.level}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderIssuesContent = (content: any) => (
    <View>
      <Text style={styles.description}>{content.definition}</Text>
      
      <Text style={styles.typesTitle}>Tipos de Issues:</Text>
      {content.types.map((type: any, idx: number) => (
        <View key={idx} style={styles.typeCard}>
          <View style={styles.typeHeader}>
            <Text style={styles.typeIcon}>{type.icon}</Text>
            <Text style={styles.typeName}>{type.name}</Text>
          </View>
          <Text style={styles.typeDescription}>{type.description}</Text>
          <View style={styles.examplesContainer}>
            {type.examples.map((ex: string, i: number) => (
              <View key={i} style={styles.exampleTag}>
                <Text style={styles.exampleTagText}>{ex}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.propertiesTitle}>Propriedades:</Text>
      {content.properties.map((prop: any, idx: number) => (
        <View key={idx} style={styles.propertyItem}>
          <Text style={styles.propertyBullet}>•</Text>
          <View style={styles.propertyContent}>
            <Text style={styles.propertyName}>{prop.name}</Text>
            <Text style={styles.propertyDesc}>{prop.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCommitsContent = (content: any) => (
    <View>
      <Text style={styles.description}>{content.definition}</Text>
      
      <Text style={styles.workflowTitle}>Fluxo de Trabalho:</Text>
      <View style={styles.workflowContainer}>
        {content.workflow.map((step: any, idx: number) => (
          <View key={idx} style={styles.workflowStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.step}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepAction}>{step.action}</Text>
              <Text style={styles.stepStatus}>{step.status}</Text>
            </View>
            {idx < content.workflow.length - 1 && (
              <View style={styles.stepConnector} />
            )}
          </View>
        ))}
      </View>

      <Text style={styles.semanticsTitle}>Semântica de Commits:</Text>
      {content.semantics.map((sem: any, idx: number) => (
        <View key={idx} style={styles.semanticItem}>
          <View style={[styles.semanticBadge, { backgroundColor: sem.color }]}>
            <Text style={styles.semanticPrefix}>{sem.prefix}</Text>
          </View>
          <View style={styles.semanticContent}>
            <Text style={styles.semanticDesc}>{sem.description}</Text>
            <Text style={styles.semanticExample}>{sem.example}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCompetenciasContent = (content: any) => (
    <View>
      {/* Definições */}
      <View style={styles.definitionCard}>
        <Text style={styles.definitionTitle}>{content.definitions.habilidade.title}</Text>
        <Text style={styles.definitionSubtitle}>{content.definitions.habilidade.subtitle}</Text>
        <Text style={styles.description}>{content.definitions.habilidade.description}</Text>
        <View style={styles.characteristicsContainer}>
          {content.definitions.habilidade.characteristics.map((char: string, idx: number) => (
            <View key={idx} style={styles.characteristicTag}>
              <Text style={styles.characteristicText}>✓ {char}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.definitionCard, { marginTop: 12 }]}>
        <Text style={styles.definitionTitle}>{content.definitions.competencia.title}</Text>
        <Text style={styles.definitionSubtitle}>{content.definitions.competencia.subtitle}</Text>
        <Text style={styles.description}>{content.definitions.competencia.description}</Text>
        <View style={styles.characteristicsContainer}>
          {content.definitions.competencia.characteristics.map((char: string, idx: number) => (
            <View key={idx} style={styles.characteristicTag}>
              <Text style={styles.characteristicText}>✓ {char}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Níveis */}
      <Text style={styles.levelsTitle}>Níveis de Desenvolvimento:</Text>
      {content.levels.map((level: any, idx: number) => (
        <View key={idx} style={styles.levelCard}>
          <Text style={styles.levelIcon}>{level.icon}</Text>
          <Text style={styles.levelName}>{level.name}</Text>
          <Text style={styles.levelDescription}>{level.description}</Text>
          <View style={styles.levelExample}>
            <Text style={styles.levelExampleLabel}>Exemplo:</Text>
            <Text style={styles.levelExampleText}>{level.example}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEpicacoesContent = (content: any) => (
    <View>
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>{content.epicos.title}</Text>
        <Text style={styles.description}>{content.epicos.description}</Text>
        
        <Text style={styles.characteristicsLabel}>Características:</Text>
        {content.epicos.characteristics.map((char: string, idx: number) => (
          <View key={idx} style={styles.characteristicItem}>
            <Text style={styles.characteristicBullet}>▸</Text>
            <Text style={styles.characteristicText2}>{char}</Text>
          </View>
        ))}

        <View style={styles.exampleBox}>
          <Text style={styles.exampleBoxLabel}>Exemplo:</Text>
          <Text style={styles.exampleBoxText}>{content.epicos.example}</Text>
        </View>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>{content.acoes.title}</Text>
        <Text style={styles.description}>{content.acoes.description}</Text>
        
        {content.acoes.items.map((item: any, idx: number) => (
          <View key={idx} style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>→</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionName}>{item.action}</Text>
              <Text style={styles.actionDesc}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* WebView com diagrama animado */}
      <View style={styles.webviewContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          scrollEnabled={false}
          bounces={false}
        />
      </View>

      {/* Conteúdo scrollável */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Central de Ajuda</Text>
          <Text style={styles.headerSubtitle}>
            Entenda como funciona o sistema de gamificação
          </Text>
        </View>

        {helpSections.map(renderSectionCard)}

        {/* Espaçamento para TabBar */}
        <View style={{ height: 120 }} />
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
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  expandIcon: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 8,
  },
  sectionContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 12,
  },
  formulaContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formulaLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  formulaText: {
    fontSize: 13,
    color: '#60a5fa',
    fontFamily: 'monospace',
  },
  componentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 12,
    marginBottom: 8,
  },
  componentItem: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  componentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  componentDetails: {
    fontSize: 12,
    color: '#94a3b8',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  componentDesc: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 16,
    marginBottom: 8,
  },
  exampleItem: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  exampleVersion: {
    fontSize: 13,
    fontWeight: '600',
    color: '#60a5fa',
    fontFamily: 'monospace',
  },
  exampleHex: {
    fontSize: 13,
    color: '#8b5cf6',
    fontFamily: 'monospace',
  },
  exampleMeaning: {
    fontSize: 12,
    color: '#94a3b8',
  },
  interpretationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 12,
    marginBottom: 8,
  },
  interpretationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 8,
  },
  levelIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  interpretationText: {
    flex: 1,
  },
  levelRange: {
    fontSize: 13,
    color: '#e2e8f0',
    fontWeight: '600',
    marginBottom: 2,
  },
  levelName: {
    fontSize: 12,
    fontWeight: '600',
  },
  typesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 12,
    marginBottom: 8,
  },
  typeCard: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  typeName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  typeDescription: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exampleTag: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  exampleTagText: {
    fontSize: 11,
    color: '#60a5fa',
    fontWeight: '500',
  },
  propertiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 16,
    marginBottom: 8,
  },
  propertyItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  propertyBullet: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 8,
    marginTop: 2,
  },
  propertyContent: {
    flex: 1,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 3,
  },
  propertyDesc: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  workflowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 12,
    marginBottom: 12,
  },
  workflowContainer: {
    marginBottom: 16,
  },
  workflowStep: {
    position: 'relative',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stepContent: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  stepAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  stepStatus: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  stepConnector: {
    position: 'absolute',
    left: 15,
    top: 40,
    width: 2,
    height: 24,
    backgroundColor: '#334155',
  },
  semanticsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 16,
    marginBottom: 8,
  },
  semanticItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  semanticBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  semanticPrefix: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  semanticContent: {
    flex: 1,
  },
  semanticDesc: {
    fontSize: 13,
    color: '#e2e8f0',
    marginBottom: 6,
  },
  semanticExample: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },
  definitionCard: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  definitionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  definitionSubtitle: {
    fontSize: 13,
    color: '#3b82f6',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  characteristicsContainer: {
    marginTop: 10,
    gap: 6,
  },
  characteristicTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characteristicText: {
    fontSize: 12,
    color: '#10b981',
  },
  levelsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 16,
    marginBottom: 8,
  },
  levelCard: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  levelIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  levelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  levelDescription: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  levelExample: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  levelExampleLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
  },
  levelExampleText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  characteristicsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 10,
    marginBottom: 6,
  },
  characteristicItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  characteristicBullet: {
    fontSize: 14,
    color: '#3b82f6',
    marginRight: 8,
    marginTop: 1,
  },
  characteristicText2: {
    fontSize: 13,
    color: '#cbd5e1',
    flex: 1,
  },
  exampleBox: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  exampleBoxLabel: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
    marginBottom: 6,
  },
  exampleBoxText: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 18,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionIconText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  actionContent: {
    flex: 1,
  },
  actionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 3,
  },
  actionDesc: {
    fontSize: 12,
    color: '#94a3b8',
  },
});

export default HelpScreen;