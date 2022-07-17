import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    if(req.method === 'POST') {
        const {nombre, total, fecha, pedido} = req.body
        
        const orden = await prisma.orden.create({
            data: {
                nombre,
                total,
                fecha,
                pedido
            }
        })

        res.json(orden)
    } 
}