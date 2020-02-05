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

  const house = studentCopy.querySelector(".houseName");
  house.textContent = student.house;

  studentCopy.querySelector("button").addEventListener("click", showDetails);

  //3.append
  document.querySelector("#studentsMain").appendChild(studentCopy);
}

function showDetails(student) {
  //close the modal when clicked

  const modal = document.querySelector(".modal-background");
  modal.addEventListener("click", () => {
    modal.classList.add("hide");
  });

  console.log(student);
  modal.querySelector(".modal-name").content = student.fullname;
  modal.querySelector(".modal-house").content = student.house;
  modal.classList.remove("hide");
}
