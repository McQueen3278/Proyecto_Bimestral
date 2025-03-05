import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Supermarket API",
            version:"1.0.0",
            description: "API para sistema de supermercado",
            contact:{
                name: "Harol Rodriguez",
                email: "hrodriguez-2023278@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/supermarket/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/Product/*.js",
        "./src/order/*.js",
        "./src/Category/*.js",
        "./src/cart/*.js"

        
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUI }
