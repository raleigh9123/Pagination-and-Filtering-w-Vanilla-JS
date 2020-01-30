/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Global variables used by the program

const page = document.querySelector('div.page');
const studentUl = document.querySelector('.student-list');
const studentList = studentUl.children;
let generatedStudents = [];
const pageHeader = document.querySelector('.page-header');
const header = document.querySelector('h2');
const pageListItems = 10;

/** * Create the `appendSearch` function.
Creates input and button to allow users to search students by name and return search results on page.
** */
const appendSearch = () => {
    const div = document.createElement('div');
    div.className = 'student-search';

    const input = document.createElement('input');
    input.placeholder = 'Search for students...';
    div.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Search';
    div.appendChild(button);

    pageHeader.insertBefore(div, header.nextElementSibling);
};
appendSearch();

/** * Create the `ShowPage` function 
Hides all of the items in the list except up to ten matching results.
`page` parameter is the # of the page (of 10 results) while the `loadList parameter takes all students from `studentList` or input generated list from `generatedStudents` array.
** */
const showPage = (page, loadList) => {
    const startIndex = page * pageListItems - pageListItems;
    const endIndex = page * pageListItems;

    // Hides all list items
    for (i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }

    // Displays no more than 10 students on page# per parameter `loadList`
    for (i = startIndex; i < endIndex; i++) {
        if (loadList[i]) {
            loadList[i].style.display = 'block';
        }
    }
};
// Load initial page view.
showPage(1, studentList);

/** * Create the `appendPageLinks function` 
Creates and appends pagination links depending on the number of items in total, or the number of items in the user generated `generatedStudents` array.
** */
const div = document.createElement('div');
div.className = 'pagination';

const appendPageLinks = (list, searchGenerated) => {
    const ul = document.createElement('ul');
    div.appendChild(ul);
    let numberOfPages = Math.ceil(list) / 10;
    for (i = 0; i < numberOfPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i + 1;
        li.appendChild(a);
        ul.appendChild(li);
    }
    page.insertBefore(div, studentList.nextElementSibling);

    // If search is user generated, add `userGenerated` class to the pagination items
    if (searchGenerated) {
        div.classList.add('userGenerated');
    }

    let firstListItem = document.querySelector('.pagination a');
    if (firstListItem) {
        firstListItem.className = 'active';
    }
};
appendPageLinks(studentList.length, false);

/** * Create the `showSearch` and `generateSearch` functions
to dynamically load user search 
*/

const generateSearch = input => {
    // Remove error message if present.
    let error = document.querySelector('.error');
    if (input && error) {
        error.parentNode.removeChild(error);
    }
    // Reset array on user input
    generatedStudents = [];
    // Capture user input, compare to each student's name. If match, push to array
    for (i = 0; i < studentList.length; i++) {
        let studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.textContent;
        let student = studentList[i];
        if (studentName.includes(input)) {
            generatedStudents.push(student);
        }
    }
    // If array is empty, provide error message
    if (generatedStudents.length === 0) {
        for (i = 0; i < studentList.length; i++) {
            studentList[i].style.display = 'none';
        }
        const errorMessage = () => {
            const div = document.createElement('div');
            div.className = 'error';
            const h2 = document.createElement('h2');
            const error = 'No matching search results';
            h2.textContent = error;
            div.appendChild(h2);
            if (!document.querySelector('.error')) {
                page.insertBefore(div, studentList.nextElementSibling);
            }
        };
        errorMessage();
    }

    // Create new pagination links on user input
    let paginationUl = document.querySelector('.pagination ul');
    let removePageLinks = () => {
        paginationUl.parentNode.removeChild(paginationUl);
    };
    removePageLinks();
    appendPageLinks(generatedStudents.length, true);

    // If input is empty, show the default page from `studentList`, otherwise, show the first page of user generated students from `generatedStudents`
    if (!input) {
        showPage(1, studentList);
        let paginationDiv = document.querySelector('.pagination');
        paginationDiv.classList.remove('userGenerated');
    } else {
        showPage(1, generatedStudents);
    }
};

// Search Bar Event Handler. Add a 'click' event listener to the button and a 'keyup' listener to the input. Run function generateSearch() with the userinput as parameter
const search = document.querySelector('.student-search');
search.addEventListener('keyup', event => {
    const input = document.querySelector('input');
    let userInput = input.value;
    if (event.target.tagName === 'INPUT') {
        generateSearch(userInput);
    }
});
search.addEventListener('click', event => {
    const input = document.querySelector('input');
    let userInput = input.value;
    if (event.target.tagName === 'BUTTON') {
        generateSearch(userInput);
    }
});

// Pagination Event Handler. On click, prevent default link behavior. If pagination contains class 'userGenerated', show page numbers for user generated list `generatedStudents`, otherwise, show default pagination for all list items.
const pagination = document.querySelector('.pagination');
pagination.addEventListener('click', event => {
    const links = document.querySelectorAll('.pagination a');
    event.preventDefault();
    if (
        event.target.tagName === 'A' &&
        !event.target.parentNode.parentNode.parentNode.classList.contains('userGenerated')
    ) {
        for (i = 0; i < links.length; i++) {
            links[i].className = '';
        }
        event.target.className = 'active';
        const pageNumber = event.target.textContent;
        showPage(pageNumber, studentList);
    } else if (
        event.target.tagName === 'A' &&
        event.target.parentNode.parentNode.parentNode.classList.contains('userGenerated')
    ) {
        for (i = 0; i < links.length; i++) {
            links[i].className = '';
        }
        event.target.className = 'active';
        const pageNumber = event.target.textContent;
        showPage(pageNumber, generatedStudents);
    }
});
