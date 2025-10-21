import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert('Erro', err.errors?.[0]?.message || 'Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
          height: 100vh;
        }
        
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        
        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }
        
        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
        }
        
        .shape-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
        }
        
        .shape-3 {
          width: 60px;
          height: 60px;
          top: 40%;
          left: 70%;
        }
        
        .shape-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
        }
        
        .shape-5 {
          width: 40px;
          height: 40px;
          top: 10%;
          right: 30%;
        }
      </style>
    </head>
    <body>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
      
      <script>
        // Animação das formas flutuantes
        anime({
          targets: '.shape-1',
          translateY: [-20, 20],
          duration: 3000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        
        anime({
          targets: '.shape-2',
          translateX: [-30, 30],
          duration: 4000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        
        anime({
          targets: '.shape-3',
          rotate: [0, 360],
          scale: [1, 1.2],
          duration: 5000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        
        anime({
          targets: '.shape-4',
          translateY: [20, -20],
          translateX: [10, -10],
          duration: 3500,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        
        anime({
          targets: '.shape-5',
          scale: [1, 1.5],
          opacity: [0.3, 0.8],
          duration: 2500,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Background animado */}
        <View style={styles.webviewContainer}>
          <WebView
            source={{ html: htmlContent }}
            style={styles.webview}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Conteúdo da tela de login */}
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            {/* Logo/Título */}
            <View style={styles.header}>
              <Text style={styles.title}>JDE</Text>
              <Text style={styles.subtitle}>Entre com sua conta Google</Text>
            </View>

            {/* Botão do Google */}
            <View style={styles.form}>
              <TouchableOpacity
                style={[styles.googleButton, isLoading && styles.googleButtonDisabled]}
                onPress={handleGoogleLogin}
                disabled={isLoading}
              >
                <View style={styles.googleButtonContent}>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.googleButtonText}>
                    {isLoading ? 'Entrando...' : 'Entrar com Google'}
                  </Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                Ao entrar, você concorda com nossos termos de uso e política de privacidade.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  keyboardView: {
    flex: 1,
  },
  webviewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  webview: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  loginCard: {
    backgroundColor: 'rgba(13, 17, 23, 0.9)',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58a6ff',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b949e',
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dadce0',
  },
  googleButtonDisabled: {
    backgroundColor: '#ffffff',
    opacity: 0.7,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285f4',
    marginRight: 12,
  },
  googleButtonText: {
    color: '#3c4043',
    fontSize: 16,
    fontWeight: '500',
  },
  disclaimer: {
    fontSize: 12,
    color: '#8b949e',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 16,
  },
});
