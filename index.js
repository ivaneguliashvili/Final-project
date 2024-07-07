document.addEventListener("DOMContentLoaded", function () {
  fetch("https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news")
    .then((response) => response.json())
    .then((data) => {
      const newsList = document.getElementById("news-list");
      data.forEach((news) => {
        const dateUpdated = new Date(news.dateUpdated).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        );
        const dateCreated = new Date(news.dateCreated).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        );
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${news.id}</td>
                    <td>${news.title}</td>
                    <td>${news.category}</td>
                    <td>${news.likes}</td>
                    <td>${dateUpdated}</td>
                    <td>${dateCreated}</td>
                    <td>
                        <button onclick="deleteNews(${news.id}, this)">Delete</button>
                        <button onclick="editNews(${news.id})">update</button>
                    </td>
                `;
        newsList.appendChild(row);
      });
    });
});

function deleteNews(id, button) {
  fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      const row = button.parentNode.parentNode;
      row.classList.add("fade-out");
      setTimeout(() => row.remove(), 500);
    }
  });
}

function editNews(id) {
  window.location.href = `edit.html?id=${id}`;
}
