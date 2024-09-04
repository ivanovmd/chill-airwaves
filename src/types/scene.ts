export interface Scene {
  id: string;
  name: string;
  description: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string;
  backgroundColor: string;

  pointsOfInterest: PointOfInterest[];
}

export interface PointOfInterest {
  id: string;

  coordinates: PointOfInterestCoordinates;
}

export interface PointOfInterestCoordinates {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
}