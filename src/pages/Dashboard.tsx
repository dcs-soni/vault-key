import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  ListFilter,
  FolderOpen,
  ShieldCheck,
  Key,
  X,
  CheckCircle2,
  Lock,
  CreditCard,
  LogIn,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import PasswordCard from "@/components/ui/PasswordCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

// Sample data
const samplePasswords = [
  {
    id: "1",
    title: "Google",
    username: "user@example.com",
    password: "StrongPassword123!",
    url: "https://google.com",
    lastUpdated: "2 days ago",
    category: "Work",
  },
  {
    id: "2",
    title: "Twitter",
    username: "twitteruser",
    password: "TweetSecure456@",
    url: "https://twitter.com",
    lastUpdated: "1 week ago",
    category: "Social",
  },
  {
    id: "3",
    title: "Amazon",
    username: "amazonuser",
    password: "ShopS3cure789#",
    url: "https://amazon.com",
    lastUpdated: "3 days ago",
    category: "Shopping",
  },
  {
    id: "4",
    title: "Netflix",
    username: "netflixuser",
    password: "WatchMovies321$",
    url: "https://netflix.com",
    lastUpdated: "1 month ago",
    category: "Entertainment",
  },
  {
    id: "5",
    title: "GitHub",
    username: "devuser",
    password: "CodeSecret567&",
    url: "https://github.com",
    lastUpdated: "5 days ago",
    category: "Development",
  },
  {
    id: "6",
    title: "Microsoft",
    username: "msuser@outlook.com",
    password: "MicroPass876%",
    url: "https://microsoft.com",
    lastUpdated: "2 weeks ago",
    category: "Work",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const [passwords, setPasswords] = useState(samplePasswords.slice(0, 3)); // Start with only 3 passwords
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [newPassword, setNewPassword] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    category: "Uncategorized",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <Header />
        <div className="flex items-center justify-center px-4 py-32">
          <div className="auth-card text-center max-w-md w-full mx-auto">
            <div className="mb-6 text-destructive">
              <Lock className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-h2 mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-8">
              You must be signed in to view your secure dashboard and manage
              your passwords.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="neo-button w-full py-6 text-base flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Sign In to Access Dashboard
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth", { state: { isSignUp: true } })}
                className="text-teal hover:underline">
                Create one now
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredPasswords = passwords.filter((password) => {
    const matchesSearch =
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.url?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || password.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(passwords.map((password) => password.category))
  );

  const handleEdit = (id: string) => {
    toast.info(`Editing password ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    setPasswords(passwords.filter((password) => password.id !== id));
    toast.success("Password deleted successfully");
  };

  const handleAddPassword = () => {
    if (!newPassword.title || !newPassword.username || !newPassword.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (passwords.length >= 3 && !isPremium) {
      setShowAddDialog(false);
      setShowUpgradeDialog(true);
      return;
    }

    const newId = (
      Math.max(...passwords.map((p) => parseInt(p.id))) + 1
    ).toString();

    setPasswords([
      ...passwords,
      {
        id: newId,
        ...newPassword,
        lastUpdated: "Just now",
      },
    ]);

    setNewPassword({
      title: "",
      username: "",
      password: "",
      url: "",
      category: "Uncategorized",
    });

    setShowAddDialog(false);
    toast.success("Password added successfully");
  };

  const handleUpgradeClick = () => {
    setShowUpgradeDialog(false);
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    setShowPaymentDialog(false);
    toast.success(
      "Upgrade successful! You now have unlimited password storage.",
      {
        duration: 5000,
      }
    );
    // If we were adding a password when upgrade was triggered, show the add dialog again
    if (newPassword.title || newPassword.username || newPassword.password) {
      setShowAddDialog(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">Password Vault</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your secure passwords in one place
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-3">
              {!isPremium && (
                <Button
                  onClick={() => setShowUpgradeDialog(true)}
                  variant="outline"
                  className="rounded-lg shadow-sm border-gradient-to-r from-amber-400 to-amber-600 text-amber-700 dark:text-amber-400">
                  <CreditCard size={16} className="mr-2 text-amber-500" />
                  Upgrade ({3 - passwords.length} slots left)
                </Button>
              )}
              <Button
                onClick={() => setShowAddDialog(true)}
                className="rounded-lg shadow-sm">
                <Plus size={16} className="mr-2" />
                Add Password
              </Button>
            </div>
          </div>

          {isPremium && (
            <div className="mb-6">
              <div className="glass-panel rounded-xl p-4 border-gradient-to-r from-amber-300 to-amber-500">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-400/20 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Unlimited password storage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="glass-panel rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                />
                <Input
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="neumorphic" className="gap-2">
                      <Filter size={16} />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setSelectedCategory(null)}
                      className={`${
                        !selectedCategory
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : ""
                      }`}>
                      <FolderOpen size={16} className="mr-2" />
                      All Categories
                      {!selectedCategory && (
                        <CheckCircle2 size={16} className="ml-2" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`${
                          selectedCategory === category
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : ""
                        }`}>
                        <FolderOpen size={16} className="mr-2" />
                        {category}
                        {selectedCategory === category && (
                          <CheckCircle2 size={16} className="ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${
                      viewMode === "grid" ? "bg-secondary" : ""
                    }`}
                    onClick={() => setViewMode("grid")}>
                    <Grid3X3 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${
                      viewMode === "list" ? "bg-secondary" : ""
                    }`}
                    onClick={() => setViewMode("list")}>
                    <ListFilter size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {filteredPasswords.length === 0 ? (
            <div className="text-center py-16">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 inline-flex items-center justify-center mb-4">
                <ShieldCheck size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No passwords found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchTerm || selectedCategory
                  ? "No passwords match your search criteria"
                  : "You haven't added any passwords yet"}
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus size={16} className="mr-2" />
                Add Your First Password
              </Button>
            </div>
          ) : (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-6`}>
              {filteredPasswords.map((password) => (
                <PasswordCard
                  key={password.id}
                  {...password}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}

              {!isPremium && passwords.length < 3 && (
                <div
                  className="border border-dashed rounded-xl flex flex-col items-center justify-center p-8 hover:border-primary/50 transition-colors cursor-pointer hover:bg-primary/5"
                  onClick={() => setShowAddDialog(true)}>
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Plus size={24} className="text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Add Password</h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {3 - passwords.length} free slots available
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add Password Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Password</DialogTitle>
            <DialogDescription>
              Add a new password to your encrypted vault
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newPassword.title}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, title: e.target.value })
                }
                placeholder="e.g. Google, Twitter, Bank"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                value={newPassword.username}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, username: e.target.value })
                }
                placeholder="e.g. your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={newPassword.password}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                Website URL (optional)
              </label>
              <Input
                id="url"
                value={newPassword.url}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, url: e.target.value })
                }
                placeholder="e.g. https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="category"
                value={newPassword.category}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, category: e.target.value })
                }
                placeholder="e.g. Work, Personal, Finance"
              />
            </div>
          </div>

          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddPassword}>
              <Key size={16} className="mr-2" />
              Save Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Account Dialog */}
      <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <AlertDialogContent className="font-jakarta">
          <AlertDialogHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <AlertDialogTitle className="text-xl text-center">
              Upgrade to Premium
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You've reached the limit of 3 free passwords. Upgrade to premium
              for unlimited password storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-primary/5 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Premium Benefits:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited password storage</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Advanced security features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Cross-device synchronization</span>
              </li>
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100">
              Maybe Later
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpgradeClick}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Upgrade Now - $4.99/month
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Enter your payment details to upgrade to Premium
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 mb-2">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Premium Plan - $4.99/month
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="cardName" className="text-sm font-medium">
                Name on Card
              </label>
              <Input id="cardName" placeholder="John Smith" />
            </div>

            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>

              <div className="space-y-2">
                <label htmlFor="cvc" className="text-sm font-medium">
                  CVC
                </label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>

          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handlePaymentSuccess}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              <CreditCard size={16} className="mr-2" />
              Pay $4.99/month
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
