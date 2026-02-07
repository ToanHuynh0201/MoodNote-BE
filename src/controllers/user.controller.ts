import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ success: true, message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
};
