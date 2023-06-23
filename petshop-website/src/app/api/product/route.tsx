import dbConnect from "@/database/mongodb"
import category from "@/schemas/category";
import product from "@/schemas/product";
require('@/schemas/product')
require('@/schemas/category')

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
 *     patch:
 *       tags:
 *         - "produto"
 *       description: Busca todos os produtos relacionando-os com a categoria correspondente
 * 
 *       responses:
 *         200:
 *           description: Retorna uma lista contendo todos os itens validados pelo servidor
 *           content:
 *               application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/CategoryWithProducts"
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

export async function PATCH() {
    await dbConnect();

    const categoriesMap = new Map()

    const products = await product.find({});
    products.forEach(p => {
        if (!categoriesMap.has(p.category.toString())) {
            return categoriesMap.set(p.category.toString(), [p])
        }
        categoriesMap.set(p.category.toString(), [...categoriesMap.get(p.category.toString()), p])
    })

    const dbResult = await category.find({});
    console.log('triggered')
    console.log(dbResult)
    let categories = JSON.parse(JSON.stringify(dbResult));
    categories.forEach((c: { products: any; _id: { toString: () => any; } }) => {
        c.products = categoriesMap.get(c._id.toString())
    })

    return new Response(JSON.stringify(categories))
}