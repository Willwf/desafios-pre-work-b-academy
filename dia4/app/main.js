import "./style.css";

const form = document.querySelector('[data-js="carForm"]');
const table = document.querySelector('[data-js="carTableBody"]');
const url = "http://localhost:3333/cars";

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const getElement = getFormElement(event);
  const image = getElement("image");
  const brandModel = getElement("model");
  const year = getElement("year");
  const plate = getElement("plate");
  const color = getElement("color");

  const elements = [image, brandModel, year, plate, color];

  const tr = document.createElement("tr");

  table.appendChild(tr);

  form.reset();
  image.focus();
});

function main() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.textContent = "Nenhum carro encontrado";
        tr.appendChild(td);
        td.setAttribute("colspan", "5");
        td.setAttribute("align", "center");
        table.appendChild(tr);
      }

      data.forEach((car) => {
        const td = document.createElement("td");
        if (car === image) {
          const carImage = document.createElement("img");
          td.appendChild(carImage);
          carImage.style.width = "100px";
          carImage.src = `${car.value}`;
        } else if (car === color) {
          const carColorSquare = document.createElement("div");
          td.appendChild(carColorSquare);
          carColorSquare.style.width = "100px";
          carColorSquare.style.height = "100px";
          carColorSquare.style.backgroundColor = `${car.value}`;
        } else {
          td.textContent = car.value;
        }
        tr.appendChild(td);
      });
    });
}

main();
