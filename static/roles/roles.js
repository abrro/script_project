function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/roles', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('roles_tbody');

            data.forEach(el => {
                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                td1.innerText = el.id;

                var td2 = document.createElement('td');
                td2.innerText = el.role;

                // var btnContainer = document.createElement('div');
                // btnContainer.className = 'container';

                // var editButton = document.createElement('button');
                // editButton.type = 'button';
                // editButton.className = 'btn btn-primary';
                // editButton.id = 'editButton' + el.id;
                // editButton.innerText = 'Edit';

                // var deleteButton = document.createElement('button');
                // deleteButton.type = 'submit';
                // deleteButton.className = 'btn btn-primary';
                // deleteButton.id = 'deleteButton' + el.id;
                // deleteButton.innerText = 'Delete';
                // deleteButton.addEventListener('click', function() {
                //     console.log(el.id);
                // })

                // btnContainer.appendChild(editButton);
                // btnContainer.appendChild(deleteButton);
                tr.appendChild(td1);
                tr.appendChild(td2);
                // tr.appendChild(btnContainer);
                

                tbody.appendChild(tr);
            });
        });
}