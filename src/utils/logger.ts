export enum LogLevel {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR,
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.setLevel(level);
  }

  public getLevel(): LogLevel {
    return this.level;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public log(level: LogLevel, msg: string, ...params: any): void {
    if (level >= this.level) {
      const message = `[WakaTime][${LogLevel[level]}] ${msg}`;
      if (params.length > 0) {
        if (level === LogLevel.DEBUG) console.log(message, ...params);
        if (level === LogLevel.INFO) console.info(message, ...params);
        if (level === LogLevel.WARN) console.warn(message, ...params);
        if (level === LogLevel.ERROR) console.error(message, ...params);
      } else {
        if (level === LogLevel.DEBUG) console.log(message);
        if (level === LogLevel.INFO) console.info(message);
        if (level === LogLevel.WARN) console.warn(message);
        if (level === LogLevel.ERROR) console.error(message);
      }
    }
  }

  public debug(msg: string, ...params: any): void {
    this.log(LogLevel.DEBUG, msg, ...params);
  }

  public info(msg: string, ...params: any): void {
    this.log(LogLevel.INFO, msg, ...params);
  }

  public warn(msg: string, ...params: any): void {
    this.log(LogLevel.WARN, msg, ...params);
  }

  public error(msg: string, ...params: any): void {
    this.log(LogLevel.ERROR, msg, ...params);
  }
}

const logger = new Logger();
export default logger;
