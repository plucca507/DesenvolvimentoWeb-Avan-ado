import dbConnect from "@/database/mongodb"
import product from "@/schemas/product";

/**
 * @swagger
 *  
 * tags:
 * - name: "produto"
 *   description: "Endpoints relacionados aos produto"
 * definitions:
 *    Product:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           name:  
 *               type: string 
 *           image:  
 *               type: string 
 *           description:  
 *               type: string 
 *           cover:  
 *               type: string 
 *           price:  
 *               type: number
 *           category:  
 *               type: string 
 *           animal:  
 *               type: string
 *           reviews:  
 *               type: array
 *               items:
 *                  type: string
 *           stock:  
 *               type: number  
 * paths:
 *   /api/product:
 *     get:
 *       tags:
 *       - "produto"
 *       summary: Retorna os produtos
 *       responses:
 *         200:
 *           description: Retorna uma lista de produtos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/Product"
 *         500:
 *           description: Erro interno do servidor
 *     post:
 *       tags:
 *       - "produto"
 *       summary: Adiciona um produto
 *       consumes:
 *         - application/json
 *       parameters:
 *       - in: body
 *         token: string
 *         schema:
 *           $ref: "#/definitions/Product"
 *       responses:
 *         200:
 *           description: Retorna o objeto do produto adicionado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Product"
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
    const clients = await product.find({});
    return new Response(JSON.stringify(clients));
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    const max = await product.findOne({}).sort({ code: -1 });
    data.code = max == null ? 1 : max.code + 1;

    try {
        const clientDoc = await product.create(data)
        return new Response(JSON.stringify(clientDoc));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}