import dbConnect from "@/database/mongodb"
import client from "@/schemas/client";
import bcryptjs from "bcryptjs"
import { CartProductItem, ProductItem } from '../../../../../types'
import jwt from "jsonwebtoken"
import product from "@/schemas/product";
require('@/schemas/product')

/**
 * @swagger
 * tags:
 * - name: "checkout"
 *   description: "Endpoints relacionados ao checkout"
 * definitions:
 *    CartItem:
 *       type: "object"
 *       properties:  
 *           productId:  
 *                type: number
 *           timestamp:  
 *               type: number 
 *           qnt:  
 *               type: number 
 *    ResolvedCartItem:
 *       type: "object"
 *       properties:  
 *           productId:  
 *                type: number
 *           timestamp:  
 *               type: number 
 *           qnt:  
 *               type: number 
 *           productItem:
 *               $ref: "#/definitions/Product"
 * /api/checkout/getitems:
 *   post:
 *     tags:
 *       - "checkout"
 *     description: Traduz o conteúdo do carrinho e seus correspondentes itens
 * 
 *     requestBody:
 *           description: Insira abaixo o conteúdo do carrinho que pode ser extraido do localstorage
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   items:
 *                     type: array
 *                     items:
 *                         $ref: "#/definitions/CartItem"
 *     responses:
 *       200:
 *         description: Retorna uma lista contendo todos os itens validados pelo servidor
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/definitions/ResolvedCartItem"
*/

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { items }: {
            items: [CartProductItem]
        } = await req.json();

        const products: ProductItem[] = [];

        for (const p of items) {
            const productItem = await product.findOne({ 'code': p.productId })
            if (productItem) products.push({ ...p, productItem })
        }

        return new Response(JSON.stringify(products))
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(`Erro: ${error.message}`, { status: 400 })
        }
        return new Response("Erro inesperado", { status: 400 })
    }
}