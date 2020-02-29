"use strict"

window.addEventListener("DOMContentLoaded", start);

/* ---------------------------------------GLOBAL-------------------------------------------------------------- */

let allStudents =  [];
let winners = [];
// The prototype for all students: 
const Student = {
      firstName: "",
      middleName: "",
      lastName: "",
      newName:"",
      nickName:"",
      gender:"",
      houseName: "",
      image: "",
      star: false
};

/* ---------------------------------------INIT-------------------------------------------------------------- */

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
}

/* ---------------------------------------CAPITALIZE, ORGANIZE FULL NAME-------------------------------------------------------------- */

function prepareObject(jsonObject){
  const student = Object.create(Student);
  const parts = jsonObject.fullname.trim();
  const houseParts = jsonObject.house.trim();
  //console.log(jsonObject.fullname.split(" "))
  student.house = (houseParts.substring(0, 1)).toUpperCase() + (houseParts.substring(1, )).toLowerCase();
  student.gender = jsonObject.gender;
  //console.log(parts)
  //console.log(parts.split(" "))
  //console.log(student.firstName = texts[1])
  let texts = parts.split(" ")
  //console.log(texts[0].substring(0,1))
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

/* ---------------------------------------FILTERS------------------------------------------------------------------------------------- */

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

/* ---------------------------------------------LISTS------------------------------------------------------------------------------- */

function displayList(students) {
  // clear the list
  document.querySelector("#studentsMain").innerHTML = "";
  // build a new list
  students.forEach(displayStudent);
  //console.log(allStudents)
  closeModal();
}

/* ---------------------------------------------TEMPLATE------------------------------------------------------------------------------- */
function displayStudent(student) {
  //console.log(student);
  //pick a theme
  document.querySelector("select#theme").addEventListener("change", selectTheme);
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  // set clone data
  studentCopy.querySelector("[data-field=star").dataset.star = student.star;

  // TODO: Show star ⭐ or ☆
  if (student.star === true) {
    studentCopy.querySelector("[data-field=star]").textContent = "⭐";
} else {
    studentCopy.querySelector("[data-field=star]").textContent = "☆";
}


  // TODO: Add event listener to click on star
  studentCopy.querySelector("[data-field=star]").addEventListener("click", function(){
    //maxTwo(animal);
    differentType(student);
})
  studentCopy.querySelector(".studentsFull").textContent = student.newName;
  studentCopy.querySelector(".houseName").textContent = student.house;


  
  //MODAL
  studentCopy.querySelector("button").addEventListener("click", function(){
  const modalOpen = document.querySelector(".modal-background");
  //document.querySelector("body").setAttribute("houseStyle", this.value);
  modalOpen.classList.remove("hide");  
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

/* ---------------------------------------SORTING------------------------------------------------------------------------------------- */
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

//sort by HOUSE name
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




 function differentType(student){
 //WINNER TYPE SELECTION
 if (student.star){
 //console.log("this animal is NOT A WINNER")
 student.star = false;
 console.log(student.star)
 //console.log(animal)
 } else {
     //student.star = true 
     console.log(student.star) 
     //console.log("this animal is a WINNER")
     function checkType(x){
     return x.gender === student.gender;
 }

 if (winners.some(checkType) == false) {
    console.log("star is there");
    student.star = true;
    }
    else {
    console.log("star type IS there");
    console.log(winners[0])
    console.log(winners)
    console.log(student.star)
    document.querySelector("#onlyonekind").classList.add("show")
    //find the one that has the same type
    console.log(winners[0].firstName)
    document.querySelector("#onlyonekind .animal1").textContent = `${winners[0].firstName}, the ${winners[0].gender}`;
    document.querySelector("#onlyonekind [data-action=remove1]").addEventListener("click", function() {
    console.log(winners[0])
    //give the value False to the duplicate that has to be removed:
    winners[0].star = false
    student.star = true;
    document.querySelector("#onlyonekind").classList.remove("show")
    displayList(allStudents);  
    })   
    document.querySelector("#onlyonekind .closebutton").addEventListener("click", function () {
    console.log("closing test")
    document.querySelector("#onlyonekind").classList.remove("show")
    })            
    //displayList(allStudents);
    
    }




      if (winners.length>2 ){
        
        document.querySelector("#onlytwowinners").classList.add("show");
        console.log(winners)
        console.log(student.star)
        document.querySelector("#onlytwowinners .animal1").textContent = `${winners[0].newName}, the ${winners[0].gender}`;
       
        document.querySelector("#onlytwowinners [data-action=remove1]").addEventListener("click", function() {
            console.log(winners[0])
            //sets to false the animal to be removed:
            winners[0].star = false;
            winners[1].star = true;
            //selects the animal user is clicking now:
            student.star= true;
            displayList(allStudents)
            document.querySelector("#onlytwowinners").classList.remove("show")
        }) 

        document.querySelector("#onlytwowinners .animal2").textContent = `${winners[1].newName}, the ${winners[1].gender}`;
        document.querySelector("#onlytwowinners [data-action=remove2]").addEventListener("click", function() {
            console.log(winners[1])
            //sets to false the animal to be removed:
            winners[1].star = false;
            winners[0].star = true;
            //selects the animal user is clicking now:
            student.star= true;
            displayList(allStudents)
            document.querySelector("#onlytwowinners").classList.remove("show")
        })    
          
          
      }
      winners = allStudents.filter(students=> students.star == true);

   }
  displayList(allStudents)
 }





/* ---------------------------------------------OTHERS------------------------------------------------------------------------------- */
function closeModal() {
  const modal = document.querySelector(".modal-background");
  modal.addEventListener("click", () => {
  modal.classList.add("hide");
  });
}

function selectTheme(){
  document.querySelector("body").setAttribute("houseStyle", this.value);
  console.log(selectTheme)
}