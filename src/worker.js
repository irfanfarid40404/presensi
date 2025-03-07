export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // Serve static files from the `dist` directory
      if (url.pathname === "/" || url.pathname === "/index.html") {
        return fetchStaticFile("index.html");
      } else if (url.pathname.startsWith("/assets/")) {
        return fetchStaticFile(url.pathname);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },
  };
  
  async function fetchStaticFile(path) {
    // Remove leading slash from path
    const filePath = path.startsWith("/") ? path.slice(1) : path;
  
    // Fetch the file from the `dist` directory
    const file = await fetch(`https://your-storage-url.com/${filePath}`);
    if (file.status === 200) {
      return new Response(file.body, {
        headers: { "Content-Type": getContentType(filePath) },
      });
    } else {
      return new Response("File Not Found", { status: 404 });
    }
  }
  
  function getContentType(filePath) {
    if (filePath.endsWith(".html")) {
      return "text/html";
    } else if (filePath.endsWith(".css")) {
      return "text/css";
    } else if (filePath.endsWith(".js")) {
      return "application/javascript";
    } else if (filePath.endsWith(".png")) {
      return "image/png";
    } else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
      return "image/jpeg";
    } else {
      return "text/plain";
    }
  }