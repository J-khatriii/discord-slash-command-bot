const commandConfig = {
  report: true,
  status: true,
};

export const getCommandConfig = () => commandConfig;

export const isCommandEnabled = (command) => {
  return commandConfig[command] ?? true;
};

export const setCommandEnabled = (command, enabled) => {
  commandConfig[command] = enabled;
};
