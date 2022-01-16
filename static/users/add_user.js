function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const error_list = document.getElementById('error_list');
        error_list.innerHTML = null;

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var role = document.getElementById('role_select').value;

        if(!validateForm(error_list, name, email, password, role)){
            resetForm();
        }else{

            const data = {
                name: name,
                email: email,
                password: password,
                role: role
            };

            resetForm();

            fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(res => {
                res.json().then(el => {
                    if(res.status == 200){
                        alert("Successuflly created.");
                    }else{
                        alert(el.msg);
                    }
                })
            })
        }
    });
}

function validateForm(error_list, name, email, password, role){
    var flag = true;
    if(name == null || name == undefined || !name.length > 0){
        error_list.innerHTML += `<li>Name required.</li>`;
        flag = false;
    }
    if(name.length > 40){
        error_list.innerHTML += `<li>Name must not be bigger than 40 characters.</li>`;
        flag = false;
    }
    if(email == null || email == undefined || !email.length > 0){
        error_list.innerHTML += `<li>Email required.</li>`;
        flag = false;
    }
    if(password == null || password == undefined || !password.length > 0){
        error_list.innerHTML += `<li>Password required.</li>`;
        flag = false;
    }
    if(role == null || role == undefined || !role.length > 0){
        error_list.innerHTML += `<li>Role must be selected.</li>`;
        flag = false;
    }
    
    return flag;
}

function resetForm(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role_select').value = '';
}