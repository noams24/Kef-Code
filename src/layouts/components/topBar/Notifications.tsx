'use client';

import { Badge } from '@/components/ui/Badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu';
import { Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillLike } from 'react-icons/ai';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';

const initialNotifications = [
  {
    id: 1,
    type: 'LIKE',
    message: 'נועם אהב את התגובה שלך',
    createdAt: 'לפני 5 דקות',
    isRead: false,
    link: '/posts/1',
  },
  {
    id: 2,
    type: 'MESSAGE',
    message: 'נועם הגיב לך',
    createdAt: 'לפני שעה',
    isRead: false,
    link: '/posts/2',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<
    typeof initialNotifications
  >([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const query = `/api/getNotifications`;
      const { data } = await axios.get(query);
      // console.log(data);
      setNotifications(data);
      setUnreadCount(
        data.filter((n: (typeof initialNotifications)[0]) => !n.isRead).length
      );
      return data;
    },
  });

  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(
      notifications.filter((n: (typeof initialNotifications)[0]) => !n.isRead)
        .length
    );
    readNotification(id);
  };
  const { mutate: readNotification } = useMutation({
    mutationFn: async (notificationId: number) => {
      const payload = {
        id: notificationId,
      };
      await axios.patch('/api/addNotification', payload);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full border border-gray-300 p-1">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 select-none bg-red-800 px-1.5 py-0.5 text-xs text-white"
          >
            {unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-96 w-80 overflow-y-auto">
        <div className="flex h-10 items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">התראות</h3>
        </div>

        {notifications.length > 0 &&
          notifications.map(notification => (
            <Link
              href={notification.link}
              key={notification.id}
              target="_blank"
            >
              <DropdownMenuItem
                onClick={() => handleNotificationClick(notification.id)}
                className={`flex cursor-pointer items-center space-x-3 p-3 hover:bg-gray-100`}
              >
                <div className="ml-3">
                  {notification.type === 'LIKE' ? (
                    <AiFillLike className="h-5 w-5 text-blue-500" />
                  ) : (
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {notification.createdAt}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                )}
              </DropdownMenuItem>
            </Link>
          ))}

        {notifications.length === 0 && (
          <div className="py-6 text-center text-gray-500">No notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
