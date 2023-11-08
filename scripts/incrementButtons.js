// Функция, которая будет вызываться при клике на кнопки
function incrementProduct(isIncrement, id) {
  let data = JSON.parse(localStorage.getItem("data"));
  let item = data.find((x) => x.id === id);
  if (isIncrement) {
    item.quantity += 1;
  } else if (isIncrement == false && item.quantity > 0) {
    item.quantity -= 1;
  }
  document.getElementById(`count_${id}`).textContent = `${item.quantity}`;

  var shop = document.getElementById("btn-shop");
  shop.addEventListener("click", function () {
    document.getElementById(`count_${id}`).textContent = `${item.quantity}`;
  });

  updateLocalStorage(data, item);
}
//обновление в localstorage
function updateLocalStorage(items, item) {
  localStorage.setItem("data", JSON.stringify(items));

  let buckets = JSON.parse(localStorage.getItem("buckets"));
  console.log(buckets);
  if (buckets.length > 0) {
    let result = buckets.find((p) => p.id === item.id);
    if (result != null) {
      result.quantity = item.quantity;
    } else {
      buckets.push(item);
    }

    localStorage.setItem("buckets", JSON.stringify(buckets));
  } else {
    let arr = [item];
    localStorage.setItem("buckets", JSON.stringify(arr));
  }
}
//загрузка выбранных товаров в корзину
function loadItemsInBucket() {
  let result = document.getElementById(`bucket`);
  let totalPrice = document.getElementById(`total_price`);
  let items = JSON.parse(localStorage.getItem("buckets"));
  let price = 0;
  if (items.length > 0) {
    items.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("block");

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;

      const description = document.createElement("div");
      description.classList.add("desc");
      description.innerHTML = `<p>${item.name}</p>
                                  <div class="price">${item.description}</div>
                                  <div class="btn-plus">
                                    <div class="cont">
                                      <img class="plus" src="/assets/images-shop/pus-minus/pluss.png" onclick="incrementProduct(true, ${item.id})" alt="">
                                      <span id="count_${item.id}">${item.quantity}</span>
                                      <img class="minus" src="/assets/images-shop/pus-minus/minus.png" onclick="incrementProduct(false,${item.id})" alt="">
                                    </div>
                                  </div>`;

      // Добавление элементов в контейнер строки
      itemContainer.appendChild(image);
      itemContainer.appendChild(description);
      result.appendChild(itemContainer);
      //формула для расчета стоимости
      totalPrice.innerHTML = `<span class="total-price">${(price += item.price * item.quantity)} Рублей</span>`;
    });
  } else {
    result.innerHTML = "<p>Нету заказов</p>";
  }
}
