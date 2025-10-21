import { Tabs } from "expo-router";
import TabBar from "../components/TabBar"; // Ajuste o caminho conforme sua estrutura

export default function TabsLayout() {
  return (
    <Tabs
      // ADICIONE ESTA LINHA:
      initialRouteName="index" 
      // --------------------
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 1. HELP */}
      <Tabs.Screen 
        name="help/index" 
        options={{ 
          title: "Help",
          href: "/help"
        }} 
      />

      {/* 2. HOME (Definida como inicial pelo initialRouteName) */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          href: "/"
        }} 
      />

      {/* 3. CODEX */}
      <Tabs.Screen 
        name="codex/index" 
        options={{ 
          title: "Codex",
          href: "/codex"
        }} 
      />

      {/* 4. VISUALIZAÇÕES (Oculta ou visível) */}
      <Tabs.Screen 
        name="visualizacoes/index" 
        options={{ 
          title: "Visualizações",
          href: "/visualizacoes" // Deixe assim para manter visível
          // href: null // Use isto para ocultar
        }} 
      />
    </Tabs>
  );
}