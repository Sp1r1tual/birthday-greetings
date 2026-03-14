import { useState, useRef, useEffect, useCallback } from "react";

import bgMusic from "@/assets/music/golden_wind_56sec.mp3";

export interface IAudioState {
  audio: HTMLAudioElement;
  ctx: AudioContext;
  gain: GainNode;
}

const fadeIn = (gain: GainNode, ctx: AudioContext, duration = 2.5) => {
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + duration);
};

const startAudio = (): IAudioState => {
  const ctx = new window.AudioContext();
  const audio = new Audio(bgMusic);
  audio.loop = true;

  const source = ctx.createMediaElementSource(audio);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  source.connect(gain);
  gain.connect(ctx.destination);

  ctx.resume().then(() => {
    audio.play().catch(() => {});
    fadeIn(gain, ctx, 2.5);
  });

  return { audio, ctx, gain };
};

export function useAudio() {
  const [muted, setMuted] = useState(false);
  const audioStateRef = useRef<IAudioState | null>(null);

  useEffect(() => {
    return () => {
      audioStateRef.current?.audio.pause();
      audioStateRef.current?.ctx.close();
    };
  }, []);

  const handleAudioStart = useCallback(() => {
    if (!audioStateRef.current) {
      audioStateRef.current = startAudio();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioStateRef.current) {
      audioStateRef.current = startAudio();
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
      setMuted(false);
      return;
    }
    const { ctx, gain } = audioStateRef.current;
    if (!muted) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setMuted(true);
    } else {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.6);
      setMuted(false);
    }
  }, [muted]);

  return {
    muted,
    toggleMute,
    handleAudioStart,
  };
}
