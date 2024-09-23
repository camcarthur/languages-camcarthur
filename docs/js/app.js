// Simulate a database with localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Populate notes list
function displayNotes(filteredNotes = notes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear previous notes

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `<p>${note.text}</p><span class="note-category">${note.category}</span>`;
        notesList.appendChild(noteDiv);
    });
}

// Populate filter options
function populateFilterOptions() {
    const categories = [...new Set(notes.map(note => note.category))];
    const filterCategory = document.getElementById('filterCategory');
    filterCategory.innerHTML = '<option value="">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterCategory.appendChild(option);
    });
}

// Save new note
document.getElementById('noteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('noteText').value;
    const category = document.getElementById('noteCategory').value;

    const newNote = { text, category };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    document.getElementById('noteForm').reset();
    populateFilterOptions();
    displayNotes();
});

// Filter notes by category
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedCategory = document.getElementById('filterCategory').value;

    const filteredNotes = selectedCategory ? notes.filter(note => note.category === selectedCategory) : notes;
    displayNotes(filteredNotes);
});

// Initial setup
populateFilterOptions();
displayNotes();
