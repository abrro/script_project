function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const dataToUpdate = getData();

    document.getElementById('name').value = dataToUpdate.name;
    document.getElementById('lastname').value = dataToUpdate.lastname;

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const error_list = document.getElementById('error_list');
        error_list.innerHTML = null;

        var name = document.getElementById('name').value;
        var lastname = document.getElementById('lastname').value

        if(!validateForm(error_list, name, lastname)){
            resetForm(dataToUpdate);
        }else{

            const data = {
                name: name,
                lastname: lastname
            };

            fetch('http://127.0.0.1:8000/api/celebrities/' + dataToUpdate.id, {
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
                            window.location.href = 'http://127.0.0.1:8000/celebrities/celebrities.html';
                        } else {
                            alert(el.msg);
                            resetForm();
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

function validateForm(error_list, name, lastname){
    var flag = true;
    if(name == null || name == undefined || !name.length > 0){
        error_list.innerHTML += `<li>Name required.</li>`;
        flag = false;
    }
    if(name.length > 40){
        error_list.innerHTML += `<li>Name must not be bigger than 40 characters.</li>`;
        flag = false;
    }
    if(lastname == null || lastname == undefined || !lastname.length > 0){
        error_list.innerHTML += `<li>Lastname required.</li>`;
        flag = false;
    }
    if(lastname.length > 40){
        error_list.innerHTML += `<li>Lastname must not be bigger than 40 characters.</li>`;
        flag = false;
    }
    return flag;
}

function resetForm(dataToUpdate){
    document.getElementById('name').value = dataToUpdate.name;
    document.getElementById('lastname').value = dataToUpdate.lastname;
}