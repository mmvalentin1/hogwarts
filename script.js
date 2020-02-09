window.addEventListener("DOMContentLoaded", showData);

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
  //1. clone template
  const template = document.querySelector(".templateMain").content;
  const studentCopy = template.cloneNode(true);

  studentCopy.querySelector(".studentsName").textContent = student.fullname;
  studentCopy.querySelector(".houseName").textContent = student.house;
  //ask difference lines 23 24 and 28 30 why one set const and other not
  //open modal
  studentCopy.querySelector("button").addEventListener("click", function(){
  const modalOpen = document.querySelector(".modal-background")
  modalOpen.classList.remove("hide")
  const houseName = document.querySelector(".modal-house");
  houseName.textContent = student.house;
  const studentName = document.querySelector(".modal-name");
  studentName.textContent = student.fullname;
  console.log();
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
