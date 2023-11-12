import { defineConfig, HttpProxy, ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const configureFn = (proxy: HttpProxy.Server, options: ProxyOptions): void => {
  proxy.on("error", (err) => {
    console.log("Http proxy error", err);
  });
  proxy.on("proxyReq", (proxyReq, req) => {
    console.log(
      "Proxy Sending Request to the Target:",
      req.method,
      req.url,
      "target: ",
      options.target,
    );
  });
  proxy.on("proxyRes", (proxyRes, req) => {
    console.log(
      "Proxy Received Response from the Target:",
      proxyRes.statusCode,
      req.url,
    );
  });
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1/api": {
        target: "http://calculator-backend:8080",
        changeOrigin: true,
        secure: false,
        configure: configureFn,
        rewrite: (path) => path.replace(/^\/v1\/api/, "/v1/equation"),
      },
    },
  },
});
