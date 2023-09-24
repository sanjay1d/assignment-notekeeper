const notesGrid = document.getElementById("notesGrid");
const noteModal = document.getElementById("noteModal");
const addNoteBtn = document.getElementById("addNoteBtn");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const noteTitle = document.getElementById("noteTitle");
const noteTagline = document.getElementById("noteTagline");
const noteBody = document.getElementById("noteBody");
const notePinned = document.getElementById("notePinned");
const closeModalBtn = document.getElementById("closeModalBtn");
const pagination = document.getElementById("pagination");

let notes = [];
let currentPage = 1;
const notesPerPage = 6;

function displayNotes() {
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const displayedNotes = notes.slice(startIndex, endIndex);

  notesGrid.innerHTML = "";
  displayedNotes.forEach((note) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";
    noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.tagline}</p>
            <p>${note.body}</p>
            <button class="edit-btn" data-id="${note.id}">edit</button>
            <button class="delete-btn" data-id="${note.id}">Delete</button>
        `;
    notesGrid.appendChild(noteCard);

    // if (!notePinned.checked) {
    //   notesGrid.appendChild(noteCard);
    // } else {
    //   notesGrid.appe
    // }
  });

  updatePagination();
}

function updatePagination() {
  const maxPages = Math.ceil(notes.length / notesPerPage);
  pagination.innerHTML = "";

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", () => {
      currentPage--;
      displayNotes();
    });
    pagination.appendChild(prevButton);
  }

  if (currentPage < maxPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
      currentPage++;
      displayNotes();
    });
    pagination.appendChild(nextButton);
  }
}

function openNoteModal() {
  noteModal.style.display = "block";
  noteTitle.value = "";
  noteTagline.value = "";
  noteBody.value = "";
  notePinned.checked = false;
  document.getElementById("noteId").value = "";
}

function closeNoteModal() {
  noteModal.style.display = "none";
}

addNoteBtn.addEventListener("click", () => {
  openNoteModal();
});

saveNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value;
  const tagline = noteTagline.value;
  const body = noteBody.value;
  const pinned = notePinned.checked;
  const noteId = document.getElementById("noteId").value;

  // if (!title || !tagline || !body) {
  //   alert("Please fill in all fields.");
  //   return;
  // }

  if (!title || !tagline || !body) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields.",
    });
    return;
  }

  const newNote = {
    id: parseInt(noteId) || Date.now(),
    title,
    tagline,
    body,
    pinned,
  };

  if (noteId) {
    // Edit existing note
    const index = notes.findIndex((note) => note.id === parseInt(noteId));
    if (index !== -1) {
      notes[index] = newNote;
    }
  } else {
    // Add new note
    notes.unshift(newNote);
  }

  displayNotes();
  closeNoteModal();
});

closeModalBtn.addEventListener("click", () => {
  closeNoteModal();
});

// notesGrid.addEventListener("click", (event) => {
//   const target = event.target;
//   if (target.classList.contains("edit-btn")) {
//     const noteId = target.getAttribute("data-id");
//     const note = notes.find((note) => note.id === noteId);
//     if (note) {
//       document.getElementById("noteId").value = note.id;
//       noteTitle.value = note.title;
//       noteTagline.value = note.tagline;
//       noteBody.value = note.body;
//       notePinned.checked = note.pinned;
//       openNoteModal();
//     }
//   } else if (target.classList.contains("delete-btn")) {
//     const noteId = target.getAttribute("data-id");
//     const index = notes.findIndex((note) => note.id === noteId);
//     if (index !== -1) {
//       notes.splice(index, 1);
//       displayNotes();
//     }
//   }
// });

notesGrid.addEventListener("click", (event) => {
  const target = event.target;
  const editButton = target.closest(".edit-btn");
  console.log(editButton);
  const deleteButton = target.closest(".delete-btn");

  if (editButton) {
    const noteId = editButton.getAttribute("data-id");
    const note = notes.find((note) => note.id === parseInt(noteId));
    console.log(note);
    if (note) {
      openNoteModal();
      document.getElementById("noteId").value = note.id;
      noteTitle.value = note.title;
      noteTagline.value = note.tagline;
      noteBody.value = note.body;
      notePinned.checked = note.pinned;
    }
  } else if (deleteButton) {
    const noteId = deleteButton.getAttribute("data-id");
    const index = notes.findIndex((note) => note.id === parseInt(noteId));
    if (index !== -1) {
      notes.splice(index, 1);
      displayNotes();
    }
  }
});

// Initial setup: Display notes
displayNotes();
