export const PING = "PING";
export const PONG = "PONG";
export const PINT_PONG = "PING-PONG";

class ServiceWorkerChecker {
  private readonly broadcast = new BroadcastChannel(PINT_PONG);

  private timer?: ReturnType<typeof setInterval>;

  private resolve?: () => void;

  private reject?: (reason: Error) => void;

  constructor() {
    this.broadcast.addEventListener("message", this.handleMessage);
  }

  check = (ms: number) => {
    return new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      this.timer = this.startPolling(ms);
    });
  };

  handleMessage = (event: MessageEvent<{ type: typeof PONG }>) => {
    if (event.data.type !== PONG) return;

    if (this.timer) clearInterval(this.timer);
    if (this.resolve) this.resolve();
  };

  startPolling = (ms: number) => {
    const startTime = Date.now();

    return setInterval(() => {
      this.broadcast.postMessage({ type: PING });
      if (Date.now() - startTime >= ms) {
        if (this.timer) clearInterval(this.timer);
        if (this.reject) {
          this.reject(
            new Error("Please check whether the service worker is abnormal.")
          );
        }
      }
    }, 50);
  };
}

export const pingServiceWorker = (ms: number) => {
  const checker = new ServiceWorkerChecker();
  return checker.check(ms);
};
