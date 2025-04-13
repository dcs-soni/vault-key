import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  ListFilter,
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
import { useLiveQuery } from "dexie-react-hooks";
import { db, Password } from "@/db/db";
import { MasterPasswordSetup } from "../components/MasterPasswordSetup";
import { MasterPasswordVerification } from "../components/MasterPasswordVerification";
import { masterPasswordService } from "../services/masterPasswordService";

export default function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Use Dexie's live query to get passwords
  const passwords = useLiveQuery(() => db.passwords.toArray()) || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [editingPasswordId, setEditingPasswordId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState<Omit<Password, "id">>({
    title: "",
    username: "",
    password: "",
    url: "",
    category: "Uncategorized",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [isMasterPasswordVerified, setIsMasterPasswordVerified] = useState(false);

  const initializeData = async () => {
    try {
      // Ensure database is initialized
      await db.initialize();
      
      const count = await db.passwords.count();
      if (count === 0) {
        const samplePassword = {
          title: "Google",
          username: "user@example.com",
          password: "StrongPassword123!",
          url: "https://google.com",
          category: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.passwords.add(samplePassword);
      }
      return true;
    } catch (error) {
      console.error("Error initializing data:", error);
      toast.error("Failed to initialize dashboard data");
      return false;
    }
  };

  useEffect(() => {
    const checkMasterPasswordStatus = async () => {
      try {
        setIsLoading(true);
        const hasMasterPassword = await masterPasswordService.hasMasterPassword();
        setIsNewUser(!hasMasterPassword);
        
        const isVerified = localStorage.getItem("masterPasswordVerified") === "true";
        if (isVerified) {
          const initialized = await initializeData();
          if (initialized) {
            setIsMasterPasswordVerified(true);
          } else {
            localStorage.removeItem("masterPasswordVerified");
            setIsMasterPasswordVerified(false);
          }
        }
      } catch (error) {
        console.error("Error checking master password status:", error);
        toast.error("Error loading dashboard");
        localStorage.removeItem("masterPasswordVerified");
        setIsMasterPasswordVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      checkMasterPasswordStatus();
    }
  }, [isAuthenticated]);

  const handleMasterPasswordSuccess = async () => {
    try {
      setIsLoading(true);
      const initialized = await initializeData();
      if (initialized) {
        setIsMasterPasswordVerified(true);
        localStorage.setItem("masterPasswordVerified", "true");
        toast.success("Successfully accessed dashboard");
      } else {
        throw new Error("Failed to initialize dashboard");
      }
    } catch (error) {
      console.error("Error initializing dashboard:", error);
      toast.error("Error accessing dashboard");
      setIsMasterPasswordVerified(false);
      localStorage.removeItem("masterPasswordVerified");
    } finally {
      setIsLoading(false);
    }
  };

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
              variant="teal"
              size="xl"
              onClick={() => navigate("/auth")}
              className="w-full flex items-center justify-center gap-2">
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isMasterPasswordVerified) {
    if (isNewUser) {
      return <MasterPasswordSetup onSuccess={handleMasterPasswordSuccess} />;
    }
    return <MasterPasswordVerification onSuccess={handleMasterPasswordSuccess} />;
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
    new Set(passwords.map((password) => password.category || "Uncategorized"))
  );

  const handleEdit = async (id: string) => {
    const numericId = parseInt(id);
    if (isNaN(numericId)) return;

    try {
      const password = await db.passwords.get(numericId);
      if (password) {
        setNewPassword({
          title: password.title,
          username: password.username,
          password: password.password,
          url: password.url || "",
          category: password.category,
          createdAt: password.createdAt,
          updatedAt: password.updatedAt,
        });
        setEditingPasswordId(numericId);
        setShowEditDialog(true);
      }
    } catch (error) {
      toast.error("Failed to retrieve password");
    }
  };

  const handleEditSave = async () => {
    if (!editingPasswordId) return;

    if (!newPassword.title || !newPassword.username || !newPassword.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await db.passwords.update(editingPasswordId, {
        ...newPassword,
        updatedAt: new Date(),
      });

      setShowEditDialog(false);
      setEditingPasswordId(null);
      setNewPassword({
        title: "",
        username: "",
        password: "",
        url: "",
        category: "Uncategorized",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  const handleDelete = async (id: string) => {
    const numericId = parseInt(id);
    if (isNaN(numericId)) return;

    try {
      await db.passwords.delete(numericId);
      toast.success("Password deleted successfully");
    } catch (error) {
      toast.error("Failed to delete password");
    }
  };

  const handleAddPassword = async () => {
    if (!newPassword.title || !newPassword.username || !newPassword.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if adding this password would exceed the limit
    if (passwords.length >= 3) {
      setShowAddDialog(false);
      setShowUpgradeDialog(true);
      return;
    }

    try {
      await db.passwords.add({
        ...newPassword,
        updatedAt: new Date(),
      });

      setNewPassword({
        title: "",
        username: "",
        password: "",
        url: "",
        category: "Uncategorized",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setShowAddDialog(false);
      toast.success("Password added successfully");

      // Show upgrade dialog if we've reached the limit
      if (passwords.length === 2) {
        setTimeout(() => {
          setShowUpgradeDialog(true);
        }, 500);
      }
    } catch (error) {
      toast.error("Failed to add password");
    }
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

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
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
                  Upgrade ({Math.max(0, 3 - passwords.length)} slots left)
                </Button>
              )}
              <Button
                onClick={() => {
                  if (passwords.length >= 3 && !isPremium) {
                    setShowUpgradeDialog(true);
                  } else {
                    setShowAddDialog(true);
                  }
                }}
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
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}>
                        {category}
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
                  id={String(password.id)}
                  title={password.title}
                  username={password.username}
                  password={password.password}
                  url={password.url}
                  category={password.category || "Uncategorized"}
                  updatedAt={password.updatedAt}
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
                    {Math.max(0, 3 - passwords.length)} free slots available
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

      {/* Edit Password Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Password</DialogTitle>
            <DialogDescription>
              Update your stored password information
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={newPassword.title}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, title: e.target.value })
                }
                placeholder="e.g. Google, Twitter, Bank"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="edit-username"
                value={newPassword.username}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, username: e.target.value })
                }
                placeholder="e.g. your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="edit-password"
                type="password"
                value={newPassword.password}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-url" className="text-sm font-medium">
                Website URL (optional)
              </label>
              <Input
                id="edit-url"
                value={newPassword.url}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, url: e.target.value })
                }
                placeholder="e.g. https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="edit-category"
                value={newPassword.category}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, category: e.target.value })
                }
                placeholder="e.g. Work, Personal, Finance"
              />
            </div>
          </div>

          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false);
                setEditingPasswordId(null);
                setNewPassword({
                  title: "",
                  username: "",
                  password: "",
                  url: "",
                  category: "Uncategorized",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
              }}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              <Key size={16} className="mr-2" />
              Save Changes
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
