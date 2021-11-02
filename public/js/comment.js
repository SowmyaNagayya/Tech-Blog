const commentFormHandler = async function(event) {

    alert("comments");
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {

        await fetch(`/api/comment/${postId}`, {
            method: 'POST',
            data: `${postId}`,
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          document.location.replace('/');
        };
    //   await fetch(`/api/comment/${postId}`, {
    //     method: 'POST',
    //     //data: `${postId}`,
    //     body: JSON.stringify({
    //       postId,
    //       body
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
  
    //   document.location.reload();
   // }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
  