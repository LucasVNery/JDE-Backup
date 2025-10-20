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
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          href: "/"
        }} 
      />
      <Tabs.Screen 
        name="help" 
        options={{ 
          title: "Help",
          href: "/help"
        }} 
      />
      <Tabs.Screen 
        name="visualizacoes" 
        options={{ 
          title: "Visualizações",
          href: "/visualizacoes"
        }} 
      />
      <Tabs.Screen 
        name="codex" 
        options={{ 
          title: "Codex",
          href: "/codex"
        }} 
      />
    </Tabs>
  );
}