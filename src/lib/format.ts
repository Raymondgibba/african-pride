import { SETTINGS } from '@/data/site';

export const money = (v: number) => {
  const d = SETTINGS.currency === 'D' ? 0 : 2;
  return `${SETTINGS.currency} ${v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`;
};

export const waLink = (text?: string) =>
  `https://wa.me/${SETTINGS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');
