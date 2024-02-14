// this function handles the form submission for updating a post on an /edit page
const updatePostHandler = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute('data-id');
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    try {
        const response = await fetch(`/api/posts/update/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Redirect to the updated post page
            document.location.replace(`/posts/${postId}`);
        } else {
            alert('Failed to update post');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update post');
    }
};

// Attach event listener to the edit form for updating a post
document.querySelector('.edit-post-form').addEventListener('submit', updatePostHandler);
