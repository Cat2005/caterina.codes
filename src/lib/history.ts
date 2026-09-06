const key = "nav-stack";

const read = (): string[] => {
  try {
    return JSON.parse(sessionStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
};

const write = (stack: string[]) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(stack));
  } catch {}
};

export function recordVisit(path: string) {
  const stack = read();
  if (stack[stack.length - 1] === path) return;
  if (stack[stack.length - 2] === path) stack.pop();
  else stack.push(path);
  write(stack);
}

export const hasPrevious = () => read().length > 1;
