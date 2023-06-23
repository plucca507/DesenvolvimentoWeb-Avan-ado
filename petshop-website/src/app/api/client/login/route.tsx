import dbConnect from "@/database/mongodb"
import client from "@/schemas/client";
import bcryptjs from "bcryptjs"
import { Client } from "../../../../../types";
import jwt from "jsonwebtoken"

/**
 * @swagger
 * /api/client/login:
 *   tags:
 *   - "cliente"
 *   post:
 *     tags:
 *     - "cliente"
 *     consumes:
 *       - application/json
 *     summary: Autentica o usuário
 *     parameters:
 *       - name: credentials
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *         200:
 *           description: Retorna o usuário com o seu token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Client"
 *         400:
 *           description: Erro de solicitação inválida
 *           content:
 *             application/plain:
 *               schema:
 *                 type: string
 *         500:
 *           description: Erro interno do servidor
*/

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { email, password } = await req.json()
        let clientDb: Client = await client.findOne({ 'email': email }).select('+password')

        if (!clientDb) {
            return new Response('Usuário não encontrado', { status: 500 })
        }

        if (!await bcryptjs.compare(password, clientDb.password!)) {
            return new Response("Senha inválida", { status: 500 })
        }

        clientDb = JSON.parse(JSON.stringify(clientDb))
        const token = jwt.sign({ code: clientDb.code }, process.env.APP_ID!, {
            expiresIn: 3600
        });
        clientDb.token = token;
        clientDb.password = undefined;
        return new Response(JSON.stringify(clientDb));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}