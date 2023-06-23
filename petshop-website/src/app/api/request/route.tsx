import dbConnect from "@/database/mongodb"
import request from "@/schemas/request";


/**
 * @swagger
 *  
 * tags:
 * - name: "pedido"
 *   description: "Endpoints relacionados aos pedidos"
 * definitions:
 *    Request:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           price:  
 *               type: number 
 *           products:  
 *               type: array
 *               items:
 *                 schema:
 *                   type: string
 *           client:  
 *               type: string
 *           date:  
 *               type: string
 *           status:  
 *               type: string
 * paths:
 *   /api/requests:
 *     get:
 *       tags:
 *       - "pedido"
 *       summary: Retorna os pedidos
 *       responses:
 *         200:
 *           description: Retorna uma lista de pedidos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/Request"
 *         500:
 *           description: Erro interno do servidor
 *     post:
 *       tags:
 *       - "pedido"
 *       summary: Adiciona um pedido
 *       consumes:
 *         - application/json
 *       parameters:
 *       - in: body
 *         token: string
 *         schema:
 *           $ref: "#/definitions/Request"
 *       responses:
 *         200:
 *           description: Retorna o objeto do pedido adicionado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Request"
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
    const clients = await request.find({});
    return new Response(JSON.stringify(clients));
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    const max = await request.findOne({}).sort({ code: -1 });
    data.code = max == null ? 1 : max.code + 1;

    try {
        const clientDoc = await request.create(data)
        return new Response(JSON.stringify(clientDoc));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}