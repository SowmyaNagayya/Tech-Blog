const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
   window.location.href='/dashboard';
  } else {
    alert('Failed to login');
  }
};

/*const loginFormHandler = async function(event) {
  //event.prevenDefault();
  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');
  const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
          username: usernameEl.value,
          password: passwordEl.value,
      }),
      headers: {'Content-Type':'application/json'},
  });
  if(response.ok) {
      document.location.redirect('/dashboard');
  } else {
      alert('Failed to login');
  }
};*/

document
.querySelector('#login-form')
.addEventListener('submit',loginFormHandler);