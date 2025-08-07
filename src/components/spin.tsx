import React, { useRef, useState, useEffect, useCallback } from "react";

interface SpinProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hapticStep?: number;
}

export default function Spin({
  children,
  className,
  style,
  hapticStep = 10,
}: SpinProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const lastAngleRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastVibrateDeg = useRef<number>(0);

  const animateSpinRef = useRef<() => void>(() => {});
  animateSpinRef.current = () => {
    let lastTimestamp = performance.now();
    const friction = 0.98;

    const step = (now: number) => {
      const dt = now - lastTimestamp;
      lastTimestamp = now;
      const velocity = velocityRef.current * Math.pow(friction, dt / 16);
      velocityRef.current = velocity;

      setRotation((r) => {
        const newRot = r + velocity * dt;
        // Haptic feedback every hapticStep deg
        if (
          navigator.vibrate &&
          Math.abs(Math.round(newRot / hapticStep) - Math.round(lastVibrateDeg.current / hapticStep)) >= 1
        ) {
          navigator.vibrate(10);
          lastVibrateDeg.current = newRot;
        }
        return newRot;
      });

      if (Math.abs(velocity) > 0.001) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        velocityRef.current = 0;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const getAngle = (clientX: number, clientY: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handleSpinMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!wrapperRef.current) return;
    let clientX, clientY;
    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    const angle = getAngle(clientX, clientY);
    const now = performance.now();
    if (lastAngleRef.current !== null && lastTimeRef.current !== null) {
      let delta = angle - lastAngleRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      setRotation((r) => r + delta);

      velocityRef.current = delta / (now - lastTimeRef.current);
    }
    lastAngleRef.current = angle;
    lastTimeRef.current = now;
    e.preventDefault?.();
  }, []);

  const handleSpinEnd = useCallback(() => {
    setSpinning(false);
    document.removeEventListener("mousemove", handleSpinMove as (e: MouseEvent | TouchEvent) => void);
    document.removeEventListener("touchmove", handleSpinMove as (e: MouseEvent | TouchEvent) => void);
    document.removeEventListener("mouseup", handleSpinEnd as () => void);
    document.removeEventListener("touchend", handleSpinEnd as () => void);
    lastAngleRef.current = null;
    lastTimeRef.current = null;
    animateSpinRef.current();
  }, [handleSpinMove]);

  const handleSpinStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setSpinning(true);
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    lastAngleRef.current = getAngle(clientX, clientY);
    lastTimeRef.current = performance.now();

    document.addEventListener("mousemove", handleSpinMove as (e: MouseEvent | TouchEvent) => void);
    document.addEventListener("touchmove", handleSpinMove as (e: MouseEvent | TouchEvent) => void, { passive: false });
    document.addEventListener("mouseup", handleSpinEnd as () => void);
    document.addEventListener("touchend", handleSpinEnd as () => void);
  }, [handleSpinMove, handleSpinEnd]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      document.removeEventListener("mousemove", handleSpinMove as (e: MouseEvent | TouchEvent) => void);
      document.removeEventListener("touchmove", handleSpinMove as (e: MouseEvent | TouchEvent) => void);
      document.removeEventListener("mouseup", handleSpinEnd as () => void);
      document.removeEventListener("touchend", handleSpinEnd as () => void);
    };
  }, [handleSpinMove, handleSpinEnd]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleSpinStart}
      onTouchStart={handleSpinStart}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? "none" : "transform 0.2s cubic-bezier(.17,.67,.83,.67)",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}