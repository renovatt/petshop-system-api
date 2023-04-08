import dayjs from "dayjs";
import prismaClient from "../../lib";
import { Request, Response } from "express";
import { verifyUserId } from "../../bcrypt";
import { BadRequesError } from "../../errors";
import { ScheduleFormProps } from "../../@types";

export class SchedulesController {
    async create(request: Request, response: Response) {
        const {
            pet,
            age,
            sex,
            date,
            tutor,
            breed,
            client,
            weight,
            specie,
            reference_image_id }: ScheduleFormProps = request.body;

        const userId = request.user.id;

        try {
            if (!userId) {
                throw new BadRequesError("Nenhum usuário encontrado.");
            } else {
                const dateTime = dayjs(date);
                const ageIsNegative = (Number(age) <= 0);
                const weightIsNegative = (Number(weight) <= 0);
                const referenceImageId = reference_image_id ? reference_image_id : "";

                const alreadyExists = await prismaClient.schedules.findFirst({
                    where: {
                        date: {
                            gte: dateTime.startOf("hour").toDate(),
                            lte: dateTime.endOf("hour").toDate(),
                        },
                    },
                });

                if (ageIsNegative) throw new BadRequesError("A idade precisa ser um valor válido!");
                if (weightIsNegative) throw new BadRequesError("O peso precisa ser um valor válido!");
                if (alreadyExists) throw new BadRequesError("Já existe um agendamento para esse horário neste dia.");

                const schedule = await prismaClient.schedules.create({
                    data: {
                        pet,
                        age,
                        sex,
                        tutor,
                        breed,
                        weight,
                        client,
                        specie,
                        status: client,
                        date: new Date(date),
                        canceled_date: new Date(date),
                        reference_image_id: referenceImageId,
                        user: {
                            connect: { id: userId },
                        }
                    },
                });
                return response.status(200).json(schedule);
            }
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response) {
        const {
            tutor,
            pet,
            age,
            sex,
            breed,
            weight,
            date,
            status,
            client,
            specie,
            canceled_date,
            reference_image_id }: ScheduleFormProps = request.body;

        const userId = request.user.id;
        const { id } = request.params;

        try {

            if (verifyUserId(id)) throw new BadRequesError("O ID do agendamento é inválido ou não existe!");

            const schedule = await prismaClient.schedules.findFirst({
                where: { id }
            })

            if (!schedule) {
                throw new BadRequesError("Nenhum agendamento foi encontrado.")
            } else {
                const dateTime = dayjs(date);
                const ageIsNegative = (Number(age) <= 0);
                const weightIsNegative = (Number(weight) <= 0);
                const referenceImageId = reference_image_id ? reference_image_id : "";

                if (!userId) throw new BadRequesError("Nenhum usuário foi encontrado.");
                if (ageIsNegative) throw new BadRequesError("A idade precisa ser um valor válido!");
                if (weightIsNegative) throw new BadRequesError("O peso precisa ser um valor válido!");

                if (dateTime.isSame(dayjs(schedule.date))) {
                    await prismaClient.schedules.update({
                        where: { id },
                        data: {
                            pet,
                            age,
                            sex,
                            tutor,
                            breed,
                            weight,
                            status,
                            client,
                            specie,
                            reference_image_id: referenceImageId,
                            canceled_date: new Date(canceled_date),
                        },
                    });
                } else {
                    const alreadyExists = await prismaClient.schedules.findFirst({
                        where: {
                            date: {
                                gte: dateTime.startOf("hour").toDate(),
                                lte: dateTime.endOf("hour").toDate(),
                            },
                        },
                    });

                    if (alreadyExists) throw new Error("Já existe um agendamento para esse dia e horário.");

                    await prismaClient.schedules.update({
                        where: { id: id },
                        data: {
                            tutor,
                            pet,
                            age,
                            sex,
                            breed,
                            weight,
                            status,
                            client,
                            specie,
                            date: new Date(date),
                            reference_image_id: referenceImageId,
                            canceled_date: new Date(canceled_date),
                        },
                    });
                }
                return response.status(200).json({ schedule, message: "Agendamento atualizado com sucesso!" });
            }
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do agendamento é inválido ou não existe!");

            const findSchedule = await prismaClient.schedules.findFirst({
                where: { id }
            })

            if (!findSchedule) {
                throw new BadRequesError("Nenhum agendamento foi encontrado.");
            } else {
                const schedule = await prismaClient.schedules.delete({
                    where: { id }
                })
                return response.status(200).json({ schedule, message: "Agendamento deletado com sucesso." })
            }
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async profile(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequesError("O ID do cliente é inválido ou não existe!");

            const schedule = await prismaClient.schedules.findFirst({
                where: { id }
            })

            if (!schedule) throw new BadRequesError("Nenhum cliente foi encontrado.");

            return response.status(200).json(schedule);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async schedules(request: Request, response: Response) {
        const userId = request.user.id;

        try {
            if (!userId) {
                throw new BadRequesError("Nenhum usuário encontrado.");
            } else {
                const schedules = await prismaClient.schedules.findMany({
                    where: { userId }
                });
                return response.status(200).json(schedules);
            };
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}