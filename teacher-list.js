document.addEventListener("DOMContentLoaded", () => {
  const teacherListDiv = document.getElementById("teacherList");
  let found = false;

  // Temporary list to sort and display all teacher_ keys
  const teachers = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("teacher_")) {
      const teacher = JSON.parse(localStorage.getItem(key));
      teacher._key = key; // save key for deletion
      teachers.push(teacher);
      found = true;
    }
  }

  if (!found) {
    teacherListDiv.innerHTML = "No teachers registered yet.";
    return;
  }

  teachers.forEach((teacher) => {
    const div = document.createElement("div");
    div.className = "teacher";

    const img = document.createElement("img");
    img.src = teacher.profile_pic || "https://via.placeholder.com/80";
    img.alt = teacher.name;
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.style.border = "2px solid #fff";

    const details = document.createElement("div");
    details.className = "teacher-details";
    details.innerHTML = `
      <strong>${teacher.name}</strong><br>
      Subject: ${teacher.subject}<br>
      Location: ${teacher.location}<br>
      Contact: ${teacher.contact}<br>
      Time: ${teacher.available_time || "Not provided"}
    `;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      if (confirm(`Are you sure you want to delete ${teacher.name}?`)) {
        localStorage.removeItem(teacher._key);
        location.reload(); // Refresh list
      }
    };

    details.appendChild(delBtn);

    div.appendChild(details);
    div.appendChild(img);
    teacherListDiv.appendChild(div);
  });
});
