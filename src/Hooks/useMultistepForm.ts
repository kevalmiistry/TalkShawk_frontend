import { ReactElement, useState } from "react";

type HookReturns = {
  stepsLength: number;
  currentStepIndex: number;
  theStep: ReactElement;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};
const useMultistepForm = (steps: ReactElement[]): HookReturns => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    stepsLength: steps.length,
    currentStepIndex,
    theStep: steps[currentStepIndex],
    goTo,
    next,
    back,
    isFirstPage: currentStepIndex === 0,
    isLastPage: currentStepIndex === steps.length - 1,
  };
};
export default useMultistepForm;
