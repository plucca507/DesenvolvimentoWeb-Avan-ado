import dbConnect from "@/database/mongodb";
import product from "@/schemas/product";
import { Review } from "../../../../../types";
require('@/schemas/review')
require('@/schemas/category')

/**
 * @swagger
 * /api/product/{codigo}:
 *   tags:
 *   - "produto"
 *   parameters:
 *     - name: "codigo"
 *       in: "path"
 *       description: "Código do usuário"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *   get:
 *     tags:
 *     - "produto"
 *     summary: Retorna o produto
 *     responses:
 *       200:
 *         description: Retorna o objeto do produto
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Product"
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     tags:
 *     - "produto"
 *     summary: Altera um produto
 *     consumes:
 *         - application/json
 *     parameters:
 *       - in: body
 *         token: string
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Product"
 *     responses:
 *       200:
 *         description: Retorna o objeto alterado do produto
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Product"
 *       400:
 *         description: Erro de solicitação inválida
 *         content:
 *           application/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     tags:
 *     - "produto"
 *     summary: Deleta um produto
 *     responses:
 *       200:
 *         description: Produto deletado, nenhum corpo de resposta retornado
 *       500:
 *         description: Erro interno do servidor
*/

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    let productDb = await product.findOne({ 'code': id }).populate('category').populate('reviews');
    if (!productDb) return new Response('Produto desconhecido', { status: 404 })
    const rate = productDb.reviews.map((r: Review) => r.rate);
    const avarage = (arr: any[]) => arr.reduce((p: number, c: number) => p + c, 0) / arr.length;
    productDb = JSON.parse(JSON.stringify(productDb));
    productDb.rate = avarage(rate);
    return new Response(JSON.stringify(productDb))
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const data = await req.json();
    const _id = String((await product.findOne({ 'code': id }))._id);
    await product.findByIdAndUpdate(_id, data);
    return new Response(JSON.stringify(await product.findById(_id)))
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const _id = String((await product.findOne({ 'code': id }))._id);
    await product.findByIdAndRemove(_id);
    return new Response()
}