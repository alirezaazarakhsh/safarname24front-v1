export type AuthStep = 'phone' | 'otp';

export interface AuthFormValues {
  phoneNumber: string;
  otp: string;
}

export interface AuthModalContextType {
  // Modal visibility
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Step management
  step: AuthStep;
  goToStep: (step: AuthStep) => void;
  handleBack: () => void;

  // Form submission & state
  isSubmitting: boolean;
  handlePhoneSubmit: (phone: string) => Promise<void>;
  handleOtpSubmit: (otp: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;

  // Countdown timer
  timer: number;
  isTimerActive: boolean;

  // Configurations
  autoSubmitOtp: boolean;
}
