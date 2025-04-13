import React, { useState } from 'react';
import { masterPasswordService } from '../services/masterPasswordService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { KeyRound, EyeOff, Eye, Shield, Info, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Header from './layout/Header';
import { cn } from '@/lib/utils';

interface MasterPasswordSetupProps {
  onSuccess: () => void;
}

export function MasterPasswordSetup({ onSuccess }: MasterPasswordSetupProps) {
  const [step, setStep] = useState<number>(1);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculateStrength = (password: string) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety check
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(score, 5);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };

  const handleContinue = () => {
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    if (strength < 3) {
      toast.error('Please create a stronger password');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setStep(3);

    try {
      await masterPasswordService.setMasterPassword(password);
      setStep(4);
    } catch (err) {
      toast.error('Failed to set master password. Please try again.');
      console.error('Error setting master password:', err);
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return { label: 'Very Weak', color: 'bg-red-500', textColor: 'text-red-500' };
    if (strength === 2) return { label: 'Weak', color: 'bg-orange-500', textColor: 'text-orange-500' };
    if (strength === 3) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
    if (strength === 4) return { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' };
    return { label: 'Very Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
  };

  const { label: strengthLabel, color: strengthColor, textColor: strengthTextColor } = getStrengthLabel();

  const requirements = [
    { label: 'At least 12 characters', met: password.length >= 12 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Create Master Password</h2>
        <p className="text-muted-foreground">This password will protect all your stored passwords</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Master Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={cn(
                "h-12 px-4 text-base rounded-lg transition-all duration-200",
                "border-2 focus:ring-2 focus:ring-offset-2",
                strength >= 4 ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" :
                strength >= 3 ? "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20" :
                strength > 0 ? "border-orange-500 focus:border-orange-500 focus:ring-orange-500/20" :
                "border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-primary/20"
              )}
              placeholder="Enter your master password"
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
      
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Password Strength</span>
            <span className={cn("text-sm font-semibold", strengthTextColor)}>{strengthLabel}</span>
          </div>
          <Progress value={(strength / 5) * 100} className={cn("h-2", strengthColor)} />
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium">Password Requirements:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="flex items-center text-sm space-x-2"
              >
                <div className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                  req.met ? "bg-green-500/20 text-green-500" : "bg-gray-200 dark:bg-gray-800 text-gray-400"
                )}>
                  {req.met ? <Check size={12} /> : <X size={12} />}
                </div>
                <span className={req.met ? "text-green-600 dark:text-green-400" : "text-gray-500"}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button 
        variant="teal"
        size="xl"
        className="w-full"
        onClick={handleContinue}
        disabled={!password || strength < 3 || isLoading}
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Confirm Master Password</h2>
        <p className="text-muted-foreground">Please re-enter your password to confirm</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                "h-12 px-4 text-base rounded-lg transition-all duration-200",
                "border-2 focus:ring-2 focus:ring-offset-2",
                confirmPassword && (
                  password === confirmPassword
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                    : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                ),
                !confirmPassword && "border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-primary/20"
              )}
              placeholder="Confirm your master password"
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 flex items-start space-x-3">
          <Info size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Important Security Notice
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              We cannot recover your master password if you forget it. Please store it securely or remember it well.
            </p>
          </div>
        </div>
      </div>

      <Button 
        variant="teal"
        size="xl"
        className="w-full"
        onClick={handleSubmit}
        disabled={!confirmPassword || password !== confirmPassword || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating Master Password...</span>
          </div>
        ) : (
          'Create Master Password'
        )}
      </Button>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
        <KeyRound size={28} className="text-blue-600 dark:text-blue-400 animate-pulse" />
      </div>
      <h3 className="text-lg font-medium mb-1">Generating encryption key</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        We're creating your encryption keys locally. This may take a moment...
      </p>
      <Progress value={65} className="w-full max-w-xs mb-4" />
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
        <Shield size={28} className="text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-lg font-medium mb-1">Setup Complete!</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
        Your encryption key has been created and saved locally on your device.
      </p>
      <Button 
        variant="teal"
        size="xl"
        className="w-full" 
        onClick={onSuccess}
      >
        Continue to Vault
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gradient-mesh p-4">
        <div className="glass-panel p-8 rounded-xl max-w-md w-full mx-auto shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {renderCurrentStep()}
        </div>
      </div>
    </>
  );
} 