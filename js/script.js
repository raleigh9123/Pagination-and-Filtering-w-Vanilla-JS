/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//Global variables used by the program

const page = document.querySelector('div.page');
const studentUl = document.querySelector('.student-list');
const studentList = studentUl.children;
const pageHeader = document.querySelector('.page-header');
const header = document.querySelector('h2');
const pageListItems = 10;


/*** Create the `appendSearch` function 
to enable search students by name and return search results on page.
***/
const appendSearch = () => {
   const div = document.createElement('div');
   div.className = 'student-search';
   
   const input = document.createElement('input');
   input.placeholder = "Search for students...";
   div.appendChild(input);
   
   const button = document.createElement('button');
   button.textContent = 'Search';
   div.appendChild(button);

   pageHeader.insertBefore(div,header.nextElementSibling);
}
appendSearch();

/*** Create the `ShowPage` function 
to hide all of the items in the list except for the ten you want to show.
***/

const showPage = (page) => {
   const startIndex = (page * pageListItems) - pageListItems;
   const endIndex = page * pageListItems;
   studentList.length;

   //Hides all list items
   for(i=0; i<studentList.length; i++) {
      studentList[i].style.display = "none";
   };

   //Displays no more than 10 students on page# per parameter
   for(i=startIndex; i<endIndex; i++) {
      if(studentList[i]) {
      studentList[i].style.display = "block";
      }
   };
}

/*** Create the `appendPageLinks function` 
to generate, append, and add functionality to the pagination buttons.
***/
const div = document.createElement('div');
div.className = 'pagination';
const appendPageLinks = (list) => {
   const ul = document.createElement('ul');
   div.appendChild(ul);
   let numberOfPages = Math.ceil(list)/10;
   for (i=0; i<numberOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#"
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
   }
   page.insertBefore(div, studentList.nextElementSibling);

   let firstListItem = document.querySelector('.pagination a');
   firstListItem.className = 'active';
}
appendPageLinks(studentList.length);


/*** Create the `showSearch` and `generateSearch` functions
to dynamically load user search 
*/

const generateSearch = (input) => {
   let studentArrayOfIndexes = [];
   for(i=0; i<studentList.length; i++) {
      let studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.textContent;
      if(studentName.includes(input)) {
         studentArrayOfIndexes.push(i);
      }
   }
   //Hide all students
   for(i=0; i<studentList.length; i++) {
      studentList[i].style.display = "none";
   };
   //Display user Search of Students
   for(i=0; i<studentArrayOfIndexes.length; i++) {
      let index = studentArrayOfIndexes[i];
      studentList[index].style.display="block";
   };
   if(!input) {
      showPage(1);
   }
   
   const removePageLinks = () => {
      let paginationDiv = document.querySelector('.pagination ul');
      paginationDiv.parentNode.removeChild(paginationDiv);
   }
   removePageLinks();
   appendPageLinks(studentArrayOfIndexes.length);
   showPage(1);
}

//Search Bar Event Handler
const search = document.querySelector('.student-search');
search.addEventListener('keyup', (event) => {
   const input = document.querySelector('input');
   let userInput = input.value;
   generateSearch(userInput);
});

//Pagination Event Handler
const pagination = document.querySelector('.pagination');
pagination.addEventListener('click', (event) => {
   const links = document.querySelectorAll('.pagination a');
   event.preventDefault();
   if(event.target.tagName === 'A') {   
      for(i=0; i<links.length; i++) {
      links[i].className = 'testValue';
      }
      event.target.className = 'active';
      const pageNumber = event.target.textContent;
      showPage(pageNumber);
   }
});

//Load initial page view.
showPage(1);