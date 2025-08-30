import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer"; // Correct import

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html", // Output file
      open: process.env.NODE_ENV === "production", // Sirf production build mein open karo
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: "/Portfolio/",
  server: {
    https: true, // HTTPS enable karo localhost ke liye
    host: true,
    port: 3000,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Build size kam karne ke liye
    minify: "terser", // Better minification
    terserOptions: {
      compress: {
        drop_console: true, // Console logs remove production mein
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js", // Better caching ke liye hash add karo
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"], // Common dependencies pre-bundle karo
  },
});
