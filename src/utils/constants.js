export const DEFAULT_MESSAGES = (() => {
  const result = [];

  for (let i = 0; i < 20; i++) {
    result.push({
      data: {
        text: `Message ${i}`,
        date: new Date(),
        username: 'Samuel',
      },
    });
  }

  return result;
})();
