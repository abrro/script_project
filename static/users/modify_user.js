function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const dataToUpdate = getData();

    document.getElementById('name').value = dataToUpdate.name;
    document.getElementById('email').value = decodeURIComponent(dataToUpdate.email);
    document.getElementById('role_select').value = dataToUpdate.role;

    var option = null;
    document.getElementById('role_select').addEventListener('change', (e) => {
        option =  e.target.value;
    })

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var role = document.getElementById('role_select').value;

        if(!validateForm(error_list, name, email, role)){
            resetForm(dataToUpdate);
        }else{
            const data = {
                name: name,
                email: email,
                role: option == null ? dataToUpdate.role : role
            };

            fetch('http://127.0.0.1:8000/api/users/' + dataToUpdate.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    res.json().then(el => {
                        if (res.status == 200) {
                            alert(el.msg);
                            window.location.href = 'http://127.0.0.1:8000/users/users.html';
                        } else {
                            alert(el.msg);
                            resetForm(dataToUpdate);
                        }
                    });
                });
            }
    });
}

function getData(){
    var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    return data;
}

function validateForm(error_list, name, email, role){
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
    if(role == null || role == undefined || !role.length > 0){
        error_list.innerHTML += `<li>Role must be selected.</li>`;
        flag = false;
    }
    
    return flag;
}

function resetForm(dataToUpdate){
    document.getElementById('name').value = dataToUpdate.name;
    document.getElementById('email').value = decodeURIComponent(dataToUpdate.email);
    document.getElementById('role_select').value =dataToUpdate.role;
}