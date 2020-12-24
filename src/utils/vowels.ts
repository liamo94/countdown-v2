export const getVowels = () => {
  const vowels: string[] = [];
  for (let i = 0; i <= 66; i++) {
    if (i <= 14) {
      vowels.push("A");
    } else if (i > 14 && i <= 36) {
      vowels.push("E");
    } else if (i > 36 && i <= 48) {
      vowels.push("I");
    } else if (i > 48 && i <= 61) {
      vowels.push("O");
    } else if (i > 61 && i <= 66) {
      vowels.push("U");
    }
  }
  return vowels;
};
