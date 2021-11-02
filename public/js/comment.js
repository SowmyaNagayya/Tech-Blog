const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#new-comment-text').value.trim();
    const post_id = document.querySelector('#post-id').textContent;
  
    if (comment_text) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  
  document
    .querySelector('.comment-submit-form')
    .addEventListener('submit', newCommentHandler);