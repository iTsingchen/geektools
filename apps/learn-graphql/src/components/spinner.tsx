import { SpinnerRoundOutlined, SpinnerInfinity } from "spinners-react";

export function RoundOutlinedSpinner() {
  return (
    <SpinnerRoundOutlined
      size={40}
      thickness={100}
      speed={100}
      className="!text-neutral opacity-25 mx-auto mt-4"
    />
  );
}

export function InfinitySpinner() {
  return (
    <SpinnerInfinity
      size={51}
      thickness={100}
      speed={100}
      className="!text-neutral"
      secondaryColor="rgba(0, 0, 0, 0.44)"
    />
  );
}
