"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import { swaggerDocs, swaggerUI } from "./documentacion.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/User/user.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import createAdminUser from "../src/auth/auth.controller.js"
import productsRoutes from "../src/Product/products.routes.js"
import createDCategory from "../src/Category/category.controller.js"
import categoryRoutes from "../src/Category/category.routes.js"
import cartRoutes from "../src/Cart/cart.routes.js"
import orderRoutes from "../src/order/order.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/supermarket/v1/auth", authRoutes)
    app.use("/supermarket/v1/user", userRoutes)
    app.use("/supermarket/v1/category", categoryRoutes)
    app.use("/supermarket/v1/product", productsRoutes)
    app.use("/supermarket/v1/cart", cartRoutes)
    app.use("/supermarket/v1/order" , orderRoutes)
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        createDCategory()
        createAdminUser()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}
