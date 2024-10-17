// public/js/script.js

// Confirmation before deleting a note
document.addEventListener('DOMContentLoaded', function () {
    const deleteForms = document.querySelectorAll('.delete-note-form');

    deleteForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const confirmed = confirm('Are you sure you want to delete this note?');
            if (confirmed) {
                form.submit();
            }
        });
    });
});
