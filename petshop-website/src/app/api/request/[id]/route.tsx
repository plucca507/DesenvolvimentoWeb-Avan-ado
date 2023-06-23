import dbConnect from "@/database/mongodb";
import request from "@/schemas/request";

/**
 * @swagger
 * /api/requests/{codigo}:
 *   tags:
 *   - "pedido"
 *   parameters:
 *     - name: "codigo"
 *       in: "path"
 *       description: "Código do pedido"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *   get:
 *     tags:
 *     - "pedido"
 *     summary: Retorna o pedido
 *     responses:
 *       200:
 *         description: Retorna o objeto do pedido
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Request"
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     tags:
 *     - "pedido"
 *     summary: Altera um pedido
 *     consumes:
 *         - application/json
 *     parameters:
 *       - in: body
 *         token: string
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Request"
 *     responses:
 *       200:
 *         description: Retorna o objeto alterado do pedido
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Request"
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
 *     - "pedido"
 *     summary: Deleta um pedido
 *     responses:
 *       200:
 *         description: Pedido deletado, nenhum corpo de resposta retornado
 *       500:
 *         description: Erro interno do servidor
*/

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const clientDb = await request.findOne({ 'code': id });
    if (!clientDb) return new Response('Pedido desconhecido', { status: 404 })
    return new Response(JSON.stringify(clientDb))
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const data = await req.json();
    const _id = String((await request.findOne({ 'code': id }))._id);
    await request.findByIdAndUpdate(_id, data);
    return new Response(JSON.stringify(await request.findById(_id)))
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const _id = String((await request.findOne({ 'code': id }))._id);
    await request.findByIdAndRemove(_id);
    return new Response()
}