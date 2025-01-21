import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NetworkService } from "../../services/network.service";
import { Network } from "../../models/network";
import { Device } from "../../models/device";
import { User } from "../../models/user";
import { forkJoin } from "rxjs";

@Component({
    standalone: false,
    selector: "app-network-details",
    templateUrl: "./network-details.component.html",
    styleUrls: ["./network-details.component.scss"],
})
export class NetworkDetailsComponent implements OnInit {
    networkId!: string;
    network: Network | undefined;
    devices: Device[] = [];
    users: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private networkService: NetworkService
    ) {}

    ngOnInit(): void {
        this.networkId = this.route.snapshot.paramMap.get("networkId") || "";
        this.loadDetails();
    }

    loadDetails(): void {
        this.networkService.getNetworkById(this.networkId).subscribe({
            next: (network: Network) => {
                this.network = network;
                if (network) {
                    this.loadDevices(network.devices);
                    this.loadUsers(network.users);
                }
            },
            error: (err) => {
                console.error("Błąd podczas pobierania sieci:", err);
            },
        });
    }

    private loadDevices(deviceIds: string[]): void {
        if (deviceIds.length === 0) {
            this.devices = [];
            return;
        }
        const deviceObservables = deviceIds.map((id) =>
            this.networkService.getDeviceById(id)
        );
        forkJoin(deviceObservables).subscribe({
            next: (fetchedDevices: Device[]) => {
                this.devices = fetchedDevices;
            },
            error: (err) => {
                console.error("Błąd podczas pobierania urządzeń:", err);
            },
        });
    }

    private loadUsers(userIds: string[]): void {
        if (userIds.length === 0) {
            this.users = [];
            return;
        }
        const userObservables = userIds.map((id) =>
            this.networkService.getUserById(id)
        );
        forkJoin(userObservables).subscribe({
            next: (fetchedUsers: User[]) => {
                this.users = fetchedUsers;
            },
            error: (err) => {
                console.error("Błąd podczas pobierania użytkowników:", err);
            },
        });
    }
}
