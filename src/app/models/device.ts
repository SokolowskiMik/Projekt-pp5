export interface Device {
  id: number;
  type: string; // np. 'komputer', 'router', itp.
  name: string;
  ip: string;
  description?: string; // dodatkowe informacje
}
