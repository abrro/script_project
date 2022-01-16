function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const id = document.location.href.split("?")[1].split("=")[1];

    fetch('http://127.0.0.1:8000/api/movies/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const movie = document.getElementById('movie');
            
            var stars = getCelebrities(data, 0);
            var writers = getCelebrities(data, 1);
            var directors = getCelebrities(data, 2);

            movie.innerHTML += 
                `<h1>
                    Title: ${data.title}
                </h1>
                <h6>
                    Category : ${data.category.label}
                </h6>
                <h6>
                    Released on : ${data.release_date}
                </h6>
                <hr></hr>
                <h3>
                    Synopsis
                </h3>
                <p>
                    ${data.synopsis}
                </p>
                <hr></hr>
                <div>
                    <ul>
                        <li>Directed by : [${directors}]</li>
                        <li>Written by: [${writers}]</li>
                        <li>Starring: [${stars}]</li>
                    </ul>
                </div><hr></hr>`;

            const buttons = 
                `<div>
                    <button type="button" class="btn btn-primary" id="button_edit">Edit</button>
                    <button type="submit" class="btn btn-primary" id="button_delete">Delete</button>   
                </div>`
            movie.innerHTML += buttons;
            document.getElementById('button_delete').addEventListener('click', function() {
                fetch('http://127.0.0.1:8000/api/movies/' + data.id, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }}).then(res => {
                            res.json().then(data => {
                                if(res.status == 200){
                                    alert(data.msg);
                                    window.location.href('http://127.0.0.1:8000/movies/movies.html');
                                }else{
                                    alert(data.msg);
                                }
                            })
                        });
            });

            document.getElementById('button_edit').addEventListener('click', function() {
                url = 'http://127.0.0.1:8000/movies/modify_movie.html?id=' 
                + encodeURIComponent(data.id);
                document.location.href = url;
            });
        });
}

function getCelebrities(data, index){
    var res = '';
    data.roles[index].celebrities.forEach(el =>{
        res += el.name + " " +  el.lastname + ", ";
    })
    return res.slice(0, -2);
}