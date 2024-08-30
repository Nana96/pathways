// react-scrollama.d.ts
declare module "react-scrollama" {
  // Typdefinitions for Scrollama components

  type EnterExitOptions<TData = unknown> = {
    element: HTMLElement; // The DOM node of the step that was triggered
    data: TData; // The data supplied to the step
    direction: "up" | "down"; // 'up' or 'down'
    entry: IntersectionObserverEntry; // the original `IntersectionObserver` entry
  };
  export type ScrollamaProps<TData = unknown> = {
    debug?: boolean;
    children: React.ReactNode;
    offset?: number | string;
    onStepEnter?: (options: EnterExitOptions<TData>) => void;
    onStepExit?: (options: EnterExitOptions<TData>) => void;
    onStepProgress?:
      | ((options: {
          element: HTMLElement;
          data: TData;
          progress: number;
          direction: "up";
        }) => void)
      | null;
    threshold?: number;
  };

  const Scrollama: <TData = unknown>(
    props: ScrollamaProps<TData>
  ) => JSX.Element;

  // Typdefinitions for Step components
  export interface StepProps<TData = unknown> {
    children: React.ReactNode;
    data: TData;
  }

  const Step: <TData = unknown>(props: StepProps<TData>) => JSX.Element;
}
