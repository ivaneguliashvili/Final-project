document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("newsForm");
    const saveButton = document.getElementById("saveButton");
    const updateButton = document.getElementById("updateButton");
    const queryParams = new URLSearchParams(window.location.search);
    const newsId = queryParams.get('id');

    if (newsId) {
        document.getElementById("formTitle").innerText = "Edit News";
        saveButton.style.display = "none";
        updateButton.style.display = "inline-block";

        fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`)
            .then(response => response.json())
            .then(news => {
                document.getElementById("newsId").value = news.id;
                document.getElementById("title").value = news.title;
                document.getElementById("description").value = news.description;
                document.getElementById("category").value = news.category;
                document.getElementById("editorFirstName").value = news.editorFirstName;
                document.getElementById("editorLastName").value = news.editorLastName;
            });
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const id = document.getElementById("newsId").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const editorFirstName = document.getElementById("editorFirstName").value;
        const editorLastName = document.getElementById("editorLastName").value;

        const newsData = { title, description, category, editorFirstName, editorLastName };
        let url = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news";
        let method = 'POST';

        if (id) {
            url = `https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        })
        .then(response => response.json())
        .then(() => {
            window.location.href = "index.html";
        });
    });
});
