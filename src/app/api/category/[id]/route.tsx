import dbConnect from "@/database/mongodb";
import category from "@/schemas/category";

/**
 * @swagger
 * /api/category/{codigo}:
 *   tags:
 *   - "categoria"
 *   parameters:
 *     - name: "codigo"
 *       in: "path"
 *       description: "Código da categoria"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *   get:
 *     tags:
 *     - "categoria"
 *     summary: Retorna a categoria
 *     responses:
 *       200:
 *         description: Retorna o objeto da categoria
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Category"
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     tags:
 *     - "categoria"
 *     summary: Altera uma categoria
 *     consumes:
 *         - application/json
 *     parameters:
 *       - in: body
 *         token: string
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Category"
 *     responses:
 *       200:
 *         description: Retorna o objeto alterado da categoria
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Category"
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
 *     - "categoria"
 *     summary: Deleta uma categoria
 *     responses:
 *       200:
 *         description: Categoria deletada, nenhum corpo de resposta retornado
 *         500:
 *           description: Erro interno do servidor
*/

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const clientDb = await category.findOne({ 'code': id });
    if (!clientDb) return new Response('Categoria desconhecida', { status: 404 })
    return new Response(JSON.stringify(clientDb))
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const data = await req.json();
    const _id = String((await category.findOne({ 'code': id }))._id);
    await category.findByIdAndUpdate(_id, data);
    return new Response(JSON.stringify(await category.findById(_id)))
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const _id = String((await category.findOne({ 'code': id }))._id);
    await category.findByIdAndRemove(_id);
    return new Response()
}