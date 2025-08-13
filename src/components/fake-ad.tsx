"use client";

import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface FakeAdProps {
  /** Time in milliseconds before the ad shows up */
  delayMs?: number;
  /** Callback when ad is dismissed */
  onDismiss?: () => void;
  /** Whether to show the ad only once per session */
  showOncePerSession?: boolean;
  /** Custom CSS classes for the dialog content */
  className?: string;
  /** The ad content to display */
  children: React.ReactNode;
}

export default function FakeAd({
  delayMs = 10000, // 10 seconds default
  onDismiss,
  showOncePerSession = true,
  className,
  children,
}: FakeAdProps) {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Check if ad was already shown this session
    if (showOncePerSession) {
      const hasShownAd = sessionStorage.getItem("fake-ad-shown");
      if (hasShownAd) {
        return;
      }
    }

    // Show ad after delay
    const timer = setTimeout(() => {
      setShowAd(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, showOncePerSession]);

  const handleClose = () => {
    setShowAd(false);
    if (showOncePerSession) {
      sessionStorage.setItem("fake-ad-shown", "true");
    }
    onDismiss?.();
  };

  return (
    <AlertDialog open={showAd} onOpenChange={handleClose}>
      <AlertDialogContent
        className={cn(" max-w-md border-4 border-dashed", className)}
      >
        <div className="relative bg-background rounded-lg">
          <div className="p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg -m-1" />
            <div className="relative bg-background rounded-lg p-4 m-1">
              {children}
            </div>
          </div>

          <div className="absolute top-2 right-2 bg-muted px-2 py-1 rounded text-xs text-muted-foreground z-10">
            AD
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
