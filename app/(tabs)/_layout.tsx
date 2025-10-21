import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="login/index"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* LOGIN - Rota inicial */}
      <Tabs.Screen 
        name="login/index" 
        options={{ 
          title: "Login",
          href: "/login"
        }} 
      />

      {/* HOME */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          href: "/"
        }} 
      />

      {/* HELP */}
      <Tabs.Screen 
        name="help/index" 
        options={{ 
          title: "Help",
          href: "/help"
        }} 
      />

      {/* CODEX */}
      <Tabs.Screen 
        name="codex/index" 
        options={{ 
          title: "Codex",
          href: "/codex"
        }} 
      />

      {/* VISUALIZAÇÕES */}
      <Tabs.Screen 
        name="visualizacoes/index" 
        options={{ 
          title: "Visualizações",
          href: "/visualizacoes"
        }} 
      />
    </Tabs>
  );
}