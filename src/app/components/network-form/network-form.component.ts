import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { Router } from "@angular/router";

@Component({
    standalone: false,
    selector: "app-network-form",
    templateUrl: "./network-form.component.html",
    styleUrls: ["./network-form.component.scss"],
})
export class NetworkFormComponent implements OnInit {
    networkForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private networkService: NetworkService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.networkForm = this.fb.group({
            ip: ["", Validators.required],
            name: ["", Validators.required],
            gateway: ["", Validators.required],
            dns: ["", Validators.required],
            mask: ["", Validators.required],
            admin: ["", Validators.required],
        });
    }

    onSubmit(): void {
        if (this.networkForm.valid) {
            const networkData = this.networkForm.value;

            this.networkService.addNetwork(networkData).subscribe({
                next: (createdNetwork) => {
                    console.log("Nowa sieć utworzona:", createdNetwork);
                    this.router.navigate(["/"]);
                },
                error: (err) => {
                    console.error("Błąd przy tworzeniu sieci:", err);
                },
            });
        }
    }
}
