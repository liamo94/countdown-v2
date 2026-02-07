export const getConsonants = () => {
  const consonants: string[] = [];
  for (let i = 0; i <= 74; i++) {
    if (i <= 1) {
      consonants.push("B");
    } else if (i > 1 && i <= 4) {
      consonants.push("C");
    } else if (i > 4 && i <= 11) {
      consonants.push("D");
    } else if (i > 11 && i <= 13) {
      consonants.push("F");
    } else if (i > 13 && i <= 16) {
      consonants.push("G");
    } else if (i > 16 && i <= 18) {
      consonants.push("H");
    } else if (i > 18 && i <= 19) {
      consonants.push("J");
    } else if (i > 19 && i <= 20) {
      consonants.push("K");
    } else if (i > 20 && i <= 25) {
      consonants.push("L");
    } else if (i > 25 && i <= 29) {
      consonants.push("M");
    } else if (i > 29 && i <= 37) {
      consonants.push("N");
    } else if (i > 37 && i <= 41) {
      consonants.push("P");
    } else if (i > 41 && i <= 42) {
      consonants.push("Q");
    } else if (i > 42 && i <= 51) {
      consonants.push("R");
    } else if (i > 51 && i <= 60) {
      consonants.push("S");
    } else if (i > 60 && i <= 69) {
      consonants.push("T");
    } else if (i > 69 && i <= 70) {
      consonants.push("V");
    } else if (i > 70 && i <= 71) {
      consonants.push("W");
    } else if (i > 71 && i <= 72) {
      consonants.push("X");
    } else if (i > 72 && i <= 73) {
      consonants.push("Y");
    } else if (i > 73 && i <= 74) {
      consonants.push("Z");
    }
  }
  return consonants;
};
