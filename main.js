let list = document.querySelector('.list');
let elList = document.querySelector('.savedList');
let box = document.querySelector('.box');
let backBtn = document.querySelector('.backBtn');
let elSelectName = document.querySelector('.select-js');
let elSelectYear = document.querySelector('.selectyear-js');
let elSelectPage = document.querySelector('.selectpage-js');
let elSelectLanguage = document.querySelector('.selectlanguage-js');
let elBtn = document.querySelector('.js-mode')

const savedBooks = [];

// ------ FIRST-LIST ------  

function dom(array, lists) {
    lists.innerHTML = "";
    array.forEach(el => {

        // --------------- CREATING ---------------

        let item = document.createElement('li');
        let h1 = document.createElement('h1');
        let pageSpan = document.createElement('span');
        let idSpan = document.createElement('id');
        let bookmarkBtn = document.createElement('button');
        let modalBtn = document.createElement('button');


        // IMG 

        let img = document.createElement("img");
        img.src = `./books/${el.imageLink}`;
        img.style.width = "100%";
        item.appendChild(img)


        // --------------- ATRIBUTES ---------------

        idSpan.classList.add('idSpan');
        h1.classList.add("name");
        bookmarkBtn.classList.add('bookmark-btn')
        modalBtn.classList.add('modal-btn');
        h1.classList.add('h2');
        item.classList.add('li');

        // --------------- TEXTS ---------------

        h1.textContent = el.author;
        // pageSpan.textContent = `Pages ${el.pages} `;
        bookmarkBtn.textContent = "Save";
        modalBtn.textContent = "Modal";

        // --------------- APPENDING ---------------

        bookmarkBtn.dataset.bookId = el.id;
        modalBtn.dataset.bookId = el.id;

        item.appendChild(h1);
        item.appendChild(pageSpan);
        item.appendChild(bookmarkBtn)
        item.appendChild(modalBtn)
        lists.appendChild(item);
    })
}

// ------ SECOND-LIST ------ 

const doming = (array2, node) => {
    node.innerHTML = '';
    array2.forEach(element => {
        let newItem = document.createElement('li');
        let h2 = document.createElement('h2');
        let delBtn = document.createElement('button');

        h2.textContent = element.author;
        newItem.appendChild(h2);
        h2.classList.add('res-title');
        delBtn.textContent = "X";
        delBtn.classList.add('delete')
        delBtn.dataset.deleteId = element.id;
        newItem.classList.add('res-item');
        newItem.style.display = "flex";
        newItem.style.gap = "20px";

        newItem.appendChild(delBtn);
        node.appendChild(newItem);
    })
}

// ------ THIRd-LIST ------ 

// const modalFunc = (array3, node) => {

//     array3.forEach((el) => {

//     })

// }


dom(JSON.parse(window.localStorage.getItem("list")) || books, list);

// ------ ADDING-ADDVENTLISTENER-FOR-SELECTS ------ 


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


// ------ CREATE-ELEMENT ------  

let setArray = [];

for (i of books) {
    let toArray = i.language;
    setArray.push(toArray)
}

// ------ SET ------  

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

// ------ DARK-MODE ------ 

let theme = false;

elBtn.addEventListener('click', function () {
    theme = !theme;
    window.localStorage.setItem('theme', theme ? 'dark' : 'light');
    changeTheme();
});

// ------ CHANGING THEME ------  

function changeTheme() {
    if (window.localStorage.getItem('theme') == 'dark') {
        document.body.classList.add('darker');
        document.body.classList.remove('light');
    } else {
        document.body.classList.remove('darker');
        document.body.classList.add('light');
    }
}

changeTheme();

// ------ ADDEVENTLISTENT-FOR-LIST ------  

list.addEventListener('click', (evt) => {
    if (evt.target.matches(".bookmark-btn")) {
        let clickedId = evt.target.dataset.bookId;

        let finded = books.find((el) => el.id == clickedId);

        if (!savedBooks.includes(finded)) {
            savedBooks.push(finded);
            doming(savedBooks, elList);
        }
    }
    if (evt.target.matches('.modal-btn')) {
        box.classList.add('open');
        box.innerHTML = "";
        const modalId = evt.target.dataset.bookId;
        const fined = books.find(el => el.id == modalId);
        let boxInner = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        let backBtn = document.createElement('button');
        boxInner.setAttribute('class', "d-flex justify-content-center align-items-center text-center flex-column h-100")
        h3.textContent = fined.author;
        p.textContent = fined.country;
        backBtn.textContent = "X";
        backBtn.classList.add('backBtn');
        boxInner.appendChild(h3);
        boxInner.appendChild(p);
        boxInner.appendChild(backBtn);
        box.appendChild(boxInner)
    }
})

box.addEventListener('click', (evt) => {
    if (evt.target.matches('.backBtn')) {
        box.classList.remove('open');
    }
})

elList.addEventListener("click", (e) => {
    if (e.target.matches(".delete")) {
        let deleteItemId = e.target.dataset.deleteId;
        const spliced = savedBooks.findIndex(el => el.id == deleteItemId);
        savedBooks.splice(spliced, 1);
        doming(savedBooks, elList);
        // console.log(spliced);
    }
})

