const signupFormHandler = async function(event) {
    event.prevenDefault();

    const usernameEl = document.querySelector('#username-input-signup');
    const passwordEl = document.querySelector('#password-input-signup');

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: {'Content-Type':'application/json'},
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to signup');
    }
};

document
  .querySelector('#sign-up form')
  .addEventListener('submit',signupFormHandler);