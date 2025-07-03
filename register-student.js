document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
  localStorage.setItem("student_" + data.contact, JSON.stringify(data));
  alert("Student registered locally! (Simulated)");
  this.reset();
});
