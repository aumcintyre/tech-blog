async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        const login = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application.json' }
        })
        if (login.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(login.statusText);
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);