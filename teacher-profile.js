function loadProfile() {
  const contact = document.getElementById("contactLookup").value.trim();
  const data = localStorage.getItem("teacher_" + contact);

  if (!data) {
    alert("Teacher not found!");
    return;
  }

  const teacher = JSON.parse(data);

  document.getElementById("profileContainer").innerHTML = `
    <form onsubmit="saveProfile(event, '${contact}')">
      <img id="previewPic" src="${teacher.profile_pic || 'https://via.placeholder.com/100'}"
           alt="Profile Picture" 
           onclick="showFullImage(this.src)"
           style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:2px solid #fff;cursor:pointer;"><br><br>

      <label>Change Profile Picture:</label><br>
      <input type="file" name="profile_pic" accept="image/*" onchange="previewImage(event)"><br><br>

      <input type="text" name="name" value="${teacher.name}" required><br>
      <input type="text" name="subject" value="${teacher.subject}" required><br>
      <input type="text" name="location" value="${teacher.location}" required><br>
      <input type="time" name="available_time" value="${teacher.available_time || ''}"><br>
      <button type="submit">Save Changes</button>
    </form>
  `;

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "old_pic";
  hiddenInput.value = teacher.profile_pic || "";
  document.querySelector("form").appendChild(hiddenInput);
}

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("previewPic").src = reader.result;
  };
  reader.readAsDataURL(file);
}

function saveProfile(event, contact) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const teacher = Object.fromEntries(formData.entries());
  teacher.contact = contact;

  const file = form.profile_pic.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      teacher.profile_pic = reader.result;
      saveToLocal(contact, teacher);
    };
    reader.readAsDataURL(file);
  } else {
    teacher.profile_pic = form.old_pic.value;
    saveToLocal(contact, teacher);
  }
}

function saveToLocal(contact, teacher) {
  localStorage.setItem("teacher_" + contact, JSON.stringify(teacher));

  let all = JSON.parse(localStorage.getItem("teachers")) || [];
  all = all.map(t => (t.contact === contact ? teacher : t));
  localStorage.setItem("teachers", JSON.stringify(all));

  alert("Profile updated!");
}

// 📸 Show full image in overlay
function showFullImage(src) {
  const overlay = document.getElementById("imageOverlay");
  const overlayImage = document.getElementById("overlayImage");
  overlayImage.src = src;
  overlay.style.display = "flex";
}

// ❌ Close overlay on click
function closeOverlay() {
  document.getElementById("imageOverlay").style.display = "none";
}
