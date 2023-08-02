import Navigation from "./src/components/Navigation";
import React from "react";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
