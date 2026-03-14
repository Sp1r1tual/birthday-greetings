import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import bgMusic from "@/assets/music/golden_wind_56sec.mp3";
import zaWarudoSfx from "@/assets/music/za_warudo.mp3";
import zaWarudoUnfreezeSfx from "@/assets/music/za_warudo_unfreeze.mp3";

import type { IAudioState } from "@/common/types/audio";
import { AudioContext } from "./AudioContext";

const fadeIn = (gain: GainNode, ctx: AudioContext, duration = 2.5) => {
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + duration);
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [muted, setMuted] = useState(false);
  const [isTimeStop, setIsTimeStop] = useState(false);
  const [isSfxPlaying, setIsSfxPlaying] = useState(false);
  const audioStateRef = useRef<IAudioState | null>(null);
  const zaWarudoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unfreezeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sfxResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAudio = useCallback((): IAudioState => {
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
  }, []);

  const handleAudioStart = useCallback(() => {
    if (!audioStateRef.current) {
      audioStateRef.current = startAudio();
    }
  }, [startAudio]);

  const toggleMute = useCallback(() => {
    if (isSfxPlaying || isTimeStop) return;
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
    setIsTimeStop(false);
  }, [muted, startAudio, isSfxPlaying, isTimeStop]);

  const playZaWarudo = useCallback(() => {
    if (isSfxPlaying) return;

    if (!audioStateRef.current) {
      audioStateRef.current = startAudio();
      setIsTimeStop(true);
      setMuted(true);
      setIsSfxPlaying(true);
      const sfx = new Audio(zaWarudoSfx);
      sfx.volume = 0.8;
      sfx.play().catch(() => {});

      if (sfxResetTimerRef.current) clearTimeout(sfxResetTimerRef.current);
      sfxResetTimerRef.current = setTimeout(() => setIsSfxPlaying(false), 5500);
      return;
    }

    const { gain, ctx } = audioStateRef.current;

    if (!isTimeStop) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);

      setMuted(true);
      setIsTimeStop(true);
      setIsSfxPlaying(true);

      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 400]);
      }

      if (zaWarudoTimerRef.current) clearTimeout(zaWarudoTimerRef.current);
      zaWarudoTimerRef.current = setTimeout(() => {
        const sfx = new Audio(zaWarudoSfx);
        sfx.volume = 0.8;
        sfx.play().catch(() => {});
      }, 100);

      if (sfxResetTimerRef.current) clearTimeout(sfxResetTimerRef.current);
      sfxResetTimerRef.current = setTimeout(() => setIsSfxPlaying(false), 5500);
    } else {
      setIsSfxPlaying(true);
      const sfx = new Audio(zaWarudoUnfreezeSfx);
      sfx.volume = 0.8;
      sfx.play().catch(() => {});

      if (sfxResetTimerRef.current) clearTimeout(sfxResetTimerRef.current);
      sfxResetTimerRef.current = setTimeout(() => setIsSfxPlaying(false), 1700);

      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }

      if (unfreezeTimerRef.current) clearTimeout(unfreezeTimerRef.current);
      unfreezeTimerRef.current = setTimeout(() => {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
        setMuted(false);
        setIsTimeStop(false);
      }, 1700);
    }
  }, [isTimeStop, startAudio, isSfxPlaying]);

  useEffect(() => {
    return () => {
      audioStateRef.current?.audio.pause();
      audioStateRef.current?.ctx.close();
      if (zaWarudoTimerRef.current) clearTimeout(zaWarudoTimerRef.current);
      if (unfreezeTimerRef.current) clearTimeout(unfreezeTimerRef.current);
      if (sfxResetTimerRef.current) clearTimeout(sfxResetTimerRef.current);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        muted,
        toggleMute,
        handleAudioStart,
        playZaWarudo,
        isTimeStop,
        isSfxPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
