import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~admin": "/src/admin",
      "~client": "/src/client",
      "~shared": "/src/shared",
      "~assets": "/src/assets",
      "~router": "/src/router",
      "~store": "/src/store",
      "~types": "/src/types",
    },
  },
});
