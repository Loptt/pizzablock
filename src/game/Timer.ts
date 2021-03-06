class Timer {
  private accumulatedTime: number;
  private resetTime: number;

  constructor(resetTime: number) {
    this.accumulatedTime = 0;
    this.resetTime = resetTime;
  }

  public tick(delta: number): void {
    this.accumulatedTime += delta;
  }

  public isActivated(): boolean {
    if (this.accumulatedTime >= this.resetTime) {
      this.accumulatedTime = 0;
      return true;
    }

    return false;
  }

  public reset(): void {
    this.accumulatedTime = 0;
  }

  public setResetTime(resetTime: number): void {
    this.resetTime = resetTime;
    this.reset();
  }
}

export default Timer;
