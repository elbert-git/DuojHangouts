export function checkIfStringIsEmpty(str) {
  return /^\s*$/.test(str);
}

export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function isEmoji(emoji){
  const emojiRegex = /[\p{Emoji}]/gu;
  return emojiRegex.test(emoji);

}