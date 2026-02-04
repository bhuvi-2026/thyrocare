import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @ViewChild('loginModal') loginModal!: TemplateRef<any>; 
  modalRef?: NgbModalRef;

  step: 'mobile' | 'otp' = 'mobile';
  mobileNumber = '';
  otp = '';
  otpSent = false;
  timer = 0; // seconds remaining
  private timerHandle: any = null;
  resendEnabled = false;
  error = '';


  constructor(private modalService: NgbModal) { }

  openModal(modalId: string) {
    if (modalId === 'login') {
      this.modalRef = this.modalService.open(this.loginModal, { centered: true });
  }
  }
  resetLoginState() {
    this.step = 'mobile';
    this.mobileNumber = '';
    this.otp = '';
    this.otpSent = false;
    this.clearTimer();
    this.timer = 0;
    this.resendEnabled = false;
    this.error = '';
  }
  sendOtp() {
    this.error = '';
    const clean = this.mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(clean)) {
      this.error = 'Enter a valid 10-digit mobile number';
      return;
    }

    // Simulate sending OTP (replace with real API call)
    this.otpSent = true;
    this.step = 'otp';
    this.otp = '';
    this.startTimer(60); // 60s countdown
    console.log('Simulated: send OTP to', clean);
  }
  resendOtp() {
    if (!this.resendEnabled) return;
    // reuse send flow; in real app call resend endpoint
    this.sendOtp();
  }
  verifyOtp() {
    this.error = '';
    if (this.otp.trim().length === 0) {
      this.error = 'Enter OTP';
      return;
    }

    // Simulate verification success (replace with real API)
    const success = true;
    if (success) {
      this.modalRef?.close();
      console.log('Simulated: OTP verified for', this.mobileNumber);
      this.resetLoginState();
    } else {
      this.error = 'Invalid OTP';
    }
  }
   startTimer(seconds: number) {
    this.clearTimer();
    this.timer = seconds;
    this.resendEnabled = false;
    this.timerHandle = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.clearTimer();
        this.resendEnabled = true;
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  }
}
