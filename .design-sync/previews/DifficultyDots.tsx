import { DifficultyDots } from '@semiconlabs/web';

// level is required — the floor card passed undefined and threw on
// level.toLowerCase(), so every export here supplies a real Difficulty.
export const AllLevels = () => (
  <div className="flex flex-wrap items-center gap-4">
    <DifficultyDots level="BEGINNER" />
    <DifficultyDots level="INTERMEDIATE" />
    <DifficultyDots level="ADVANCED" />
  </div>
);
