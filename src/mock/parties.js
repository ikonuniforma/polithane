// Mock parti verileri
import { getPartyLogoPath, getPartyFlagPath } from '../utils/imagePaths.js';

export const mockParties = [
  {
    party_id: 1,
    party_name: 'Adalet ve Kalkınma Partisi',
    party_short_name: 'AK PARTİ',
    party_logo: getPartyLogoPath('AK PARTİ', 1),
    party_flag: getPartyFlagPath('AK PARTİ', 1),
    parliament_seats: 268,
    foundation_date: '2001-08-14',
    party_color: '#F39200',
    is_active: true,
    mp_count: 268,
    organization_count: 1547,
    member_count: 11500000
  },
  {
    party_id: 2,
    party_name: 'Cumhuriyet Halk Partisi',
    party_short_name: 'CHP',
    party_logo: getPartyLogoPath('CHP', 2),
    party_flag: getPartyFlagPath('CHP', 2),
    parliament_seats: 169,
    foundation_date: '1923-09-09',
    party_color: '#ED1C24',
    is_active: true,
    mp_count: 169,
    organization_count: 1342,
    member_count: 8200000
  },
  {
    party_id: 3,
    party_name: 'Milliyetçi Hareket Partisi',
    party_short_name: 'MHP',
    party_logo: getPartyLogoPath('MHP', 3),
    party_flag: getPartyFlagPath('MHP', 3),
    parliament_seats: 50,
    foundation_date: '1969-02-09',
    party_color: '#C41E3A',
    is_active: true,
    mp_count: 50,
    organization_count: 892,
    member_count: 4500000
  },
  {
    party_id: 4,
    party_name: 'Demokrat Parti',
    party_short_name: 'DEM',
    party_logo: getPartyLogoPath('DEM', 4),
    party_flag: getPartyFlagPath('DEM', 4),
    parliament_seats: 57,
    foundation_date: '2023-10-21',
    party_color: '#8B008B',
    is_active: true,
    mp_count: 57,
    organization_count: 445,
    member_count: 1200000
  },
  {
    party_id: 5,
    party_name: 'İYİ Parti',
    party_short_name: 'İYİ PARTİ',
    party_logo: getPartyLogoPath('İYİ PARTİ', 5),
    party_flag: getPartyFlagPath('İYİ PARTİ', 5),
    parliament_seats: 43,
    foundation_date: '2017-10-25',
    party_color: '#0047AB',
    is_active: true,
    mp_count: 43,
    organization_count: 678,
    member_count: 2800000
  },
  {
    party_id: 6,
    party_name: 'Zafer Partisi',
    party_short_name: 'ZP',
    party_logo: getPartyLogoPath('ZP', 6),
    party_flag: getPartyFlagPath('ZP', 6),
    parliament_seats: 0,
    foundation_date: '2021-08-24',
    party_color: '#E30A17',
    is_active: true,
    mp_count: 0,
    organization_count: 234,
    member_count: 650000
  }
];
