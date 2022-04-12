add = document.getElementById("addItems");
add.addEventListener("click",() => {
    console.log("Updating");

    // local storage
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;


    if(localStorage.getItem('jsonItem') == null)
    {
        itemsJsonArray = [];
        itemsJsonArray.push([tit,desc]);
        localStorage.setItem('jsonItem',JSON.stringify(itemsJsonArray));
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('jsonItem');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit,desc]);
        localStorage.setItem('jsonItem',JSON.stringify(itemsJsonArray));
    }


    //Adding elements in the table
    let tableBody = document.getElementById('tableBody');
    let str = ""
    itemsJsonArray.forEach((element,index)=>
    {
        str += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary">Delete</button></td>
    </tr>`;
    });
    tableBody.innerHTML = str;
});

// Delete button

