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

  /*//before: const houseName = document.querySelector(".modal-house");
  houseName.textContent = student.house; */
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

}
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

