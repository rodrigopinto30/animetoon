import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(userId: string, message: string, type: string) {
    const notification = this.notificationRepository.create({
      recipient: { id: userId },
      message,
      type,
    });
    return await this.notificationRepository.save(notification);
  }

  async getUserNotifications(userId: string) {
    return await this.notificationRepository.find({
      where: { recipient: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: string) {
    return await this.notificationRepository.update(notificationId, { isRead: true });
  }
}