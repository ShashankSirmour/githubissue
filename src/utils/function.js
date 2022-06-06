export const msToSeconds = (ms) => (Math.round(ms) / 1000).toFixed(2);

export function randomChar() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  return characters.charAt(Math.floor(Math.random() * charactersLength));
}

export const getGameStateWithRandomChar = (round) => {
  const char = randomChar();
  return {
    round,
    char,
  };
};
