import "./style.css";

const form = document.querySelector('[data-js="carForm"]');
const table = document.querySelector('[data-js="carTableBody"]');
const url = "http://localhost:3333/cars";

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const getElement = getFormElement(event);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("model").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      ({ error: true, message: err.message });
    });

  form.reset();
  image.focus();

  if (result.error) {
    console.log("Erro ao cadastrar:", result.message);
    return;
  }

  console.log(result);

  createTableRow(data);
});

function createTableRow(data) {
  if (table.querySelector(".noCars")) {
    table.innerHTML = "";
  }

  const carElements = [
    { type: "image", value: { src: data.image, alt: data.brandModel } },
    { type: "string", value: data.brandModel },
    { type: "string", value: data.year },
    { type: "string", value: data.plate },
    { type: "color", value: data.color },
    { type: "delete", value: data.plate },
  ];

  const tr = document.createElement("tr");

  carElements.forEach((car) => {
    const td = document.createElement("td");
    if (car.type === "image") {
      const carImage = document.createElement("img");
      td.appendChild(carImage);
      carImage.style.width = "100px";
      carImage.src = `${car.value.src}`;
      carImage.alt = `${car.value.alt}`;
    } else if (car.type === "color") {
      const carColorSquare = document.createElement("div");
      td.appendChild(carColorSquare);
      carColorSquare.style.width = "100px";
      carColorSquare.style.height = "100px";
      carColorSquare.style.backgroundColor = `${car.value}`;
    } else if (car.type === "delete") {
      const delButton = document.createElement("button");
      td.appendChild(delButton);
      delButton.textContent = "Excluir";
      tr.dataset.plate = car.value;
      delButton.dataset.plate = car.value;
      delButton.addEventListener("click", deleteRow);
    } else {
      td.textContent = car.value;
    }
    tr.appendChild(td);
  });

  table.appendChild(tr);
}

async function deleteRow(event) {
  const button = event.target;
  const plate = button.dataset.plate;
  const carRow = document.querySelector(`[data-plate="${plate}"]`);

  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plate }),
  });

  if (result.error) {
    console.log("Erro ao excluir:", result.message);
    return;
  }

  carRow.parentNode.removeChild(carRow);
  button.removeEventListener("click", deleteRow);

  const trs = table.querySelector("tr");
  if (!trs) {
    noCarRow();
  }
}

function noCarRow() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const thsLength = document.querySelectorAll("table th").length;

  td.textContent = "Nenhum carro encontrado";
  tr.appendChild(td);
  td.setAttribute("colspan", thsLength);
  td.setAttribute("align", "center");
  td.classList.add("noCars");
  table.appendChild(tr);
}

function main() {
  fetch(url)
    .then((res) => res.json())
    .then((carArray) => {
      if (carArray.length === 0) {
        noCarRow();
        return;
      }

      carArray.forEach((car) => createTableRow(car));
    })
    .catch((err) => {
      ({ error: true, message: err.message });
    });
}

main();
