// This function is used to take the user to the edit page for a post
const editButtonHandler = async (event) => {
    if (event.target.classList.contains('btn-edit')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            document.location.replace('/posts/edit');
        } else {
            console.log('Failed to get post');
        }
    }
};

// This function is used to delete a post on a post page
const delButtonHandler = async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

// Attach event listener to delete button on the post page
document.querySelectorAll('.btn-delete').forEach((button) => {
    button.addEventListener('click', delButtonHandler);
});

// Attach event listner to edit button on the post page
document.querySelectorAll('.btn-edit').forEach((button) => {
    button.addEventListener('click', editButtonHandler);
});
