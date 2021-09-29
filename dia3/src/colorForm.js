const nameInput = document.querySelector('[data-js="name"]');

const dontChange = ["de", "da", "das", "do", "dos"];

nameInput.addEventListener("input", (event) => {
  const names = event.target.value.split(" ");
  event.target.value = names
    .map((name) => {
      if (name === "") {
        return;
      }
      if (dontChange.includes(name.toLowerCase())) {
        return name.toLowerCase();
      } else {
        return name[0].toUpperCase() + name.substring(1);
      }
    })
    .join(" ");
});

const colorForm = document.querySelector("#colorForm");
const colorDiv = document.querySelector("#colorDiv");

const colorLabel = document.createElement("label");
colorForm.appendChild(colorLabel);
colorLabel.setAttribute("for", "color-select");
colorLabel.textContent = "Selecione uma ou várias cores";

const colorSelector = document.createElement("select");
colorForm.appendChild(colorSelector);
colorSelector.setAttribute("id", "color-select");
colorSelector.setAttribute("name", "colors");
colorSelector.setAttribute("Multiple", "");

const colors = ["red", "green", "yellow", "blue", "orange"];
colors.map((color) => {
  const colorOption = document.createElement("option");
  colorSelector.appendChild(colorOption);
  colorOption.textContent = color;
  colorOption.value = color;
});

const colorsContainer = document.createElement("div");
colorsContainer.classList.add("colorsContainer");
colorDiv.appendChild(colorsContainer);

colorSelector.addEventListener("input", (event) => {
  colorsContainer.innerHTML = "";

  const selectedColors = [...event.target.selectedOptions].map(
    (color) => color.value
  );

  selectedColors.map((color) => {
    const colorDivSquare = document.createElement("div");
    colorsContainer.appendChild(colorDivSquare);
    colorDivSquare.style.width = "100px";
    colorDivSquare.style.height = "100px";
    colorDivSquare.style.backgroundColor = `${color}`;
  });
});
