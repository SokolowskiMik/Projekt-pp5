import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { Network } from '../../models/network';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  networks: Network[] = [];

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    this.loadNetworks();
  }

  loadNetworks(): void {
    this.networks = this.networkService.getAllNetworks();
  }
  removeNetwork(networkId: number) {
    this.networkService.removeNetwork(networkId);
    // Odśwież listę:
    this.loadNetworks();
  }
}
