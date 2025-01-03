import { PrismaClient } from '@prisma/client';
import {UpdateUserProfileRequest, UserProfileRequest} from "~/types/AuthType";

const prisma = new PrismaClient();


export class UserProfile {
    static createUserProfile = (user_id: number, data: UserProfileRequest) => {
        return prisma.userProfile.create({
            data: {
                user: {
                    connect: {id: user_id}
                },
                bod: data.bod,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
            }
        });
    };

    static updateUserProfile = (user_id: number, data: UpdateUserProfileRequest) => {
        return prisma.userProfile.update({
            where: { user_id: user_id },
            data: {
                bod: data.dateOfBirth,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
            }
        });
    };

    static deleteUserProfile = (id: number) => {
        return prisma.userProfile.delete({
            where: { id },
        });
    };

    static getUserProfileById = (userId: number) => {
        return prisma.userProfile.findUnique({
            where: { user_id: userId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        full_name: true,
                    }
                }
            }
        });
    };

    static getAllUserProfiles = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.userProfile.findMany({
            skip: skip,
            take: take,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        full_name: true,
                    }
                }
            }
        });
    };

    static countAllUserProfiles = () => {
        return prisma.userProfile.count();
    };

    static searchUserProfile = (search: string) => {
        return prisma.userProfile.findMany({
            where: {
                OR: [
                    {
                        phoneNumber: {
                            contains: search,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: search,
                            }
                        }
                    },
                ]
            }
        });
    };
}
