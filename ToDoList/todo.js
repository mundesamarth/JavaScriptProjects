add = document.getElementById("addItems");

function getAndUpdate() {
  // local storage
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;

  if (localStorage.getItem("jsonItem") == null) {
    itemsJsonArray = [];
    itemsJsonArray.push([tit, desc]);
    localStorage.setItem("jsonItem", JSON.stringify(itemsJsonArray));
  } else {
    itemsJsonArrayStr = localStorage.getItem("jsonItem");
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    itemsJsonArray.push([tit, desc]);
    localStorage.setItem("jsonItem", JSON.stringify(itemsJsonArray));
  }
  update();
}
function update() {
  if (localStorage.getItem("jsonItem") == null) {
    itemsJsonArray = [];
    localStorage.setItem("jsonItem", JSON.stringify(itemsJsonArray));
  } else {
    itemsJsonArrayStr = localStorage.getItem("jsonItem");
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
  }
  console.log("Updating");
  //Adding elements in the table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemsJsonArray.forEach((element, index) => {
    str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick ="deleted(${index})">Delete</button></td>
    </tr>`;
  });
  tableBody.innerHTML = str;
}
add.addEventListener("click", getAndUpdate);
update();

// Delete button
function deleted(itemIndex) {
  console.log("deleted", itemIndex);
  itemsJsonArrayStr = localStorage.getItem("jsonItem");
  itemsJsonArray = JSON.parse(itemsJsonArrayStr);
  itemsJsonArray.splice(itemIndex, 1);
  localStorage.setItem("jsonItem", JSON.stringify(itemsJsonArray));
  update();
}
function clearStr() {
  localStorage.clear();
  update();
}
