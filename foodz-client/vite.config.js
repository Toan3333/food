import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/food/",

  build: {
    outDir: "dist", // Thư mục output là 'dist'
    chunkSizeWarningLimit: 1000, // tăng giới hạn lên 1000 KB
  },
});
