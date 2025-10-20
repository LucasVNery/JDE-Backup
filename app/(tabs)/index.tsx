import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

export default function HomeScreen() {
  const [performanceScore] = useState(87);
  const [groupRanking] = useState(3);
  const [houseRanking] = useState(12);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animação do score de performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(performanceScore);
    }, 500);
    return () => clearTimeout(timer);
  }, [performanceScore]);

  // Mini indicador de performance COM SVG
  const MiniPerformanceIndicator = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 12;
    const strokeDashoffset = circumference - ((animatedScore / 100) * circumference);

    return (
      <View style={styles.performanceContainer}>
        <View style={styles.performanceCircle}>
          <Svg width={32} height={32}>
            <Circle
              cx="16"
              cy="16"
              r="12"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            <Circle
              cx="16"
              cy="16"
              r="12"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </Svg>
          <View style={styles.performanceCenter}>
            <Text style={styles.performanceNumber}>{score}</Text>
          </View>
        </View>
        <Text style={styles.performanceLabel}>Performance</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Background decorativo */}
      <View style={styles.backgroundDecor1} />
      <View style={styles.backgroundDecor2} />

      {/* Header minimalista */}
      <View style={styles.header}>
        <MiniPerformanceIndicator score={performanceScore} />

        <View style={styles.rightHeaderGroup}>
          {/* Rankings compactos */}
          <View style={styles.rankingsContainer}>
            <View style={styles.rankingItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>👥</Text>
              </View>
              <Text style={styles.rankingText}>#{groupRanking}</Text>
            </View>
            <View style={styles.rankingItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🏆</Text>
              </View>
              <Text style={styles.rankingText}>#{houseRanking}</Text>
            </View>
          </View>

          {/* Botão de Perfil */}
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Área central para gitflow */}
      <View style={styles.centralArea}>
        <View style={styles.planningSection}>
          {/* Título da seção */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Planejamento</Text>
            <Text style={styles.subtitle}>Organize seus próximos passos</Text>
          </View>

          {/* Área de gitflow simplificada */}
          <View style={styles.gitflowContainer}>
            {/* Linha principal */}
            <View style={styles.mainBranch}>
              <View style={styles.branchSegment1} />
              <View style={styles.branchSegment2} />
              <View style={styles.branchSegment3} />
            </View>

            {/* Nós principais */}
            <View style={[styles.gitNode, styles.nodeBlue, { left: 16, top: -4 }]} />
            <View style={[styles.gitNode, styles.nodePurple, { left: '50%', marginLeft: -8, top: -4 }]} />
            <View style={[styles.gitNode, styles.nodePink, { right: 16, top: -4 }]} />

            {/* Branches secundárias */}
            <View style={styles.secondaryBranches}>
              <View style={styles.branchRow}>
                <View style={[styles.branchLine, { backgroundColor: '#10b981' }]} />
                <View style={[styles.smallNode, styles.nodeGreen]} />
              </View>

              <View style={[styles.branchRow, { marginLeft: 32 }]}>
                <View style={[styles.branchLine, { backgroundColor: '#06b6d4' }]} />
                <View style={[styles.smallNode, styles.nodeCyan]} />
              </View>

              <View style={[styles.branchRow, { marginLeft: 16 }]}>
                <View style={[styles.branchLine, { backgroundColor: '#f97316' }]} />
                <View style={[styles.smallNode, styles.nodeOrange]} />
              </View>
            </View>
          </View>

          {/* Botão de ação */}
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonIcon}>+</Text>
              <Text style={styles.buttonText}>Novo Plano</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundDecor1: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 75,
  },
  backgroundDecor2: {
    position: 'absolute',
    bottom: 200,
    right: 50,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(147, 51, 234, 0.03)',
    borderRadius: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  rightHeaderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceCircle: {
    width: 32,
    height: 32,
    marginRight: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  performanceCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  performanceNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  rankingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
  },
  rankingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 4,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileIcon: {
    fontSize: 18,
  },
  centralArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginBottom: 100,
  },
  planningSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  gitflowContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 32,
    position: 'relative',
  },
  mainBranch: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    marginBottom: 32,
  },
  branchSegment1: {
    flex: 1,
    backgroundColor: '#3b82f6',
    opacity: 0.6,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  branchSegment2: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    opacity: 0.6,
  },
  branchSegment3: {
    flex: 1,
    backgroundColor: '#ec4899',
    opacity: 0.6,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  gitNode: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  nodeBlue: {
    backgroundColor: '#3b82f6',
  },
  nodePurple: {
    backgroundColor: '#8b5cf6',
  },
  nodePink: {
    backgroundColor: '#ec4899',
  },
  secondaryBranches: {
    marginTop: 16,
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  branchLine: {
    width: 12,
    height: 2,
    marginRight: 12,
    opacity: 0.5,
  },
  smallNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  nodeGreen: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  nodeCyan: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  nodeOrange: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  actionButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonIcon: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#3b82f6',
    fontWeight: '500',
    marginLeft: 8,
  },
});