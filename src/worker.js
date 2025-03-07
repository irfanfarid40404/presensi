export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);

        if (pathname === "/api/data") {
            const result = await env.DB.prepare("SELECT * FROM my_table").all();
            return new Response(JSON.stringify(result), {
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response("Hello from Worker!");
    },
};