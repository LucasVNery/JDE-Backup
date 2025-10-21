import { Tabs } from "expo-router";
import TabBar from "../components/TabBar"; // Ajuste o caminho conforme sua estrutura

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 1. HELP */}
      <Tabs.Screen 
        name="help/index" // MUDANÇA: Corresponde ao arquivo help/index.tsx
        options={{ 
          title: "Help",
          href: "/help" // O href (URL) continua o mesmo
        }} 
      />

      {/* 2. HOME */}
      <Tabs.Screen 
        name="index" // Este estava correto (index.tsx)
        options={{ 
          title: "Home",
          href: "/"
        }} 
      />

      {/* 3. CODEX */}
      <Tabs.Screen 
        name="codex/index" // MUDANÇA: Corresponde ao arquivo codex/index.tsx
        options={{ 
          title: "Codex",
          href: "/codex"
        }} 
      />

      {/* TELA OCULTA */}
      <Tabs.Screen 
        name="visualizacoes/index" // MUDANÇA: Corresponde ao arquivo visualizacoes/index.tsx
        options={{ 
          title: "Visualizações",
          href: null // Oculto da TabBar
        }} 
      />
    </Tabs>
  );
}