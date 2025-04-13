import React, { useState } from "react";
import { Eye, EyeOff, Copy, Edit, Trash, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface PasswordCardProps {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  updatedAt: Date;
  category?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({
  id,
  title,
  username,
  password,
  url,
  updatedAt,
  category = "Uncategorized",
  onEdit,
  onDelete,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = (text: string, type: "password" | "username") => {
    navigator.clipboard.writeText(text);
    toast.success(
      `${type === "password" ? "Password" : "Username"} copied to clipboard`
    );
  };

  const maskPassword = (pwd: string) => {
    return "•".repeat(Math.min(12, pwd.length));
  };

  const getFaviconUrl = (urlString?: string) => {
    if (!urlString) return null;
    try {
      const url = new URL(
        urlString.startsWith("http") ? urlString : `https://${urlString}`
      );
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch (e) {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(url);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "group relative p-5 overflow-hidden shadow-premium",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-800/30 rounded-xl",
        "hover:shadow-lg transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="spotlight-effect"></div>

      <div className="flex items-start mb-4 relative z-10">
        {faviconUrl ? (
          <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 border border-gray-100 dark:border-gray-800 flex-shrink-0 shadow-sm">
            <img
              src={faviconUrl}
              alt={`${title} favicon`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mr-3 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-primary dark:text-primary/90 font-semibold text-sm">
              {title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate pr-8">{title}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
            <span className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 rounded-full text-primary dark:text-primary/90 truncate max-w-[120px]">
              {category}
            </span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs truncate">{formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex justify-between">
            <span>Username</span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(username, "username")}>
              <Copy size={12} />
            </Button>
          </div>
          <div className="px-3 py-2 bg-gray-50/80 dark:bg-gray-900/80 rounded-lg text-sm truncate border border-gray-100/80 dark:border-gray-800/80 hover:border-primary/30 transition-colors">
            {username}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex justify-between">
            <span>Password</span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(password, "password")}>
              <Copy size={12} />
            </Button>
          </div>
          <div className="px-3 py-2 bg-gray-50/80 dark:bg-gray-900/80 rounded-lg text-sm truncate relative border border-gray-100/80 dark:border-gray-800/80 hover:border-primary/30 transition-colors flex items-center">
            <span className="flex-1 mr-2 font-mono">
              {isPasswordVisible ? password : maskPassword(password)}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7"
              onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>
          </div>
        </div>

        {url && (
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className="truncate flex-1">{url}</span>
            <a
              href={url.startsWith("http") ? url : `https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-primary hover:text-primary/80 transition-colors">
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      <div
        className={cn(
          "absolute top-2 right-2 flex space-x-1 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
        <Button
          variant="glass"
          size="icon-sm"
          className="h-7 w-7 rounded-full shadow-sm"
          onClick={() => onEdit?.(id)}>
          <Edit size={14} />
        </Button>
        <Button
          variant="glass"
          size="icon-sm"
          className="h-7 w-7 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 shadow-sm"
          onClick={() => onDelete?.(id)}>
          <Trash size={14} />
        </Button>
      </div>
    </motion.div>
  );
};

export default PasswordCard;
