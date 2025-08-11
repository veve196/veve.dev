"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface FidgetSpinnerProps {
  children: React.ReactNode;
  hapticInterval?: number; // Degrees between haptic feedback
  friction?: number; // Friction coefficient (0-1)
  className?: string;
}

export default function FidgetSpinner({
  children,
  hapticInterval = 15,
  friction = 0.98,
  className = "",
}: FidgetSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastHapticAngle, setLastHapticAngle] = useState(0);

  // Refs to store current state for event handlers
  const stateRef = useRef({
    isDragging: false,
    rotation: 0,
    velocity: 0,
  });

  // Animation frame reference
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Update refs when state changes
  useEffect(() => {
    stateRef.current.isDragging = isDragging;
    stateRef.current.rotation = rotation;
    stateRef.current.velocity = velocity;
  }, [isDragging, rotation, velocity]);

  // Drag state
  const dragStateRef = useRef({
    startAngle: 0,
    startRotation: 0,
    lastAngle: 0,
    lastTime: 0,
    velocityBuffer: [] as { angle: number; time: number }[],
  });

  // Haptic feedback function
  const triggerHaptic = useCallback(() => {
    try {
      // Try multiple haptic feedback methods
      if ("vibrate" in navigator && navigator.vibrate) {
        navigator.vibrate(15); // Slightly longer vibration for better feel
      } else if ("hapticFeedback" in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).hapticFeedback.impact({ intensity: "light" });
      }

      // Add console log for debugging (remove in production)
      console.log("Haptic feedback triggered");
    } catch (error) {
      console.log("Haptic feedback not supported:", error);
    }
  }, []);

  // Calculate angle from center to mouse/touch position
  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!spinnerRef.current) return 0;

    const rect = spinnerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }, []);

  // Handle haptic feedback based on rotation
  useEffect(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const currentHapticStep = Math.floor(normalizedRotation / hapticInterval);
    const lastHapticStep = Math.floor(
      (((lastHapticAngle % 360) + 360) % 360) / hapticInterval
    );

    if (currentHapticStep !== lastHapticStep) {
      triggerHaptic();
      setLastHapticAngle(rotation); // Use raw rotation instead of normalized
    }
  }, [rotation, hapticInterval, lastHapticAngle, triggerHaptic]);

  // Animation loop for momentum
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!isDragging && Math.abs(velocity) > 0.1) {
        const deltaTime = currentTime - lastTimeRef.current;

        if (deltaTime > 16) {
          // ~60fps
          setRotation((prev) => prev + velocity);
          setVelocity((prev) => prev * friction);
          lastTimeRef.current = currentTime;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (!isDragging && Math.abs(velocity) > 0.1) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, velocity, friction]);

  // Mouse event handlers - defined in correct order to avoid circular dependencies
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      e.preventDefault();

      const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
      const currentTime = performance.now();

      let angleDiff = currentAngle - dragStateRef.current.lastAngle;

      // Handle angle wraparound
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = stateRef.current.rotation + angleDiff;
      setRotation(newRotation);

      // Track velocity for momentum
      const timeDiff = currentTime - dragStateRef.current.lastTime;
      if (timeDiff > 0) {
        const angularVelocity = (angleDiff / timeDiff) * 16; // Normalize to ~60fps

        dragStateRef.current.velocityBuffer.push({
          angle: angularVelocity,
          time: currentTime,
        });

        // Keep only recent velocity samples (last 100ms)
        dragStateRef.current.velocityBuffer =
          dragStateRef.current.velocityBuffer.filter(
            (sample) => currentTime - sample.time < 100
          );
      }

      dragStateRef.current.lastAngle = currentAngle;
      dragStateRef.current.lastTime = currentTime;
    },
    [getAngleFromCenter]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // Calculate average velocity from recent samples
    const recentSamples = dragStateRef.current.velocityBuffer;
    if (recentSamples.length > 0) {
      const avgVelocity =
        recentSamples.reduce((sum, sample) => sum + sample.angle, 0) /
        recentSamples.length;
      setVelocity(avgVelocity);
    }

    // Remove event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDragging(true);

      const angle = getAngleFromCenter(e.clientX, e.clientY);
      dragStateRef.current = {
        startAngle: angle,
        startRotation: stateRef.current.rotation,
        lastAngle: angle,
        lastTime: performance.now(),
        velocityBuffer: [],
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [getAngleFromCenter, handleMouseMove, handleMouseUp]
  );

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      setIsDragging(true);

      const angle = getAngleFromCenter(touch.clientX, touch.clientY);
      dragStateRef.current = {
        startAngle: angle,
        startRotation: rotation,
        lastAngle: angle,
        lastTime: performance.now(),
        velocityBuffer: [],
      };
    },
    [rotation, getAngleFromCenter]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      const currentAngle = getAngleFromCenter(touch.clientX, touch.clientY);
      const currentTime = performance.now();

      let angleDiff = currentAngle - dragStateRef.current.lastAngle;

      // Handle angle wraparound
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = rotation + angleDiff;
      setRotation(newRotation);

      // Track velocity for momentum
      const timeDiff = currentTime - dragStateRef.current.lastTime;
      if (timeDiff > 0) {
        const angularVelocity = (angleDiff / timeDiff) * 16; // Normalize to ~60fps

        dragStateRef.current.velocityBuffer.push({
          angle: angularVelocity,
          time: currentTime,
        });

        // Keep only recent velocity samples (last 100ms)
        dragStateRef.current.velocityBuffer =
          dragStateRef.current.velocityBuffer.filter(
            (sample) => currentTime - sample.time < 100
          );
      }

      dragStateRef.current.lastAngle = currentAngle;
      dragStateRef.current.lastTime = currentTime;
    },
    [isDragging, rotation, getAngleFromCenter]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    // Calculate average velocity from recent samples
    const recentSamples = dragStateRef.current.velocityBuffer;
    if (recentSamples.length > 0) {
      const avgVelocity =
        recentSamples.reduce((sum, sample) => sum + sample.angle, 0) /
        recentSamples.length;
      setVelocity(avgVelocity);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={spinnerRef}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: isDragging ? "none" : "transform 0.1s ease-out",
        touchAction: "none", // Prevent default touch behaviors
        userSelect: "none", // Prevent text selection
        WebkitUserSelect: "none", // Safari
        WebkitTouchCallout: "none", // iOS Safari
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
