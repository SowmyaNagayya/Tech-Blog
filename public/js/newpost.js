const newpostFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]');
    const content = document.querySelector('textarea[name="post-body"]');
    console.log({
        title: title.value,
        content: content.value,
    })
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            content: content.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        window.location.href = '/dashboard';
    } else {
        alert('Failed to login');
    }
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newpostFormHandler);