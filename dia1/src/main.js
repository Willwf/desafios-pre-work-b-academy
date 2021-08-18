import "./style.css";

const app = document.querySelector(".app");
app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

const link = document.querySelector(".toggleVisibility");

link.addEventListener("click", () => {
  app.classList.toggle("hidden");
  app.classList.contains("hidden")
    ? (link.innerHTML = "Mostrar Boas Vindas")
    : (link.innerHTML = "Esconder Boas Vindas");
});
