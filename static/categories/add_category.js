function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const error_list = document.getElementById('error_list');
        error_list.innerHTML = null;

        var label = document.getElementById('category_label').value;

        if(!validateForm(error_list, label)){
            resetForm();
        }else{
            const data = {
                label: label
            };

            resetForm();

            fetch('http://127.0.0.1:8000/api/categories', {
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

function resetForm(){
    document.getElementById('category_label').value = '';
}