import moment from 'moment/moment';

export const calcTimeDeltaFromCurrentTime = (date: Date): string => {
  const now = moment(new Date());

  return moment.duration(now.diff(date)).humanize();
};
