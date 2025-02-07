export interface Env {
    // Add any environment variables here
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        if (request.method === 'POST') {
            const { input } = await request.json() as { input: string }

            // Here you would typically call an AI service to generate the outfit description
            // For this example, we'll just return a mock response
            const outfitDescription = `A beautiful ${input} inspired Indian ethnic outfit with intricate embroidery and vibrant colors.`

            return new Response(JSON.stringify({ result: outfitDescription }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Adjust this in production
                },
            })
        }

        return new Response('Method not allowed', { status: 405 })
    },
}