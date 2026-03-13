import { createContext, useContext } from "react";

export interface IAudioContextType {
  muted: boolean;
  toggleMute: () => void;
  handleAudioStart: () => void;
  playZaWarudo: () => void;
  isTimeStop: boolean;
  isSfxPlaying: boolean;
}

export const AudioContext = createContext<IAudioContextType | undefined>(
  undefined,
);

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
