export const generateCustomMessage = (
  messageString = '',
  ...words: string[]
) => {
  const wordsToReplace = [...words];

  let message = String(messageString);

  for (let i = 0; i < wordsToReplace.length; i++) {
    message = String(message).replace(`{key${i}}`, wordsToReplace[i]);
  }

  return message;
};
