const newpostFormHandler = async function(event) {
    event.prevenDefault();

    const title = document.querySelector('input[name="post-title"]');
    const content = document.querySelector('textarea[name="post-body"]');

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            content: content.value,
        }),
        headers: {'Content-Type':'application/json'},
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to login');
    }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit',newpostFormHandler);