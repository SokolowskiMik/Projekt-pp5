import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  standalone: false,
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  deviceForm!: FormGroup;
  networkId!: number;

  // Możemy mieć listę typów urządzeń do wyboru
  deviceTypes = ['komputer', 'router', 'switch', 'drukarka'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    // Pobieramy ID sieci z parametru w URL
    this.networkId = Number(this.route.snapshot.paramMap.get('networkId'));

    this.deviceForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      ip: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      this.networkService.addDevice(this.deviceForm.value, this.networkId);
      this.router.navigate(['/']);
    }
  }
}
