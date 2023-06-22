import dbConnect from "@/database/mongodb"
import client from "@/schemas/client";
import bcryptjs from "bcryptjs"
import { CartProductItem, Client, ProductItem } from '../../../../../types'
import jwt from "jsonwebtoken"
import product from "@/schemas/product";
require('@/schemas/product')

/**
 * @swagger
 * /api/client/getdata:
 *   tags:
 *   - "cliente"
 *   post:
 *     tags:
 *     - "cliente"
 *     consumes:
 *       - application/json
 *     description: Obtem informações sensíveis do cliente
 *
 *     requestBody:
 *           description: Insira abaixo o seu **token** de autenticação (JWT)
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *     
 *     responses:
 *       200:
 *         description: Retorna o objeto do cliente com informações sensíveis
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/definitions/Client"
*/

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { token }: {
            token: string
        } = await req.json();

        if (!jwt.verify(token, process.env.APP_ID!)) throw Error("Token invalido")
        let user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const clientDb: Client = await client.findOne({ 'code': user.code }).select('+creditcard').select('+cvc')

        return new Response(JSON.stringify(clientDb))
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}