import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ListChecks, Save, Copy } from "lucide-react";
import Header from "@/components/layout/Header";
import PasswordGenerator from "@/components/ui/PasswordGenerator";
import { toast } from "sonner";

const Generator = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [savedPasswords, setSavedPasswords] = useState<
    Array<{ password: string; date: string }>
  >([]);

  const handlePasswordChange = (password: string) => {
    setCurrentPassword(password);
  };

  const handleSavePassword = () => {
    if (!currentPassword) {
      toast.error("Please generate a password first");
      return;
    }

    setSavedPasswords([
      { password: currentPassword, date: new Date().toLocaleDateString() },
      ...savedPasswords,
    ]);

    toast.success("Password saved to history");
  };

  const copyToClipboard = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Create strong, unique passwords for your accounts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PasswordGenerator onChange={handlePasswordChange} />

              <div className="mt-6 flex justify-end">
                <Button onClick={handleSavePassword} className="rounded-lg">
                  <Save size={16} className="mr-2" />
                  Save to History
                </Button>
              </div>

              <div className="mt-10 glass-panel rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield size={20} className="mr-2 text-green-500" />
                  Password Strength Tips
                </h3>

                <ul className="space-y-3">
                  {[
                    "Use a minimum of 12 characters",
                    "Include uppercase and lowercase letters",
                    "Add numbers and special characters",
                    "Avoid using easily guessable information",
                    "Use a unique password for each account",
                    "Consider using a passphrase for better memorability",
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 mt-0.5 mr-3">
                        <CheckIcon className="h-3 w-3" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 overflow-hidden">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ListChecks size={20} className="mr-2 text-blue-500" />
                Password History
              </h3>

              {savedPasswords.length === 0 ? (
                <div className="text-center py-10">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 inline-flex items-center justify-center mb-3">
                    <ListChecks size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your saved passwords will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {savedPasswords.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <div className="flex-1 mr-3">
                        <div className="font-mono text-sm truncate">
                          {entry.password}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {entry.date}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                        onClick={() => copyToClipboard(entry.password)}>
                        <Copy size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Generator;
