import { fileURLToPath } from "node:url";

const nextConfig = {
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/ask", destination: "https://www.mathskim.com/ask", permanent: false },
      { source: "/en/ask", destination: "https://www.mathskim.com/en/ask", permanent: false },
    ];
  },
};

export default nextConfig;
