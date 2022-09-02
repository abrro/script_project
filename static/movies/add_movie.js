function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const category_select = document.getElementById('category_select');

            data.forEach(el => {
                category_select.innerHTML += `<option value="${el.id}">${el.label}</option>`
            });
        });

        fetch('http://127.0.0.1:8000/api/celebrities', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const celebrity_select = document.getElementById('celebrity_select');

            data.forEach(el => {
                celebrity_select.innerHTML += `<option value="${el.id}">${el.name} ${el.lastname}</option>`
            });
        });

        const celebrity = document.getElementById('celebrity_select');
        const list_stars = document.getElementById('list_stars');
        const list_writers = document.getElementById('list_writers');
        const list_directors = document.getElementById('list_directors');
        const stars = [];
        const writers = [];
        const directors = [];
    
        document.getElementById('button_add_star').addEventListener('click', e => {
            if (!stars.includes(celebrity.value)) {
                list_stars.innerHTML += `<li>${celebrity.options[celebrity.selectedIndex].text}</li>`
                stars.push(celebrity.value);
            }
        });

        document.getElementById('button_add_writer').addEventListener('click', e => {
            if (!writers.includes(celebrity.value)) {
                list_writers.innerHTML += `<li>${celebrity.options[celebrity.selectedIndex].text}</li>`
                writers.push(celebrity.value);
            }
        });

        document.getElementById('button_add_director').addEventListener('click', e => {
            if (!directors.includes(celebrity.value)) {
                list_directors.innerHTML += `<li>${celebrity.options[celebrity.selectedIndex].text}</li>`
                directors.push(celebrity.value);
            }
        });

    document.getElementById('submit_button').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            title: document.getElementById('title').value,
            synopsis: document.getElementById('synopsis').value,
            release_date: document.getElementById('release_date').value,
            categoryId: document.getElementById('category_select').value
        };

        // document.getElementById('title').value = '';
        // document.getElementById('synopsis').value = '';
        // document.getElementById('release_date').value = '';
        // document.getElementById('category_select').value = '';
        // stars.splice(0, stars.length);
        // writers.splice(0, writers.length);
        // directors.splice(0, directors.length);
        // list_stars.innerHTML = null;
        // list_writers.innerHTML = null;
        // list_directors.innerHTML = null;

        fetch('http://127.0.0.1:8000/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(el => {
                if(res.status == 200){
                    const crew = [];
                    stars.forEach(elem => {
                        var obj = {
                            movieId : 0,
                            celebrityId : 0,
                            roleId : 1
                        };
                        obj.movieId = el.id;
                        obj.celebrityId = parseInt(elem);
                        crew.push(obj);
                    });
                    writers.forEach(elem => {
                        var obj = {
                            movieId : 0,
                            celebrityId : 0,
                            roleId : 2
                        };
                        obj.movieId = el.id;
                        obj.celebrityId = parseInt(elem);
                        crew.push(obj);
                    });
                    directors.forEach(elem => {
                        var obj = {
                            movieId : 0,
                            celebrityId : 0,
                            roleId : 3
                        };
                        obj.movieId = el.id;
                        obj.celebrityId = parseInt(elem);
                        crew.push(obj);
                    });
                    console.log(crew);
                    fetch('http://127.0.0.1:8000/api/movies/crew', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(crew)
                    }).then(res => {
                        res.json().then(el => {
                            if(res.status == 200){
                                alert("Successuflly created.");
                            }else{
                                alert(el.msg);
                            }
                        })
                    });
                    //alert("Successuflly created.");
                }else{
                    alert(el.msg);
                }
            })
        });
    });
}