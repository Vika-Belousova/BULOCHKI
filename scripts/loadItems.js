function getData() {
  fetch("../items.json")
    .then((response) => response.json())
    .then((data) => {
      let result = JSON.stringify(data.items);
      let buckets = JSON.stringify(data.buckets);
      localStorage.setItem("data", result);
      localStorage.setItem("buckets", buckets);
      return data.items;
    })
    .catch((error) => {
      console.error("Ошибка при загрузке JSON: ", error);
    });
}

// Вызов функции обновления при загрузке страницы
document.addEventListener("DOMContentLoaded", getData());

async function loadItems() {
  if (localStorage.getItem("data") == null) {
    // Вызов функции обновления при загрузке страницы
    document.addEventListener("DOMContentLoaded", getData());
  }
  let data = JSON.parse(localStorage.getItem("data"));

  // Обработка JSON-данных
  let rowCounter = 0; // Счетчик строк
  const itemsPerRow = 3; // Количество элементов в строке
  let container = document.querySelector(".block-container");
  let row;

  data.forEach((item) => {
    if (rowCounter % itemsPerRow === 0) {
      row = document.createElement("div");
      row.classList.add("block-container-inner");
      container.appendChild(row);
    }

    // Создание HTML-элементов на основе данных из JSON
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("block");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.id = 'image5'

    const description = document.createElement("div");
    description.classList.add("desc");
    description.innerHTML = `<p>${item.name}</p>
                              <div class="price">${item.description}</div>
                              <div class="btn-plus">
                                <button id="btn-shop">Посмотреть набор</button>
                                <div class="cont">
                                  <img class="plus" src="/assets/images-shop/pus-minus/pluss.png" onclick="incrementProduct(true, ${item.id})" alt="">
                                  <span id="count_${item.id}">${item.quantity}</span>
                                  <img class="minus" src="/assets/images-shop/pus-minus/minus.png" onclick="incrementProduct(false,${item.id})" alt="">
                                </div>
                              </div>`;

    // Добавление элементов в контейнер строки
    itemContainer.appendChild(image);
    itemContainer.appendChild(description);
    row.appendChild(itemContainer);

    rowCounter++;
  });
}

document.addEventListener("DOMContentLoaded", loadItems);
