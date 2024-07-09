const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.className = "delete-img";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    inputBox.focus();

    inputBox.onblur = () => {
        if (inputBox.textContent.trim() === "") {
            inputBox.remove();
        } else {
            ensureDeleteImg(inputBox);
        }
        updateStorage();
    };
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG" && e.target.className === "delete-img") {
        if (confirm("Are you sure you want to delete this note?")) {
            e.target.parentElement.remove();
            updateStorage();
        }
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                ensureDeleteImg(nt);
                updateStorage();
            }
        });
    }
});

function ensureDeleteImg(note) {
    if (!note.querySelector('img.delete-img')) {
        let img = document.createElement("img");
        img.src = "images/delete.png";
        img.className = "delete-img";
        note.appendChild(img);
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    document.querySelectorAll(".input-box").forEach(note => {
        note.setAttribute("contenteditable", "true");
        ensureDeleteImg(note);
    });
}
showNotes();

document.addEventListener("keydown", event => {
    if(event.key == "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})