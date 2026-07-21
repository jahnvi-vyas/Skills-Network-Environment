// Create XMLHttpRequest
var xhr = new XMLHttpRequest();

// JSON file path
var url = "./health_article.json";

// Open request
xhr.open("GET", url, true);

// Response type
xhr.responseType = "json";

// When request is successful
xhr.onload = function () {
    if (xhr.status === 200) {

        var articles = xhr.response.articles;
        var articlesDiv = document.getElementById("articles");

        articles.forEach(function (article) {

            var articleDiv = document.createElement("div");
            articleDiv.classList.add("article");

            // Title
            var title = document.createElement("h2");
            title.textContent = article.title;

            // Description
            var description = document.createElement("p");
            description.textContent = article.description;

            // Ways Header
            var waysHeader = document.createElement("h3");
            waysHeader.textContent = "Ways to Achieve";

            // Ways List
            var waysList = document.createElement("ul");

            article.ways_to_achieve.forEach(function (way) {
                var li = document.createElement("li");
                li.textContent = way;
                waysList.appendChild(li);
            });

            // Benefits Header
            var benefitsHeader = document.createElement("h3");
            benefitsHeader.textContent = "Benefits";

            // Benefits List
            var benefitsList = document.createElement("ul");

            article.benefits.forEach(function (benefit) {
                var li = document.createElement("li");
                li.textContent = benefit;
                benefitsList.appendChild(li);
            });

            // Append everything
            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(waysHeader);
            articleDiv.appendChild(waysList);
            articleDiv.appendChild(benefitsHeader);
            articleDiv.appendChild(benefitsList);

            articlesDiv.appendChild(articleDiv);
        });

    } else {
        console.error("Failed to load JSON file.");
    }
};

// Send request
xhr.send();