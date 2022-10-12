let list = document.querySelector('.list');
let elSelectName = document.querySelector('.select-js');
let elSelectYear = document.querySelector('.selectyear-js');
let elSelectPage = document.querySelector('.selectpage-js');
let elSelectLanguage = document.querySelector('.selectlanguage-js');


function dom(el, lists) {
    lists.innerHTML = "";
    el.forEach(el => {

        // --------------- CREATING ---------------

        let item = document.createElement('li');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let language = document.createElement('span');
        let pageSpan = document.createElement('span');
        let spanTitle = document.createElement('span');
        let idSpan = document.createElement('id');
        let bookmarked = document.createElement('span');

        // --------------- ATRIBUTES ---------------

        bookmarked.classList.add('trueSpan');
        idSpan.classList.add('idSpan');
        h1.classList.add("name")

        // IMG 

        let img = document.createElement("img");
        img.src = `./books/${el.imageLink}`;
        img.style.width = "100%";
        item.appendChild(img)

        // IMG 


        // --------------- TEXTS ---------------


        h1.textContent = el.author;
        p.textContent = `Country - ${el.country}`;
        language.textContent = `Language ${el.language}`;
        spanTitle.textContent = `Title -  ${el.title}`;
        idSpan.textContent = `Year ${el.year} `;
        bookmarked.textContent = el.bookmarked;
        pageSpan.textContent = `Pages ${el.pages} `;

        // --------------- APPENDING ---------------

        item.appendChild(h1);
        item.appendChild(p);
        item.appendChild(language);
        item.appendChild(spanTitle);
        item.appendChild(idSpan);
        item.appendChild(bookmarked);
        item.appendChild(pageSpan);
        lists.appendChild(item);
    })
}

dom(JSON.parse(window.localStorage.getItem("list")) || books, list);

var localName = JSON.parse(window.localStorage.getItem('list'));

elSelectName.addEventListener('change', function (e) {
    e.preventDefault();

    let selectArrayName = localName || [];
    dom(selectArrayName, list);
    let selectValName = elSelectName.value;
    list.innerHTML = '';

    if (selectValName == "A") {
        selectArrayName = books.sort((a, b) => a.author.charCodeAt(0) - b.author.charCodeAt(0));
    }
    if (selectValName == "Z") {
        selectArrayName = books.sort((a, b) => b.author.charCodeAt(0) - a.author.charCodeAt(0));
    }

    window.localStorage.setItem('list', JSON.stringify(selectArrayName));
    dom(selectArrayName, list);
})


elSelectYear.addEventListener('change', function (e) {
    e.preventDefault();

    let selectYearVal = elSelectYear.value;
    let selectArrayYear = [];

    list.innerHTML = '';

    if (selectYearVal == "1750") {
        selectArrayYear = books.sort((a, b) => a.year - b.year);
    }
    if (selectYearVal == "2021") {
        selectArrayYear = books.sort((a, b) => b.year - a.year);
    }

    window.localStorage.setItem('list', JSON.stringify(selectArrayYear));
    dom(selectArrayYear, list);
});


elSelectPage.addEventListener('change', function (e) {
    e.preventDefault();

    let selectPageVal = elSelectPage.value;
    let selectArrayPage = [];

    list.innerHTML = '';

    if (selectPageVal == "1") {
        selectArrayPage = books.sort((a, b) => a.pages - b.pages);
    }
    if (selectPageVal == "2500") {
        selectArrayPage = books.sort((a, b) => b.pages - a.pages);
    }

    window.localStorage.setItem('list', JSON.stringify(selectArrayPage));
    dom(selectArrayPage, list);
});

let setArray = [];

for (i of books) {
    let toArray = i.language;
    setArray.push(toArray)
}

const set = new Set(setArray)

set.forEach(function (value) {
    let optiton = document.createElement("option");
    optiton.textContent = value;
    elSelectLanguage.appendChild(optiton);
});

elSelectLanguage.addEventListener('change', function (e) {
    e.preventDefault();

    let langArray = [];
    let selectValLang = elSelectLanguage.value;

    list.innerHTML = '';

    books.forEach(el => {
        if (selectValLang == 'All') {
            dom(books, list);
        }
        if (el.language.includes(selectValLang)) {
            langArray.push(el);
        }
    })
    window.localStorage.setItem('list', JSON.stringify(langArray));
    dom(langArray, list);
})


