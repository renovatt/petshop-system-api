import { Request, Response } from "express"
import { BadRequesError } from "../../errors";
import prismaClient from "../../lib";

export class CanceledSchedulesController {
    async canceled(request: Request, response: Response) {
        const userId = request.user.id;

        try {
            if (!userId) {
                throw new BadRequesError("Nenhum usuário encontrado.");
            } else {
                const schedules = await prismaClient.schedules.findMany({
                    where: {
                        userId: userId,
                        status: false
                    },
                })
                if (!schedules.map(arr => arr).length) {
                    throw new BadRequesError("Não há agendamentos cancelados.");
                }

                return response.status(200).json(schedules);
            }
        } catch (error: any) {
            return response.status(200).json({ error: error.message });
        }
    }

    async deleteCanceled(request: Request, response: Response) {
        const userId = request.user.id;

        try {
            if (!userId) {
                throw new BadRequesError("Nenhum usuário encontrado.");
            } else {
                const schedules = await prismaClient.schedules.deleteMany({
                    where: {
                        userId: userId,
                        status: false
                    },
                })

                if (schedules.count === 0) {
                    throw new BadRequesError("Todos os agendamentos cancelados já foram deletados.");
                }

                return response.status(200).json({ schedules, message: `Foram deletados ${schedules.count} agendamentos que estavam como cancelados` });
            }
        } catch (error: any) {
            return response.status(200).json({ error: error.message });
        }
    }
}