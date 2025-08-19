"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FidgetSpinnerProps {
  children: React.ReactNode;
  friction?: number; // Friction coefficient (0-1)
  className?: string;
  audioEnabled?: boolean;
  audioInterval?: number;
  maxTicksPerSecond?: number;
}

export default function FidgetSpinner({
  children,
  friction = 0.98,
  className = "",
  audioEnabled = true,
  audioInterval = 45,
  maxTicksPerSecond = 15,
}: FidgetSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastAudioAngle, setLastAudioAngle] = useState(0);

  const stateRef = useRef({
    isDragging: false,
    rotation: 0,
    velocity: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    stateRef.current.isDragging = isDragging;
    stateRef.current.rotation = rotation;
    stateRef.current.velocity = velocity;
  }, [isDragging, rotation, velocity]);

  const dragStateRef = useRef({
    startAngle: 0,
    startRotation: 0,
    lastAngle: 0,
    lastTime: 0,
    velocityBuffer: [] as { angle: number; time: number }[],
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const clickBufferRef = useRef<AudioBuffer | null>(null);
  const lastClickSoundTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!audioEnabled) return;
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    fetch("tick.mp3")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        clickBufferRef.current = audioBuffer;
      });
    return () => {
      ctx.close();
    };
  }, [audioEnabled]);

  const triggerAudioTick = useCallback(() => {
    if (audioEnabled && audioContextRef.current && clickBufferRef.current) {
      const now = performance.now();
      const minInterval = 1000 / maxTicksPerSecond;
      if (now - lastClickSoundTimeRef.current >= minInterval) {
        lastClickSoundTimeRef.current = now;
        try {
          const ctx = audioContextRef.current;
          const source = ctx.createBufferSource();
          source.buffer = clickBufferRef.current;
          source.connect(ctx.destination);
          source.start(0);
        } catch (error) {
          console.log("Audio not supported:", error);
        }
      }
    }
  }, [audioEnabled, maxTicksPerSecond]);

  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!spinnerRef.current) return 0;

    const rect = spinnerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }, []);

  useEffect(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const currentAudioStep = Math.floor(normalizedRotation / audioInterval);
    const lastAudioStep = Math.floor(
      (((lastAudioAngle % 360) + 360) % 360) / audioInterval
    );

    if (currentAudioStep !== lastAudioStep) {
      triggerAudioTick();
      setLastAudioAngle(rotation);
    }
  }, [rotation, audioInterval, lastAudioAngle, triggerAudioTick]);

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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      e.preventDefault();

      const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
      const currentTime = performance.now();

      let angleDiff = currentAngle - dragStateRef.current.lastAngle;

      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = stateRef.current.rotation + angleDiff;
      setRotation(newRotation);

      const timeDiff = currentTime - dragStateRef.current.lastTime;
      if (timeDiff > 0) {
        const angularVelocity = (angleDiff / timeDiff) * 16; // Normalize to ~60fps

        dragStateRef.current.velocityBuffer.push({
          angle: angularVelocity,
          time: currentTime,
        });

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

    const recentSamples = dragStateRef.current.velocityBuffer;
    if (recentSamples.length > 0) {
      const avgVelocity =
        recentSamples.reduce((sum, sample) => sum + sample.angle, 0) /
        recentSamples.length;
      setVelocity(avgVelocity);
    }

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

      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = rotation + angleDiff;
      setRotation(newRotation);

      const timeDiff = currentTime - dragStateRef.current.lastTime;
      if (timeDiff > 0) {
        const angularVelocity = (angleDiff / timeDiff) * 16; // Normalize to ~60fps

        dragStateRef.current.velocityBuffer.push({
          angle: angularVelocity,
          time: currentTime,
        });

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

    const recentSamples = dragStateRef.current.velocityBuffer;
    if (recentSamples.length > 0) {
      const avgVelocity =
        recentSamples.reduce((sum, sample) => sum + sample.angle, 0) /
        recentSamples.length;
      setVelocity(avgVelocity);
    }
  }, []);

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
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
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
