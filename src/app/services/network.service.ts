import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, switchMap, map } from "rxjs";
import { Network } from "../models/network";
import { Device } from "../models/device";
import { User } from "../models/user";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: "root",
})
export class NetworkService {
    private BASE_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllNetworks(): Observable<Network[]> {
        return this.http.get<Network[]>(`${this.BASE_URL}/networks`);
    }

    getNetworkById(id: string): Observable<Network> {
        return this.http.get<Network>(`${this.BASE_URL}/networks/${id}`);
    }

    addNetwork(
        networkData: Omit<Network, "id" | "devices" | "users">
    ): Observable<Network> {
        const newNetwork: Omit<Network, "id"> = {
            ...networkData,
            devices: [],
            users: [],
        };
        return this.http.post<Network>(`${this.BASE_URL}/networks`, newNetwork);
    }

    updateNetwork(network: Network): Observable<Network> {
        return this.http.put<Network>(
            `${this.BASE_URL}/networks/${network.id}`,
            network
        );
    }

    removeNetwork(networkId: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/networks/${networkId}`);
    }

    getAllDevices(): Observable<Device[]> {
        return this.http.get<Device[]>(`${this.BASE_URL}/devices`);
    }

    getDeviceById(deviceId: string): Observable<Device> {
        return this.http.get<Device>(`${this.BASE_URL}/devices/${deviceId}`);
    }

    addDeviceToNetwork(
        deviceData: Omit<Device, "id">,
        networkId: string
    ): Observable<Device> {
        return this.http
            .post<Device>(`${this.BASE_URL}/devices`, deviceData)
            .pipe(
                switchMap((createdDevice: Device) => {
                    return this.getNetworkById(networkId).pipe(
                        switchMap((network: Network) => {
                            network.devices.push(createdDevice.id);
                            return this.updateNetwork(network).pipe(
                                map(() => createdDevice)
                            );
                        })
                    );
                })
            );
    }

    removeDevice(deviceId: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/devices/${deviceId}`);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.BASE_URL}/users`);
    }

    getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`${this.BASE_URL}/users/${userId}`);
    }

    addUserToNetwork(
        userData: Omit<User, "id">,
        networkId: string
    ): Observable<User> {
        return this.http.post<User>(`${this.BASE_URL}/users`, userData).pipe(
            switchMap((createdUser: User) => {
                return this.getNetworkById(networkId).pipe(
                    switchMap((network: Network) => {
                        network.users.push(createdUser.id);
                        return this.updateNetwork(network).pipe(
                            map(() => createdUser)
                        );
                    })
                );
            })
        );
    }

    removeUser(userId: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/users/${userId}`);
    }
}
