import { Component, OnInit } from "@angular/core";
import { NetworkService } from "../../services/network.service";
import { Network } from "../../models/network";

@Component({
    standalone: false,
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    networks: Network[] = [];

    constructor(private networkService: NetworkService) {}

    ngOnInit(): void {
        this.loadNetworks();
    }

    loadNetworks(): void {
        this.networkService.getAllNetworks().subscribe({
            next: (networks: Network[]) => {
                this.networks = networks;
            },
            error: (err) => {
                console.error("Błąd przy pobieraniu sieci:", err);
            },
        });
    }

    removeNetwork(networkId: string): void {
        this.networkService.removeNetwork(networkId).subscribe({
            next: () => {
                this.loadNetworks();
            },
            error: (err) => {
                console.error("Błąd przy usuwaniu sieci:", err);
            },
        });
    }
}
