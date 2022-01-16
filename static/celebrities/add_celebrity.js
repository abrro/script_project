function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const error_list = document.getElementById('error_list');
        error_list.innerHTML = null;

        var name = document.getElementById('name').value;
        var lastname = document.getElementById('lastname').value

        if(!validateForm(error_list, name, lastname)){
            resetForm();
        }else{

            const data = {
                name: name,
                lastname: lastname
            };

            resetForm();

            fetch('http://127.0.0.1:8000/api/celebrities', {
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

function resetForm(){
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
}