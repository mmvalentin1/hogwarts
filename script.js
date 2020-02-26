"use strict"

window.addEventListener("DOMContentLoaded", start);

let allStudents =  [];
// The prototype for all students: 
const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  newName:"",
  nickName:"",
  gender:"",
  houseName: "",
  image: ""
};

function start(){
  console.log("starting")
  loadJSON();
  // filters
  document.querySelector("[data-filter='Gryffindor']").addEventListener("click", filterGry);
  document.querySelector("[data-filter='Slytherin']").addEventListener("click", filterSly);
  document.querySelector("[data-filter='Hufflepuff']").addEventListener("click", filterHuf);
  document.querySelector("[data-filter='Ravenclaw']").addEventListener("click", filterRav);
  document.querySelector("[data-filter='*']").addEventListener("click", filterAll);
  //Sorting
  document.querySelector("[data-sort='firstN']").addEventListener("click", sortFirst);
  document.querySelector("[data-sort='lastN']").addEventListener("click", sortLast);
  document.querySelector("[data-sort='houseN']").addEventListener("click", sortHouse);

}

async function loadJSON(){
  const response = await fetch("https://petlatkea.dk/2020/hogwarts/students.json");
  const jsonData = await response.json();
  //when loaded, prepare data objects:
  prepareObjects(jsonData);
}

function prepareObjects(jsonData){
  
  allStudents = jsonData.map(prepareObject);
  
  displayList(allStudents);
  //mySearch(allStudents);
}

function prepareObject(jsonObject){
  const student = Object.create(Student);
  const parts = jsonObject.fullname.trim();
  const houseParts = jsonObject.house.trim();
  //console.log(jsonObject.fullname.split(" "))
 
  //const upperHouse = jsonObject.house.substring(0,1).toUpperCase()
  //const lowerHouse = jsonObject.house.substring(1,).toLowerCase();
student.house = (houseParts.substring(0, 1)).toUpperCase() + (houseParts.substring(1, )).toLowerCase();

  //console.log(student.house)
  student.gender = jsonObject.gender;
  
  //console.log(parts)
  //console.log(parts.split(" "))
  //console.log(student.firstName = texts[1])
  //console.log(student.firstName = texts[2])
  let texts = parts.split(" ")
  //console.log(texts[0].substring(0,1))

  //console.log(texts)
  //console.log(student.firstName = texts[0].substring(0,1).toUpperCase()+texts[0].substring(1,).toLowerCase())
  //console.log(student.middleName = texts[1])
  //console.log(student.lastName = texts[2])
  if (texts.length < 3) {
   // console.log("its 2 names")
   if(texts[0]){
    student.firstName = texts[0].substring(0,1).toUpperCase()+texts[0].substring(1,).toLowerCase();
   }
   
   if(texts[1]){
      student.lastName = texts[1].substring(0,1).toUpperCase()+texts[1].substring(1,).toLowerCase();
    }
  student.newName = `${student.firstName} ${student.lastName}`
  } else {
   // console.log("its 3 names")
   if (texts[0]){
    student.firstName = texts[0].substring(0,1).toUpperCase()+texts[0].substring(1,).toLowerCase()
   }
   if (texts[1]){
    student.middleName = texts[1].substring(0,1).toUpperCase()+texts[1].substring(1,).toLowerCase()
   }
    if (texts[2]) {
      student.lastName = texts[2].substring(0,1).toUpperCase()+texts[2].substring(1,).toLowerCase()
    }
    student.newName = `${student.firstName} ${student.middleName} ${student.lastName}`
  }

return student;
}

//FILTERS

function filterGry(){
  const onlyGry = allStudents.filter(displayGry);
  displayList(onlyGry)
  function displayGry(student){
  return student.house === "Gryffindor";
} 
}

 function filterSly(){
  const onlySly = allStudents.filter(displaySly);
  displayList(onlySly)
  function displaySly(student){
  return student.house === "Slytherin";
} 
}

function filterHuf(){
  const onlyHuf = allStudents.filter(displayHuf);
  displayList(onlyHuf)
  function displayHuf(student){
  return student.house === "Hufflepuff";
} 
}

function filterRav(){
  const onlyRav = allStudents.filter(displayRav);
  displayList(onlyRav)
    function displayRav(student){
    return student.house === "Ravenclaw";
  } 
}

function filterAll(){
displayList(allStudents)
}

function displayList(students) {
  // clear the list
  document.querySelector("#studentsMain").innerHTML = "";

  // build a new list
  students.forEach(displayStudent);
  //console.log(allStudents)
    closeModal();
}

function displayStudent(student) {
  //console.log(student);
  //pick a theme
  document.querySelector("select#theme").addEventListener("change", selectTheme);
  
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  studentCopy.querySelector(".studentsFull").textContent = student.newName;
  studentCopy.querySelector(".houseName").textContent = student.house;
  
  //open modal
  studentCopy.querySelector("button").addEventListener("click", function(){

  const modalOpen = document.querySelector(".modal-background");

  //document.querySelector("body").setAttribute("houseStyle", this.value);
  modalOpen.classList.remove("hide")
  

  //before: const houseName = document.querySelector(".modal-house");
  document.querySelector("#modal-content").setAttribute("data-house", student.house);
  document.querySelector(".modalHouseName").textContent = student.house;
  document.querySelector(".modalStudentsName").textContent = `First name: ${student.firstName}`;
  document.querySelector(".modalStudentsMiddle").textContent = `Middle name: ${student.middleName}`;
  document.querySelector(".modalStudentsLast").textContent = `Last name: ${student.lastName}`;
  document.querySelector(".modalGender").textContent = `Gender: ${student.gender}`;
  document.querySelector(".modalPic").src = `images/${student.lastName.toLowerCase() + "_" + student.firstName[0].substring(0, 1).toLowerCase() + ".png"}`;
  document.querySelector(".modalCrest").src = `crest/${student.house + ".png"}`;

  
});
 
  //3.append
  document.querySelector("#studentsMain").appendChild(studentCopy);
  //console.log(student)
}


//sort by FIRST name
function sortFirst(){
  if (event.target.dataset.sortDirection === "asc") {
      event.target.dataset.sortDirection = "desc";
      console.log("sort asc")
      firstAsc();
  } else {
      console.log("sort desc")
      firstDesc();
      event.target.dataset.sortDirection = "asc";
  }
  }
  //condition - ascending
  function firstAsc(){
      console.log(allStudents)
      function compareName(a, b){
      if(a.firstName < b.firstName) {
      return -1;
      } else if (a.firstName > b.firstName){
      return 1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }
  //condition - descending
  function firstDesc(){
      console.log(allStudents)
      function compareName(a, b){
      if(a.firstName < b.firstName) {
      return 1;
      } else if (a.firstName > b.firstName){
      return -1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }
  
//sort by LAST NAME
function sortLast(){
  if (event.target.dataset.sortDirection === "asc") {
      event.target.dataset.sortDirection = "desc";
      console.log("sort asc")
      lastAsc();
  } else {
      console.log("sort desc")
      lastDesc();
      event.target.dataset.sortDirection = "asc";
  }
  }
//condition - ascending
  function lastAsc(){
      console.log(allStudents)
      function compareName(a, b){
      if(a.lastName < b.lastName) {
      return -1;
      } else if (a.lastName > b.lastName){
      return 1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }
//condition - descending
  function lastDesc(){
      console.log(allStudents)
      function compareName(a, b){
      if(a.lastName < b.lastName) {
      return 1;
      } else if (a.lastName > b.lastName){
      return -1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }

  //sort by FIRST name
function sortHouse(){
  if (event.target.dataset.sortDirection === "asc") {
      event.target.dataset.sortDirection = "desc";
      console.log("sort asc")
      houseAsc();
  } else {
      console.log("sort desc")
      houseDesc();
      event.target.dataset.sortDirection = "asc";
  }
  }
  //condition - ascending
  function houseAsc(){
      //console.log(houseParts)
      function compareName(a, b){
      if(a.house < b.house) {
      return -1;
      } else if (a.house > b.house){
      return 1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }
  //condition - descending
  function houseDesc(){
      console.log(allStudents)
      function compareName(a, b){
      if(a.house < b.house) {
      return 1;
      } else if (a.house > b.house){
      return -1;
      }
      }   
      allStudents.sort(compareName)
      displayList(allStudents)
    }

function closeModal() {
  //close the modal when clicked
  const modal = document.querySelector(".modal-background");
  modal.addEventListener("click", () => {
  modal.classList.add("hide");
  });
}
function selectTheme(){
 
  document.querySelector("body").setAttribute("houseStyle", this.value);

  console.log(selectTheme)

} 


// JavaScript code 
function mySearch() {
  var input, filter, templateAll, oneArticle, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  templateAll = document.getElementById("studentsMain");
  oneArticle = templateAll.getElementsByTagName("article");
 
  

  var results = [];
var searchField = "newName";
var searchVal = "firstName";
for (var i=0 ; i < obj.list.length ; i++)
{
    if (obj.list[i][searchField] == searchVal) {
        results.push(obj.list[i]);
    }
}
}

/* 
function showData() {
  fetch("students1991.json")
    .then(res => res.json())
    .then(handleData);
}

function handleData(showAll) {
  //console.log(showAll);
  //1. loop array
  showAll.forEach(showStudents);
  console.log(showAll)
  closeModal();
}

function showStudents(student) {
  //console.log(student);
  //pick a theme
  document.querySelector("select#theme").addEventListener("change", selectTheme);
  
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  studentCopy.querySelector(".studentsName").textContent = student.fullname;
  studentCopy.querySelector(".houseName").textContent = student.house;
  
  //open modal
  studentCopy.querySelector("button").addEventListener("click", function(){
  const modalOpen = document.querySelector(".modal-background")
  modalOpen.classList.remove("hide")

  //before: const houseName = document.querySelector(".modal-house");
  houseName.textContent = student.house;
  document.querySelector(".modal-house").textContent = student.house;
  document.querySelector(".modal-name").textContent = student.fullname;
});
 
  //3.append
  document.querySelector("#studentsMain").appendChild(studentCopy);
  console.log(student)
}

function closeModal() {
  //close the modal when clicked
  const modal = document.querySelector(".modal-background");
  modal.addEventListener("click", () => {
  modal.classList.add("hide");
  });
}

function selectTheme(){
  
  document.querySelector("body").setAttribute("houseStyle", this.value);
  console.log(selectTheme)

} */
/* //

//botou data-theme no html mas nao precisa, isso eh so pra testing. pode remover depois.
na funcao antes, dentro do modal, bota esa linha:
document.queryselector(#theme).addeventlistener("change", changetheme);

ai fora, vai criar a funcao changetheme:
func change theme(){
  const theme = this,value
  console.log(theme)
  doc.querselec(modal).dataset.theeme= theme;
  //use the data set thingy cause i want to change the data color css




  qdo adiciona cor no modal,  remove the eventlistener pq nao precisa do botao 
  document.queryselector(#modal).dataset.theme =student.house)
} */