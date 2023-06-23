import dbConnect from "@/database/mongodb";
import review from "@/schemas/review";

/**
 * @swagger
 * /api/review/{codigo}:
 *   tags:
 *   - "avaliação"
 *   parameters:
 *     - name: "codigo"
 *       in: "path"
 *       description: "Código da avaliação"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *   get:
 *     tags:
 *     - "avaliação"
 *     summary: Retorna a avaliação
 *     responses:
 *       200:
 *         description: Retorna o objeto da avaliação
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Review"
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     tags:
 *     - "avaliação"
 *     summary: Altera uma avaliação
 *     consumes:
 *         - application/json
 *     parameters:
 *       - in: body
 *         token: string
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Review"
 *     responses:
 *       200:
 *         description: Retorna o objeto alterado da avaliação
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Review"
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
 *     - "avaliação"
 *     summary: Deleta uma avaliação
 *     responses:
 *       200:
 *         description: Avaliação deletada, nenhum corpo de resposta retornado
 *       500:
 *         description: Erro interno do servidor
*/

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const clientDb = await review.findOne({ 'code': id });
    if (!clientDb) return new Response('Pedido desconhecido', { status: 404 })
    return new Response(JSON.stringify(clientDb))
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const data = await req.json();
    const _id = String((await review.findOne({ 'code': id }))._id);
    await review.findByIdAndUpdate(_id, data);
    return new Response(JSON.stringify(await review.findById(_id)))
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const _id = String((await review.findOne({ 'code': id }))._id);
    await review.findByIdAndRemove(_id);
    return new Response()
}