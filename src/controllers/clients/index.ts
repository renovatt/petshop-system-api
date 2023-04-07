import { Request, Response } from 'express'
import { ClientFormProps } from "../../@types";
import prismaClient from "../../lib";

export class CreateClientController {
    async handle(request: Request, response: Response) {
        const {
            name,
            age,
            sex,
            city,
            street,
            contact,
            house_number,
            neighborhood,
            userId }: ClientFormProps = request.body

        const client = await prismaClient.clients.create({
            data: {
                name,
                age,
                sex,
                city,
                street,
                contact,
                house_number,
                neighborhood,
                user: {
                    connect: { id: userId }
                }
            },
        });
        return response.json(client)
    }
}