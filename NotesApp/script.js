const addBox = document.querySelector(".add-box");
popupBox = document.querySelector(".popup-box"),
popupBoxTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textArea"),
addBtn = popupBox.querySelector(".addBtn");

months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

// function to display notes
function showNotes(){
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note,index) =>{
        let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description} .</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="setting">
                <i onClick = "showMenu(this)" class="fa a-regular fa-gear"></i>
                <ul class="menu">
                    <li onClick = "updateNote(${index},'${note.title}','${note.description}')"><i class="fa fa-thin fa-pen"></i>
                        Edit
                    </li>
                    <li onClick="deleteNote(${index})" >
                        <i class="fa fa-thin fa-trash"></i>
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    </li>`
    addBox.insertAdjacentHTML("afterend" , liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener('click',e=>{
        if(e.target.tagName != 'I' || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })
}
 

function deleteNote(noteId){
    let confirmDelete = confirm("Are you sure you want to delet it?");
    if(!confirmDelete) return;
    notes.splice(noteId,1);
    // updating local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

function updateNote(noteId,title,desc){
    isUpdate = true;
    updateId = noteId;
    console.log(noteId,title ,desc);
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupBoxTitle.innerText = "Add a new Note";

    
}


closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
  titleTag.value = "";
  descTag.value = "";
});

addBtn.addEventListener("click", e => {
  e.preventDefault();
  let noteTile = titleTag.value,
    noteDesc = descTag.value;

  if (noteTile || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTile,
      description: noteDesc,
      date: `${month} ${day},${year}`,
    };

    if(!isUpdate){
        notes.push(noteInfo);
    }
    else{
        isUpdate = false;
        notes[updateId] = noteInfo;
    }

    //   Adding new notes to notes

    //   adding notes in local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    // closing add new notes page
    showNotes();
    closeIcon.click();
  }
});


