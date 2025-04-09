import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Copy,
  RefreshCw,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface PasswordGeneratorProps {
  onChange?: (password: string) => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onChange }) => {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [strength, setStrength] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = "";
    let password = "";

    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters === "") {
      setIncludeLowercase(true);
      characters = lowercase;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setGeneratedPassword(password);
    onChange?.(password);

    calculateStrength(password);
  };

  const calculateStrength = (password: string) => {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    // Character variety check
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setStrength(Math.min(strength, 5));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Password copied to clipboard");
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const getStrengthLabel = () => {
    if (strength <= 1) return { label: "Very Weak", color: "bg-red-500" };
    if (strength === 2) return { label: "Weak", color: "bg-orange-500" };
    if (strength === 3) return { label: "Moderate", color: "bg-yellow-500" };
    if (strength === 4) return { label: "Strong", color: "bg-green-500" };
    return { label: "Very Strong", color: "bg-emerald-500" };
  };

  const { label: strengthLabel, color: strengthColor } = getStrengthLabel();

  return (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-800/30 rounded-xl p-6 space-y-5 shadow-premium overflow-hidden">
      <div className="flex flex-col relative spotlight-effect">
        <div className="relative">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            className="w-full h-14 px-4 pr-20 text-lg bg-gray-50/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800/80 rounded-lg font-mono"
          />
          <div className="absolute right-2 top-2 flex space-x-1">
            <div>
              <Button
                variant="glass"
                size="icon"
                onClick={generatePassword}
                className="h-10 w-10 rounded-lg">
                <RefreshCw size={18} />
              </Button>
            </div>
            <div>
              <Button
                variant="glass"
                size="icon"
                onClick={copyToClipboard}
                className="h-10 w-10 rounded-lg relative">
                {copied ? (
                  <div key="check">
                    <Check size={18} className="text-green-500" />
                  </div>
                ) : (
                  <div key="copy">
                    <Copy size={18} />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center space-x-2">
          <div className="text-sm font-medium flex items-center gap-1">
            <Shield size={14} className="text-primary" />
            Strength:
          </div>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full ${strengthColor} transition-all`}></div>
          </div>
          <div className="text-sm font-medium">{strengthLabel}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Password Settings</h3>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setExpanded(!expanded)}
          className="h-6 w-6">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4 overflow-hidden">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                Password Length: {length}
              </label>
            </div>
            <Slider
              value={[length]}
              min={8}
              max={32}
              step={1}
              onValueChange={(value) => setLength(value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>8</span>
              <span>16</span>
              <span>24</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-800/80 transition-colors">
              <label className="text-sm">Include Uppercase Letters</label>
              <Switch
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-800/80 transition-colors">
              <label className="text-sm">Include Lowercase Letters</label>
              <Switch
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-800/80 transition-colors">
              <label className="text-sm">Include Numbers</label>
              <Switch
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-800/80 transition-colors">
              <label className="text-sm">Include Symbols</label>
              <Switch
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        <Button
          variant="premium"
          onClick={generatePassword}
          className="w-full py-6 rounded-lg">
          <RefreshCw size={16} className="mr-2" />
          Generate New Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
