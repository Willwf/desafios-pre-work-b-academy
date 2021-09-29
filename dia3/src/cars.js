const form = document.querySelector('[data-js="carForm"]');
const table = document.querySelector('[data-js="carTableBody"]');

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const getElement = getFormElement(event);
  const image = getElement("image");
  const model = getElement("model");
  const year = getElement("year");
  const plate = getElement("plate");
  const color = getElement("color");

  const elements = [image, model, year, plate, color];

  const tr = document.createElement("tr");

  elements.forEach((element) => {
    const td = document.createElement("td");
    if (element === image) {
      const carImage = document.createElement("img");
      td.appendChild(carImage);
      carImage.style.width = "100px";
      carImage.src = `${element.value}`;
    } else if (element === color) {
      const carColorSquare = document.createElement("div");
      td.appendChild(carColorSquare);
      carColorSquare.style.width = "100px";
      carColorSquare.style.height = "100px";
      carColorSquare.style.backgroundColor = `${element.value}`;
    } else {
      td.textContent = element.value;
    }
    tr.appendChild(td);
  });

  table.appendChild(tr);

  form.reset();
  image.focus();
});
