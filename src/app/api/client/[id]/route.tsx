import dbConnect from "@/database/mongodb";
import client from "@/schemas/client";

/**
 * @swagger
 * /api/client/{codigo}:
 *   tags:
 *   - "cliente"
 *   parameters:
 *     - name: "codigo"
 *       in: "path"
 *       description: "Código do usuário"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *   get:
 *     tags:
 *     - "cliente"
 *     summary: Retorna o cliente
 *     responses:
 *       200:
 *         description: Retorna o objeto do cliente
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Client"
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     tags:
 *     - "cliente"
 *     summary: Altera um cliente
 *     consumes:
 *         - application/json
 *     parameters:
 *       - in: body
 *         token: string
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Client"
 *     responses:
 *       200:
 *         description: Retorna o objeto alterado do cliente
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Client"
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
 *     - "cliente"
 *     summary: Deleta um cliente
 *     responses:
 *       200:
 *         description: Usuário deletado, nenhum corpo de resposta retornado
 *       500:
 *         description: Erro interno do servidor
*/

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const clientDb = await client.findOne({ 'code': id });
    if (!clientDb) return new Response('Cliente desconhecido', { status: 404 })
    return new Response(JSON.stringify(clientDb))
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const data = await req.json();
    const _id = String((await client.findOne({ 'code': id }))._id);
    await client.findByIdAndUpdate(_id, data);
    return new Response(JSON.stringify(await client.findById(_id)))
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    await dbConnect();
    const _id = String((await client.findOne({ 'code': id }))._id);
    await client.findByIdAndRemove(_id);
    return new Response()
}