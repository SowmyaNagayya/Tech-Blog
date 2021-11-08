const newCommentHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#new-body').value.trim();
  const post_id =  location.pathname.split("/")[2];
console.log(post_id)
  
    const response = await fetch(`/api/comment/`, {
      method: 'POST',
      body: JSON.stringify({ body, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  
};


document
  .querySelector('.comment-submit-form')
  .addEventListener('submit', newCommentHandler);