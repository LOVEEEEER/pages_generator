const apiKey = "AIzaSyAplqeRNScV7iAbDfcc2H9KGtzQk03Q9To";
const spreadsheetId = "1FS_cXJ1Etgv6KJ-BcZY-3MFb3i0NdhY_JW5lL1_NVSQ";
const sheetName = "lp_structure";
const keys = [
    "id",
    "link",
    "title",
    "subtitle",
    "bullet1",
    "bullet2",
    "bullet3",
    "icon1",
    "icon2",
    "icon3",
    "review_text1",
    "review_text2",
    "review_text3",
    "name1",
    "name2",
    "name3",
    "button_text",
    "button_link",
];

async function loadSheet() {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:R100?key=${apiKey}`;

    return await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const response = transformData(data.values);
            response.shift();
            return response;
        })
        .catch(error => console.error("Error:", error));
}

function transformData(values) {
    return values.map(valueArray => {
        const object = {};
        keys.forEach((key, index) => {
            object[key] = valueArray[index];
        });
        return object;
    });
}

const id = document.querySelector(".wrapper").dataset.id;

loadSheet().then(data => {
    const item = data.find(el => el.id === id);
    generatePageContent(item);
});

function generatePageContent(item) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="../images/logo.png" type="image/x-icon" />
  <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
      rel="stylesheet"
  />
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <link rel="stylesheet" href="../style.css" />
  <title>
      ${item.title}
  </title>
</head>
  <body>
  <div class="wrapper">
  <header class="header">
      <div class="header__left">
          <img src="../images/left.png" alt="" />
      </div>
      <div class="header__main main-header">
          <div class="main-header__image">
              <img src="../images/logo.png" alt="" />
          </div>
          <div class="main-header__count">4 000 000 +</div>
          <h3 class="main-header__title">Happy users</h3>
      </div>
      <div class="header__right">
          <img src="../images/right.png" alt="" />
      </div>
  </header>
  <main class="page">
    <div class="page__header">
        <h1 class="page__title">
            ${item.title}
        </h1>
        <h4 class="page__subtitile">${item.subtitle}</h4>
    </div>

    <div class="page__achievements achievements">
        <div class="achievements__item">
            <div class="achievements__image">
                <img src="${item.icon1}" alt="" />
            </div>
            <h3 class="achievements__text">
                ${item.bullet1}
            </h3>
        </div>
        <div class="achievements__item">
            <div class="achievements__image">
                <img src="${item.icon2}" alt="" />
            </div>
            <h3 class="achievements__text">
                ${item.bullet2}
            </h3>
        </div>
        <div class="achievements__item">
            <div class="achievements__image">
                <img src="${item.icon3}" alt="" />
            </div>
            <h3 class="achievements__text">
                ${item.bullet3}
            </h3>
        </div>
    </div>

    <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->

            <div class="swiper-slide">
                <div class="slider-item">
                    <div class="slider-item__stats">
                        <img src="../images/stats-star.png" alt="" />
                    </div>
                    <p class="slider-item__text">
                        ${item.review_text1}
                    </p>
                    <div class="slider-item__author">
                        <img src="images/person.png" alt="" />
                        <h3 class="slider-item__creator">
                            ${item.name1}
                        </h3>
                    </div>
                </div>
            </div>

            <div class="swiper-slide">
                <div class="slider-item">
                    <div class="slider-item__stats">
                        <img src="../images/stats-star.png" alt="" />
                    </div>
                    <p class="slider-item__text">
                        ${item.review_text2}
                    </p>
                    <div class="slider-item__author">
                        <img src="images/person.png" alt="" />
                        <h3 class="slider-item__creator">
                        ${item.name2}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="slider-item">
                    <div class="slider-item__stats">
                        <img src="images/stats-star.png" alt="" />
                    </div>
                    <p class="slider-item__text">
                        ${item.review_text3}
                    </p>
                    <div class="slider-item__author">
                        <img src="images/person.png" alt="" />
                        <h3 class="slider-item__creator">
                        ${item.name3}
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- If we need pagination -->
        <div class="slider-pagination swiper-pagination"></div>
    </div>

    <div class="page__links">
        <img src="images/app-store.png" alt="" />
        <img src="images/google-play.png" alt="" />
    </div>

    <div class="page__subscribe subscribe">
        <a href="${item.button_link}" class="subscribe__btn">
            Find out love Compatibility
        </a>
    </div>
  </main>

  <div class="spot spot-1"></div>
  <div class="spot spot-2"></div>
  <div class="spot spot-3"></div>
</div>

<script src="https://apis.google.com/js/api.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="./app.js"></script>
  </body>
  </html>`;
}

const slider = document.querySelector(".swiper");

if (slider) {
    const swiper = new Swiper(".swiper", {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        spaceBetween: 20,

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
