import { useState, useLayoutEffect } from "react";

import { registerSW } from "virtual:pwa-register";

import { pingServiceWorker } from "../utils/ping-pong";

type Props = {
  ms: number;
  children: JSX.Element;
};

export function RegisterSW({ ms, children }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useLayoutEffect(() => {
    const run = async () => {
      registerSW({ immediate: true });
      await pingServiceWorker(ms);
      setLoading(false);
    };

    run().catch(() => {
      setLoading(false);
      setError(true);
    });
  }, []);

  if (loading) return null;

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <button
          type="button"
          className="btn btn-outline btn-error"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return children;
}
