const port = 8095;

module.exports = {
  base: "/",
  server: {
    host: true,
    port,
    open: "src/index.html",
    strictPort: true,
    fs: {
      strict: false,
    },
    cors: true,
  },
};
