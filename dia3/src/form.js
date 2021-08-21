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

  console.log(names);
});
