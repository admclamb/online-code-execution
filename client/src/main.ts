const codeElement = document.querySelector(".code");

const submitCodeButton = document.querySelector(".button");

const submitCode = (e: Event) => {
  e.preventDefault();
};

submitCodeButton?.addEventListener("click", submitCode);
