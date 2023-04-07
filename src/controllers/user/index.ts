import jwt from 'jsonwebtoken';
import prismaClient from "../../lib";
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { UserFormProps } from "../../@types";
import { BadRequesError } from '../../errors';
import { hashPassword, verifyPassword, verifyUserId } from '../../bcrypt';

export class UserController {
    async create(request: Request, response: Response) {

        const { id, username, email, password }: UserFormProps = request.body

        try {
            const userExists = await prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });

            if (userExists) throw new BadRequesError("Já existe um usuário com este e-mail.");

            const hashedPassword = await hashPassword(password);

            const newUSer = await prismaClient.user.create({
                data: {
                    id,
                    email,
                    username,
                    password: hashedPassword
                },
            });

            const user: Omit<Prisma.UserCreateInput, "password"> = {
                id: newUSer.id,
                username: newUSer.username,
                email: newUSer.email,
            }

            return response.status(201).json({ user, message: "Usuário foi criado com sucesso!" });
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }

    async login(request: Request, response: Response) {

        const { email, password } = request.body

        try {
            const foundUser = await prismaClient.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!foundUser) throw new BadRequesError("Usuário não encontrado.");

            const passwordMatch = await verifyPassword(password, foundUser.password);
            if (!passwordMatch) throw new BadRequesError("Senha está incorreta.");

            const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET ?? "", { expiresIn: "8h" });

            const user: Omit<Prisma.UserCreateInput, "password"> = {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
            }

            return response.status(201).json({ user, token });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response) {

        const { id } = request.params;
        const { username, email, password }: UserFormProps = request.body;

        try {

            if (verifyUserId(id)) throw new BadRequesError("O ID do usuário é inválido ou não existe!");

            const findUser = await prismaClient.user.findUnique({
                where: { id }
            })

            if (!findUser) {
                throw new BadRequesError("Não existe nenhum usuário com essas informações.")
            } else {
                const hashedPassword = await hashPassword(password);
                
                const updatedUser = await prismaClient.user.update({
                    where: { id },
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                    }
                })

                const user: Omit<Prisma.UserCreateInput, "password"> = {
                    id: updatedUser.id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                }

                return response.status(201).json(user)
            }
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do usuário é inválido ou não existe!");

            const findUser = await prismaClient.user.findUnique({
                where: { id }
            })

            if (!findUser) {
                throw new BadRequesError("Este usuário já foi deletado ou não existe!")
            } else {
                const deletedUser = await prismaClient.user.delete({
                    where: { id }
                })

                const user: Omit<Prisma.UserCreateInput, "password"> = {
                    id: deletedUser.id,
                    username: deletedUser.username,
                    email: deletedUser.email,
                }

                return response.status(201).json({ user, message: "Usuário deletado com sucesso!" })
            }
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }

    async profile(request: Request, response: Response) {

        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do usuário é inválido ou não existe!");

            const foundUser = await prismaClient.user.findUnique({
                where: { id }
            })

            if (!foundUser) throw new BadRequesError("Usuário não encontrado.")

            const user: Partial<Prisma.UserCreateInput> = {
                id: foundUser?.id,
                username: foundUser?.username,
                email: foundUser?.email
            }

            return response.status(201).json(user)
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }

    async users(request: Request, response: Response) {
        try {
            const allUsers = await prismaClient.user.findMany()
            const users = allUsers.map((user: any) => { delete user.password; return user })

            if (!allUsers) throw new BadRequesError("Lamento, aconteceu algum erro ao buscar os dados.")
            return response.status(201).json(users)
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}