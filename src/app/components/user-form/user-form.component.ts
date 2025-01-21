import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NetworkService } from "../../services/network.service";

@Component({
    standalone: false,
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
    userForm!: FormGroup;
    networkId!: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private networkService: NetworkService
    ) {}

    ngOnInit(): void {
        this.networkId = this.route.snapshot.paramMap.get("networkId") || "";

        this.userForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
        });
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            this.networkService
                .addUserToNetwork(this.userForm.value, this.networkId)
                .subscribe({
                    next: (createdUser) => {
                        console.log(
                            "Utworzono użytkownika i dodano do sieci:",
                            createdUser
                        );
                        this.router.navigate(["/"]);
                    },
                    error: (err) => {
                        console.error(
                            "Błąd podczas dodawania użytkownika do sieci:",
                            err
                        );
                    },
                });
        }
    }
}
