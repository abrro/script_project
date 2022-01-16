function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/movies', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const movies_list = document.getElementById('movies_list');

            data.forEach(el => {
                var synopsis_summary = el.synopsis.substring(0,50) + '...';

                movies_list.innerHTML += 
                `<div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">
                            ${el.title} (${el.release_date.substring(0,4)})
                        </h5>
                        <h6>
                            ${el.category.label}
                        </h6>
                        <p>
                            ${synopsis_summary}
                        </p>
                        <a href="./movie.html?id=${el.id}" class="card-link">See details</a>
                    </div>
                </div>`

            });
        });
}