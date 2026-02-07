import prisma from '../config/database';

export const userService = {
  async getAllUsers() {
    return prisma.user.findMany();
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: { email: string; name: string }) {
    return prisma.user.create({ data });
  },

  async updateUser(id: string, data: { email?: string; name?: string }) {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
};
