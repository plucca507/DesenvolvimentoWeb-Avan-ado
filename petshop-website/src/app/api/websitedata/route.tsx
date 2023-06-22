import dbConnect from "@/database/mongodb"
import category from "@/schemas/category";
import product from "@/schemas/product";

/**
 * @swagger
 * tags:
 * - name: "website"
 *   description: "Endpoints relacionados ao website"
 * /api/website/getdata:
 *   post:
 *     tags:
 *       - "website"
 *     description: Busca todos os produtos relacionando-os com a categoria correspondente
 * 
 *     responses:
 *       200:
 *         description: Retorna uma lista contendo todos os itens validados pelo servidor
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/CategoryWithProducts"
*/

export async function GET(req: Request) {
    await dbConnect();

    const categoriesMap = new Map()

    const products = await product.find({});
    products.forEach(p => {
        if (!categoriesMap.has(p.category.toString())) {
            return categoriesMap.set(p.category.toString(), [p])
        }
        categoriesMap.set(p.category, [...categoriesMap.get(p.category.toString()), p])
    })

    const dbResult = await category.find({});
    const categories = JSON.parse(JSON.stringify(dbResult));
    categories.forEach((c: { products: any; _id: { toString: () => any; } }) => {
        c.products = categoriesMap.get(c._id.toString())
    })

    return new Response(JSON.stringify(categories))
}