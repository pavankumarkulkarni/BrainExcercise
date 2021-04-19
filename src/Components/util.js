function wait(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const colors = ["green", "blue", "red", "purple"];

export { wait, colors };
