window.addEventListener("DOMContentLoaded", showData);

function showData() {
  fetch("students1991.json")
    .then(res => res.json())
    .then(handleData);
}

function handleData(showAll) {
  console.log(showAll);
  //1. loop array
  showAll.forEach(showStudents);
}

function showStudents(student) {
  console.log(student);
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  //2.grab content
  const oneName = studentCopy.querySelector(".studentsName");
  oneName.textContent = student.fullname;

  //3.append
  document.querySelector("#studentsMain").appendChild(studentCopy);
}

// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
