export const sum = (e: string[], numbers: number[]) => {
  const s: number[] = [];
  for (const num of e) {
    if (!isNaN(+num) && !numbers.includes(+num) && num && num !== " ") {
      return "Number not available";
    }
    if (num && num !== " " && !isNaN(+num)) {
      numbers.splice(numbers.indexOf(+num), 1);
    }
  }
  for (const i of e) {
    const t = i;
    if (!isNaN(+t)) s.push(+t);
    else {
      const o2 = s.pop();
      const o1 = s.pop();
      if (o1 === undefined || o2 === undefined) break;
      switch (t) {
        case "+":
          s.push(o1 + o2);
          break;
        case "-":
          s.push(o1 - o2);
          break;
        case "*":
          s.push(o1 * o2);
          break;
        case "/":
          s.push(o1 / o2);
          break;
        default:
          s.push(o1);
          break;
      }
    }
    if (s[0] < 0) return `Number can't be negative`;
  }

  return isNaN(s[0]) ? "Invalid input" : s[0];
};

export const infixToPostfix = (input: string) => {
  const precedences = ["-", "+", "*", "/"];
  const infix = input.split(" ");

  const opsStack: string[] = [];
  const postfix: string[] = [];

  for (const token of infix) {
    if (!isNaN(+token)) {
      postfix.push(token);
      continue;
    }
    const topOfStack = opsStack[opsStack.length - 1];
    if (!opsStack.length || topOfStack === "(") {
      opsStack.push(token);
      continue;
    }
    if (token === "(") {
      opsStack.push(token);
      continue;
    }
    if (token === ")") {
      while (opsStack.length) {
        const op = opsStack.pop();
        if (!op || op === "(") break;
        postfix.push(op);
      }
      continue;
    }
    let prevPrecedence = precedences.indexOf(topOfStack);
    const currPrecedence = precedences.indexOf(token);
    while (currPrecedence < prevPrecedence) {
      const op = opsStack.pop();
      if (!op) break;
      postfix.push(op);
      prevPrecedence = precedences.indexOf(opsStack[opsStack.length - 1]);
    }
    opsStack.push(token);
  }
  while (opsStack.length) {
    const op = opsStack.pop();
    if (!op || op === "(") break;
    postfix.push(op);
  }

  return postfix;
};
