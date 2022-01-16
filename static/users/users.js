function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('users_tbody');

            data.forEach(el => {
                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                td1.innerText = el.id;

                var td2 = document.createElement('td');
                td2.innerText = el.name;

                var td3 = document.createElement('td');
                td3.innerText = el.email;

                var td4 = document.createElement('td');
                td4.innerText = el.role;

                var btnContainer = document.createElement('div');
                btnContainer.className = 'container';

                var editButton = document.createElement('button');
                editButton.type = 'button';
                editButton.className = 'btn btn-primary';
                editButton.id = 'editButton' + el.id;
                editButton.innerText = 'Edit';

                var deleteButton = document.createElement('button');
                deleteButton.type = 'submit';
                deleteButton.className = 'btn btn-primary';
                deleteButton.id = 'deleteButton' + el.id;
                deleteButton.innerText = 'Delete';

                editButton.addEventListener('click', function() {
                    url = 'http://127.0.0.1:8000/users/modify_user.html?id=' 
                    + encodeURIComponent(el.id) + 
                    '&name=' + encodeURIComponent(el.name) +
                    '&email=' + encodeURIComponent(el.email) + 
                    '&role=' + encodeURIComponent(el.role);
                    document.location.href = url;
                })

                deleteButton.addEventListener('click', function() {
                    fetch('http://127.0.0.1:8000/api/users/' + el.id, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }}).then(res => {
                                res.json().then(data => {
                                    if(res.status == 200){
                                        alert(data.msg);
                                        window.location.reload();
                                    }else{
                                        alert(data.msg);
                                    }
                                })
                            });
                })

                btnContainer.appendChild(editButton);
                btnContainer.appendChild(deleteButton);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(btnContainer);
                

                tbody.appendChild(tr);
            });
        });
}