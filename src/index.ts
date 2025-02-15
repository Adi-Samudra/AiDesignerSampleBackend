import { GoogleGenerativeAI } from "@google/generative-ai";
export interface Env {
    api_token: string;
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

        if (request.method === 'GET') {
            // Here you would typically call an AI service to generate the outfit description
            // For this example, we'll just return a mock response
            // const outfitDescription = `A beautiful ${input} inspired Indian ethnic outfit with intricate embroidery and vibrant colors.`
            const api_token = env.api_token;
            const account_id = "b0e6a5b1c1eac4f367363b71681bd4b8";
            const gateway_name = "firstgateway";

            const genAI = new GoogleGenerativeAI(api_token);
            const model = genAI.getGenerativeModel(
                { model: "gemini-2.0-pro-exp-02-05" },
                {
                    baseUrl: `https://gateway.ai.cloudflare.com/v1/${account_id}/${gateway_name}/google-ai-studio`,
                },
            );

            return new Response(JSON.stringify(await model.generateContent(["What is Cloudflare?"])), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Adjust this in production
                },
            })
        }

        return new Response('Method not allowed', { status: 405 })
    },
}