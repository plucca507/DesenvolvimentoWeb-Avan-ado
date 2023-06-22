import { createSwaggerSpec } from "next-swagger-doc"

import "server-only"

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "src/app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Petshop Api - Trabalho Bimestral",
                version: "1.0",
            },
            components: {
                // securitySchemes: {
                //     token: {
                //         type: "apiKey",
                //         in: "query",
                //         name: "token"
                //     },
                // },
            },
            security: [],
        },
    })
    return spec
}