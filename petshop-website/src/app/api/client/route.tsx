import dbConnect from "@/database/mongodb"
import client from "@/schemas/client";


/**
 * @swagger
 *  
 * tags:
 * - name: "cliente"
 *   description: "Endpoints relacionados ao cliente"
 * definitions:
 *    Client:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           image:  
 *               type: string 
 *           name:  
 *               type: string 
 *           address:  
 *               type: string 
 *           phone:  
 *               type: number 
 *           cpf:  
 *               type: number
 *           creditcard:  
 *               type: number 
 *           cvc:  
 *               type: number
 *           email:  
 *               type: string 
 *           password:  
 *               type: string   
 *           token:  
 *               type: string   
 * paths:
 *   /api/client:
 *     get:
 *       tags:
 *       - "cliente"
 *       summary: Retorna os clientes
 *       responses:
 *         200:
 *           description: Retorna uma lista de clientes
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/Client"
 *         500:
 *           description: Erro interno do servidor
 *     post:
 *       tags:
 *       - "cliente"
 *       summary: Adiciona um cliente
 *       consumes:
 *         - application/json
 *       parameters:
 *       - in: body
 *         token: string
 *         schema:
 *           $ref: "#/definitions/Client"
 *       responses:
 *         200:
 *           description: Retorna o objeto do cliente adicionado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Client"
 *         400:
 *           description: Erro de solicitação inválida
 *           content:
 *             application/plain:
 *               schema:
 *                 type: string
 *         500:
 *           description: Erro interno do servidor
*/

export async function GET() {
    await dbConnect();
    const clients = await client.find({});
    return new Response(JSON.stringify(clients));
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    const max = await client.findOne({}).sort({ code: -1 });
    data.code = max == null ? 1 : max.code + 1;

    try {
        const clientDoc = await client.create(data)
        return new Response(JSON.stringify(clientDoc));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}