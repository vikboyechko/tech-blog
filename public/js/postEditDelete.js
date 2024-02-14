// this function is used to edit a post on a post page
const editButtonHandler = async (event) => {
    if (event.target.classList.contains('btn-edit')) {
        const id = event.target.getAttribute('data-id');

        // Fetch the post data from the server
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            const postData = await response.json();

            // Redirect the user to the edit page with the post data
            const editUrl = `/edit/${id}`;
            window.location.href = editUrl;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to edit post');
        }
    }
};

document.querySelector('.post-details').addEventListener('click', editButtonHandler);

// This function is used to delete a post on a post page
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
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

document.querySelector('.post-details').addEventListener('click', delButtonHandler);
