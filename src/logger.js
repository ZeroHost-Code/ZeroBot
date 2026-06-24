const levels = { INFO: "INFO", WARN: "WARN", ERROR: "ERROR", DEBUG: "DEBUG" };

const colors = {
  INFO: "\x1b[36m",
  WARN: "\x1b[33m",
  ERROR: "\x1b[31m",
  DEBUG: "\x1b[90m",
  RESET: "\x1b[0m",
};

function log(level, message, ...args) {
  const color = colors[level] || colors.RESET;
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const prefix = `${timestamp} [${level}]`;
  console.log(`${color}${prefix}${colors.RESET} ${message}`, ...args);
}

module.exports = {
  info: (msg, ...args) => log(levels.INFO, msg, ...args),
  warn: (msg, ...args) => log(levels.WARN, msg, ...args),
  error: (msg, ...args) => log(levels.ERROR, msg, ...args),
  debug: (msg, ...args) => log(levels.DEBUG, msg, ...args),
};
