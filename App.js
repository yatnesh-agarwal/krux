import "./global.css";
import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import Header from "./components_feed/Header";
import { StatusBar } from "expo-status-bar";
import Footer from "./components_feed/Footer";
import Feed from "./components_feed/Feed/Feed";

const MeshBackground = () => {
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: "#030402" }]}
      pointerEvents="none"
    >
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          {/* 1. Top-Left Ambient Glow (Behind KRUX logo) */}
          <RadialGradient
            id="topLeftGlow"
            cx="8%"
            cy="12%"
            rx="55%"
            ry="22%"
            fx="8%"
            fy="12%"
          >
            <Stop offset="0%" stopColor="#3D5215" stopOpacity="0.65" />
            <Stop offset="45%" stopColor="#1E2909" stopOpacity="0.28" />
            <Stop offset="100%" stopColor="#030402" stopOpacity="0" />
          </RadialGradient>

          {/* 2. Upper-Right Bright Edge Spot */}
          <RadialGradient
            id="topRightSpot"
            cx="102%"
            cy="18%"
            rx="38%"
            ry="14%"
            fx="102%"
            fy="18%"
          >
            <Stop offset="0%" stopColor="#658822" stopOpacity="0.85" />
            <Stop offset="45%" stopColor="#31440E" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#030402" stopOpacity="0" />
          </RadialGradient>

          {/* 3. Lower-Left Subtle Edge Glow */}
          <RadialGradient
            id="bottomLeftGlow"
            cx="-5%"
            cy="78%"
            rx="48%"
            ry="18%"
            fx="-5%"
            fy="78%"
          >
            <Stop offset="0%" stopColor="#435B16" stopOpacity="0.5" />
            <Stop offset="50%" stopColor="#1B2608" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#030402" stopOpacity="0" />
          </RadialGradient>

          {/* 4. Bottom-Right Glow (Behind action buttons / audio bar) */}
          <RadialGradient
            id="bottomRightGlow"
            cx="96%"
            cy="82%"
            rx="55%"
            ry="20%"
            fx="96%"
            fy="82%"
          >
            <Stop offset="0%" stopColor="#58771E" stopOpacity="0.7" />
            <Stop offset="50%" stopColor="#26350B" stopOpacity="0.28" />
            <Stop offset="100%" stopColor="#030402" stopOpacity="0" />
          </RadialGradient>

          {/* 5. Center Blackout Vignette (Ensures deep black behind the puzzle grid) */}
          <RadialGradient
            id="centerBlackout"
            cx="50%"
            cy="48%"
            rx="55%"
            ry="34%"
            fx="50%"
            fy="48%"
          >
            <Stop offset="0%" stopColor="#020301" stopOpacity="0.96" />
            <Stop offset="65%" stopColor="#030402" stopOpacity="0.75" />
            <Stop offset="100%" stopColor="#030402" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Outer Edge Glows */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#topLeftGlow)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#topRightSpot)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomLeftGlow)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomRightGlow)" />

        {/* Center Darkening Layer */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#centerBlackout)" />
      </Svg>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Absolute Background Mesh Gradient */}
        <MeshBackground />

        {/* Foreground Content */}
        <SafeAreaView style={styles.safeArea}>
          <Header />
          <View style={{ flex: 1 }}>
            <Feed />
          </View>
          <Footer />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030402",
  },
  safeArea: {
    flex: 1,
  },
});

export default App;