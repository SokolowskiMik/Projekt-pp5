export interface Network {
  id: number;
  ip: string;
  name: string;
  gateway: string;
  dns: string;
  devices: number[]; // Tablica ID urządzeń przypisanych do sieci
  mask: string;
  admin: string;
  users: number[]; // Tablica ID użytkowników przypisanych do sieci
}
