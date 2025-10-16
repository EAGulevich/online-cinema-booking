import dayjs from 'dayjs';

import type { Booking } from '@generatedApi/models';
import { useGetMeBookings } from '@generatedApi/users/users.ts';

export const useTickets = () => {
  const { data, isLoading } = useGetMeBookings({
    query: {
      staleTime: 0,
    },
  });

  const booking: (Booking & { isPast: boolean })[] =
    data?.data.map((item) => ({
      ...item,
      isPast: dayjs(item.startTime)
        .add(item.minutesLength || 0, 'minute')
        .isBefore(dayjs()),
    })) || [];

  type GroupedBooking = {
    future: (Booking & { isPast: boolean })[];
    past: (Booking & { isPast: boolean })[];
    unpaid: (Booking & { isPast: boolean })[];
  };

  const groupedBooking = booking.reduce<GroupedBooking>(
    (acc, item) => {
      if (!item.isPaid) {
        acc.unpaid.push(item);
      } else if (item.isPast) {
        acc.past.push(item);
      } else {
        acc.future.push(item);
      }
      return acc;
    },
    {
      future: [],
      past: [],
      unpaid: [],
    }
  );
  return { groupedBooking, isLoading };
};
