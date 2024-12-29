import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { Network } from '../../models/network';
import { Device } from '../../models/device';
import { User } from '../../models/user';

@Component({
  standalone: false,
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss'],
})
export class NetworkDetailsComponent implements OnInit {
  networkId!: number;
  network: Network | undefined;
  devices: Device[] = [];
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    // Pobierz ID z parametru w URL (network/:networkId)
    this.networkId = Number(this.route.snapshot.paramMap.get('networkId'));

    this.loadDetails();
  }

  loadDetails() {
    // Znajdź sieć o tym ID
    this.network = this.networkService.getNetworkById(this.networkId);

    if (this.network) {
      // Dla każdego ID urządzenia pobierz pełny obiekt z serwisu
      this.devices = this.network.devices.map((deviceId) => {
        const foundDevice = this.networkService.getDeviceById(deviceId);
        return foundDevice!;
      });

      // Analogicznie dla użytkowników
      this.users = this.network.users.map((userId) => {
        const foundUser = this.networkService.getUserById(userId);
        return foundUser!;
      });
    }
  }
}
