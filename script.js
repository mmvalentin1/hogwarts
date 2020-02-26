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



function prepareObject(jsonObject){
  const student = Object.create(Student);
  //console.log(jsonObject.fullname.split(" "))
  student.house = jsonObject.house;
  student.gender = jsonObject.gender;
  const parts = jsonObject.fullname.trim();
  //console.log(parts)
  //console.log(parts.split(" "))
  //console.log(student.firstName = texts[1])
  //console.log(student.firstName = texts[2])
  let texts = parts.split(" ")
  //console.log(texts[0].substring(0,1))
  
  let firstName = student.firstName;
  //console.log(texts)
  console.log(student.firstName = texts[0].substring(0,1).toUpperCase()+texts[0].substring(1,).toLowerCase())
  //console.log(student.middleName = texts[1])
  //console.log(student.lastName = texts[2])
  if (texts.length < 3) {
   // console.log("its 2 names")
    student.firstName = texts[0]
    student.lastName = texts[1]

    student.newName = `${student.firstName} ${student.lastName}`
  } else {
   // console.log("its 3 names")
    student.firstName = texts[0]
    student.middleName = texts[1]
    student.lastName = texts[2]
    student.newName = `${student.firstName} ${student.middleName} ${student.lastName}`
  }

console.log(student)

return student;
}

function displayList(students) {
  // clear the list
  //document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  students.forEach(displayStudent);
    console.log(allStudents)
    closeModal();
}

function displayStudent(student) {
  console.log(student);
  //pick a theme
  //document.querySelector("select#theme").addEventListener("change", selectTheme);
  
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  studentCopy.querySelector(".studentsFull").textContent = student.newName;
  studentCopy.querySelector(".houseName").textContent = student.house;
  
  //open modal
  studentCopy.querySelector("button").addEventListener("click", function(){
  const modalOpen = document.querySelector(".modal-background")
  modalOpen.classList.remove("hide")

  //before: const houseName = document.querySelector(".modal-house");
  document.querySelector(".modalHouseName").textContent = student.houseName;
  document.querySelector(".modalStudentsName").textContent = `First name: ${student.firstName}`;
  document.querySelector(".modalStudentsMiddle").textContent = `Middle name: ${student.middleName}`;
  document.querySelector(".modalStudentsLast").textContent = `Last name: ${student.lastName}`;
  document.querySelector(".modalGender").textContent = `Gender: ${student.gender}`;
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

