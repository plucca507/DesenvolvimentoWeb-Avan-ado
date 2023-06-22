import dbConnect from "@/database/mongodb"
import product from "@/schemas/product";
import review from "@/schemas/review";


/**
 * @swagger
 *  
 * tags:
 * - name: "avaliação"
 *   description: "Endpoints relacionados as avaliações"
 * definitions:
 *    Review:
 *       type: "object"
 *       properties:  
 *           _id:  
 *                type: string
 *           code:  
 *                type: number
 *           author:  
 *               type: string 
 *           content:  
 *               type: string 
 *           rate:  
 *               type: number 
 *           product:  
 *               type: string 
 * paths:
 *   /api/reviews:
 *     get:
 *       tags:
 *       - "avaliação"
 *       summary: Retorna as avaliações
 *       responses:
 *         200:
 *           description: Retorna uma lista de avaliações
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/Review"
 *         500:
 *           description: Erro interno do servidor
 *     post:
 *       tags:
 *       - "avaliação"
 *       summary: Adiciona uma avaliação
 *       consumes:
 *         - application/json
 *       parameters:
 *       - in: body
 *         token: string
 *         schema:
 *           $ref: "#/definitions/Review"
 *       responses:
 *         200:
 *           description: Retorna o objeto da avaliação adicionada
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Review"
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
    const clients = await review.find({});
    return new Response(JSON.stringify(clients));
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    const max = await review.findOne({}).sort({ code: -1 });
    data.code = max == null ? 1 : max.code + 1;

    try {
        const pDoc = await product.findById(data.product);
        if (!pDoc) throw Error('Produto não encontrado')
        const reviewDoc = await review.create(data)
        await product.updateOne({ '_id': data.product }, { $push: { reviews: reviewDoc } })
        return new Response(JSON.stringify(reviewDoc));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}