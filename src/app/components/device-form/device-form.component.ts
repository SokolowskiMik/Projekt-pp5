import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NetworkService } from "../../services/network.service";

@Component({
    standalone: false,
    selector: "app-device-form",
    templateUrl: "./device-form.component.html",
    styleUrls: ["./device-form.component.scss"],
})
export class DeviceFormComponent implements OnInit {
    deviceForm!: FormGroup;
    networkId!: string;
    deviceTypes = ["komputer", "router", "switch", "drukarka"];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private networkService: NetworkService
    ) {}

    ngOnInit(): void {
        this.networkId = this.route.snapshot.paramMap.get("networkId") || "";

        this.deviceForm = this.fb.group({
            type: ["", Validators.required],
            name: ["", Validators.required],
            ip: ["", Validators.required],
            description: [""],
        });
    }

    onSubmit(): void {
        if (this.deviceForm.valid) {
            this.networkService
                .addDeviceToNetwork(this.deviceForm.value, this.networkId)
                .subscribe({
                    next: (createdDevice) => {
                        console.log(
                            "Urządzenie utworzone i dodane do sieci:",
                            createdDevice
                        );
                        this.router.navigate(["/"]);
                    },
                    error: (err) => {
                        console.error(
                            "Błąd przy dodawaniu urządzenia do sieci:",
                            err
                        );
                    },
                });
        }
    }
}
