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
    name: 'Tokyo International Airport (Haneda Airport)',
    iata: 'hnd',
    icao: 'rjtt',
    restricted: false,
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
    stations: [
      {
        name: 'Gnd-Twr',
        path: 'KBJC3-Gnd-Twr'
      }
    ]
  }
]
