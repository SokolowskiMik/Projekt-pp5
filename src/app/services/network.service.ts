import { Injectable } from '@angular/core';
import { Network } from '../models/network';
import { Device } from '../models/device';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private networks: Network[] = [];
  private devices: Device[] = [];
  private users: User[] = [];

  private networkIdCounter = 1;
  private deviceIdCounter = 1;
  private userIdCounter = 1;

  constructor() {}

  // ------------------------
  // Metody obsługujące sieci
  // ------------------------
  getAllNetworks(): Network[] {
    return this.networks;
  }

  addNetwork(networkData: Omit<Network, 'id' | 'devices' | 'users'>): Network {
    const newNetwork: Network = {
      id: this.networkIdCounter++,
      ip: networkData.ip,
      name: networkData.name,
      gateway: networkData.gateway,
      dns: networkData.dns,
      mask: networkData.mask,
      admin: networkData.admin,
      devices: [], // pusta tablica urządzeń na start
      users: [], // pusta tablica użytkowników na start
    };
    this.networks.push(newNetwork);
    return newNetwork;
  }

  getNetworkById(id: number): Network | undefined {
    return this.networks.find((n) => n.id === id);
  }

  // --------------------------------
  // Metody obsługujące urządzenia
  // --------------------------------
  getAllDevices(): Device[] {
    return this.devices;
  }

  addDevice(deviceData: Omit<Device, 'id'>, networkId: number): Device | null {
    const network = this.getNetworkById(networkId);
    if (!network) {
      return null;
    }

    const newDevice: Device = {
      id: this.deviceIdCounter++,
      type: deviceData.type,
      name: deviceData.name,
      ip: deviceData.ip,
      description: deviceData.description,
    };

    // Dodaj urządzenie do globalnej listy urządzeń
    this.devices.push(newDevice);
    // Dodaj powiązanie w obiekcie Network
    network.devices.push(newDevice.id);

    return newDevice;
  }

  // --------------------------------
  // Metody obsługujące użytkowników
  // --------------------------------
  getAllUsers(): User[] {
    return this.users;
  }

  addUser(userData: Omit<User, 'id'>, networkId: number): User | null {
    const network = this.getNetworkById(networkId);
    if (!network) {
      return null;
    }

    const newUser: User = {
      id: this.userIdCounter++,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };

    // Dodaj użytkownika do globalnej listy
    this.users.push(newUser);
    // Dodaj powiązanie w obiekcie Network
    network.users.push(newUser.id);

    return newUser;
  }
  removeNetwork(networkId: number): void {
    const index = this.networks.findIndex((n) => n.id === networkId);
    if (index !== -1) {
      // Usuwamy sieć z tablicy
      this.networks.splice(index, 1);
    }
  }
  getDeviceById(deviceId: number): Device | undefined {
    return this.devices.find((d) => d.id === deviceId);
  }

  getUserById(userId: number): User | undefined {
    return this.users.find((u) => u.id === userId);
  }
}
