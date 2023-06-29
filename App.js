import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./src/components/navigation";
import AuthProvider from "./src/context";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
}
