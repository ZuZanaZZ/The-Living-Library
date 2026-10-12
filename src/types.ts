export type Light = 'low' | 'medium' | 'bright';

export type Plant = {
  id: string;
  name: string;
  species: string;
  photo?: string; // URL or downscaled data URL
  acquired: string; // ISO date
  light: Light;
  wateringDays: number;
  notes: string;
  status: 'alive' | 'dead';
  diedOn?: string;
  causeOfDeath?: string;
};
