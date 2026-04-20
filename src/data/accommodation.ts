import type { Accommodation } from './types';

export const accommodation: Accommodation = {
  name: 'Gasthof zur Post',
  address: 'Ludwigstraße 1, 82380 Peißenberg',
  lat: 47.80144,
  lng: 11.06615,
  phone: '+49 8803 842',
  email: 'kontakt@gasthofpost-peissenberg.de',
  website: 'https://www.gasthofpost-peissenberg.de',
  contactPerson: 'Thomas Bierling',
  checkIn: '2026-06-03',
  checkOut: '2026-06-07',
  confirmed: true,
  bicycleGarage: true,
  breakfastIncluded: true,
  prices: {
    single: 94,
    double: 128,
    currency: 'EUR',
  },
  rooms: {
    singles: 1,
    doubles: 3,
    guests: 7,
  },
  groupInfo:
    'Gruppe 1 (2 Pers., 1× DZ): Mi–Sa, 3.–6.6. · 3 Nächte. Gruppe 2 (5 Pers., 1× EZ + 2× DZ): Mi–Sa/So, 3.–6./7.6. · 3–4 Nächte (flexibel).',
  notes:
    'Reservierung bestätigt am 16.04.2026. Fahrräder in abschließbarer Garage. Frühstücksbuffet inkl.',
};
