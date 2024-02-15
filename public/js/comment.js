const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('.new-comment-form').getAttribute('data-id');

    if (comment && post_id) {
        // Make sure both comment and post_id are present
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to publish comment');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', commentHandler);
