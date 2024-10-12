export interface Airport {
  name: string;
  iata: string;
  icao: string;
  restricted: boolean;
  location: {
    city: string;
    country: string;
    state?: string;
    UTC: number;
  },
  stations: Station[];
}

export interface Station {
  name: string;
  path: string;
}

export const airports: Airport[] = [
  {
    name: 'Hong Kong Intl Airport',
    location: {
      city: 'Hong Kong',
      country: 'Hong Kong',
      UTC: 8
    },
    iata: 'hkg',
    icao: 'vhhh',
    restricted: false,
    stations: [
      {
        name: 'App-Dep-Dir-Zone',
        path: 'VHHH5-App-Dep-Dir-Zone'
      }
    ]
  },
  {
    name: 'Tokyo Intl Airport (Haneda Airport)',
    iata: 'hnd',
    icao: 'rjtt',
    restricted: false,
    location: {
      city: 'Tokyo',
      country: 'Japan',
      UTC: 9
    },
    stations: [
      {
        name: 'App-Dep',
        path: 'RJTT-App-Dep'
      }
    ]
  },
  {
    name: 'Rocky Mountain Metropolitan Airport',
    iata: 'bjc',
    icao: 'kbjc',
    restricted: false,
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'United States',
      UTC: -6
    },
    stations: [
      {
        name: 'Gnd-Twr',
        path: 'KBJC3-Gnd-Twr'
      }
    ]
  }
]
