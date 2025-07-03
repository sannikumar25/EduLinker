document.getElementById("teacherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const contact = formData.get("contact");

  const file = form.profile_pic.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const data = Object.fromEntries(formData.entries());
    data.profile_pic = reader.result || ""; // Base64 image

    // Save teacher to individual key and full list
    localStorage.setItem("teacher_" + contact, JSON.stringify(data));

    const allTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    allTeachers.push(data);
    localStorage.setItem("teachers", JSON.stringify(allTeachers));

    alert("Teacher registered locally! (Simulated)");
    form.reset();
  };

  if (file) {
    reader.readAsDataURL(file); // Convert image to base64
  } else {
    reader.onload(); // trigger manually if no image
  }
});
