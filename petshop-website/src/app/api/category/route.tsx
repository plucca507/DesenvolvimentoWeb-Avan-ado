import dbConnect from "@/database/mongodb"
import category from "@/schemas/category";


/**
 * @swagger
 *  
 * tags:
 * - name: "categoria"
 *   description: "Endpoints relacionados as categorias"
 * definitions:
 *    Category:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           name:  
 *               type: string 
 *           description:  
 *               type: string 
 *    CategoryWithProducts:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           name:  
 *               type: string 
 *           description:  
 *               type: string 
 *           products:  
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Product"
 * paths:
 *   /api/category:
 *     get:
 *       tags:
 *       - "categoria"
 *       summary: Retorna as categorias
 *       responses:
 *         200:
 *           description: Retorna uma lista de categorias
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/Category"
 *         500:
 *           description: Erro interno do servidor
 *     post:
 *       tags:
 *       - "categoria"
 *       summary: Adiciona uma categoria
 *       consumes:
 *         - application/json
 *       parameters:
 *       - in: body
 *         token: string
 *         schema:
 *           $ref: "#/definitions/Category"
 *       responses:
 *         200:
 *           description: Retorna o objeto da categoria adicionada
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Category"
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
    const clients = await category.find({});
    return new Response(JSON.stringify(clients));
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    const max = await category.findOne({}).sort({ code: -1 });
    data.code = max == null ? 1 : max.code + 1;

    try {
        const clientDoc = await category.create(data)
        return new Response(JSON.stringify(clientDoc));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}