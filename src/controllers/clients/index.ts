import prismaClient from "../../lib";
import { Request, Response } from 'express'
import { ClientFormProps } from "../../@types";
import { verifyUserId } from '../../connections';
import { BadRequesError, InternalError, NotFoundError } from '../../errors';

export class ClientsController {
    async create(request: Request, response: Response) {
        const {
            name,
            age,
            gender,
            city,
            street,
            contact,
            house_number,
            neighborhood }: ClientFormProps = request.body

        const userId = request.user.id;

        try {
            if (!userId) {
                throw new NotFoundError("Nenhum usuário encontrado.");
            } else {
                const ageIsNegative = (Number(age) <= 0);
                const houseNumberIsNegative = (Number(house_number) <= 0);

                if (ageIsNegative) throw new BadRequesError("A idade precisa ser um valor válido!");
                if (houseNumberIsNegative) throw new BadRequesError("O número da casa precisa ser um valor válido!");

                const client = await prismaClient.clients.create({
                    data: {
                        name,
                        age,
                        gender,
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
                return response.status(200).json({ client, message: "Cliente registrado com sucesso!" });
            }
        } catch (error: any) {
            if (!error.statusCode) error = new InternalError("Error interno.")
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response) {
        const {
            name,
            age,
            gender,
            city,
            street,
            contact,
            house_number,
            neighborhood }: ClientFormProps = request.body

        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do cliente é inválido ou não existe!");

            const findClient = await prismaClient.clients.findFirst({
                where: { id }
            })

            if (!findClient) {
                throw new NotFoundError("Nenhum cliente foi encontrado.")
            } else {
                const ageIsNegative = (Number(age) <= 0);
                const houseNumberIsNegative = (Number(house_number) <= 0);

                if (ageIsNegative) throw new BadRequesError("A idade precisa ser um valor válido!");
                if (houseNumberIsNegative) throw new BadRequesError("O número da casa precisa ser um valor válido!");

                const client = await prismaClient.clients.update({
                    where: { id },
                    data: {
                        name,
                        age,
                        gender,
                        city,
                        street,
                        contact,
                        house_number,
                        neighborhood
                    }
                });
                return response.status(200).json({ client, message: "Cliente atualizado com sucesso!" });
            }
        } catch (error: any) {
            if (!error.statusCode) error = new InternalError("Error interno.")
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do cliente é inválido ou não existe!");

            const findClient = await prismaClient.clients.findFirst({
                where: { id }
            })

            if (!findClient) {
                throw new NotFoundError("Nenhum cliente foi encontrado.");
            } else {
                const client = await prismaClient.clients.delete({
                    where: { id }
                });
                return response.status(200).json({ client, message: "Cliente deletado com sucesso!" });
            }
        } catch (error: any) {
            if (!error.statusCode) error = new InternalError("Error interno.")
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async profile(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do cliente é inválido ou não existe!");

            const client = await prismaClient.clients.findFirst({
                where: { id }
            });

            if (!client) throw new NotFoundError("Nenhum cliente foi encontrado.");

            return response.status(200).json(client);
        } catch (error: any) {
            if (!error.statusCode) error = new InternalError("Error interno.")
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async clients(request: Request, response: Response) {
        const userId = request.user.id;

        try {
            if (!userId) {
                throw new NotFoundError("Nenhum usuário encontrado.");
            } else {
                const clients = await prismaClient.clients.findMany({
                    where: { userId }
                });
                return response.status(200).json(clients);
            };
        } catch (error: any) {
            if (!error.statusCode) error = new InternalError("Error interno.")
            return response.status(error.statusCode).json({ error: error.message });
        }
    }
}