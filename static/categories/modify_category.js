function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const dataToUpdate = getData();

    document.getElementById('category_label').value = dataToUpdate.label;

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const error_list = document.getElementById('error_list');
        error_list.innerHTML = null;

        var label = document.getElementById('category_label').value;

        if(!validateForm(error_list, label)){
            resetForm(dataToUpdate);
        }else{

            const data = {
                label: label
            };

            fetch('http://127.0.0.1:8000/api/categories/' + dataToUpdate.id, {
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
                            window.location.href = 'http://127.0.0.1:8000/categories/categories.html';
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

function validateForm(error_list, label){
    if(label == null || label == undefined || !label.length > 0){
        error_list.innerHTML += `<li>Label required.</li>`;
        return false;
    }else if(label.length > 40){
        error_list.innerHTML += `<li>Label must not be bigger than 40 characters.</li>`;
        return false;
    }else{
        return true;
    }
}

function resetForm(dataToUpdate){
    document.getElementById('category_label').value = dataToUpdate.label;
}