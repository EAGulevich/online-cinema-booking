import dayjs from 'dayjs';

export const formatMinutesToHHmm = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return dayjs().hour(hours).minute(minutes).second(0).format('Hч mmм');
};
