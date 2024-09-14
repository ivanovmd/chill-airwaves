export interface Airport {
  name: string;
  iata: string;
  icao: string;
  restricted: boolean;
  stations: Station[];
}

export interface Station {
  name: string;
  path: string;
}

export const airports: Airport[] = [
  {
    name: 'Hong Kong International Airport',
    iata: 'HKG',
    icao: 'VHHH',
    restricted: false,
    stations: [
      {
        name: 'App-Dep-Dir-Zone',
        path: 'VHHH5-App-Dep-Dir-Zone'
      }
    ]
  },
  {
    name: 'Tokyo International Airport (Haneda Airport)',
    iata: 'HND',
    icao: 'RJTT',
    restricted: false,
    stations: [
      {
        name: 'RJTT-App',
        path: 'RJTT-App'
      }
    ]
  }
]
