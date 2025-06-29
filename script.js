const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0
  };
  
  let courseCount = 1;
  
  document.getElementById("addCourseBtn").addEventListener("click", function() {
    courseCount++;
    const container = document.getElementById("coursesContainer");
    const div = document.createElement("div");
    div.className = "course-row";
    div.innerHTML = `
      <label>Course ${courseCount}:</label>
      Name:
      <input type="text" class="course-name" placeholder="Course Name">
      Credits:
      <input type="number" class="course-credits" value="3" min="1">
      Grade:
      <select class="course-grade">
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    `;
    container.appendChild(div);
  });
  document.getElementById("calculateBtn").addEventListener("click", function() {
    const creditsInputs = document.querySelectorAll(".course-credits");
    const gradeSelects = document.querySelectorAll(".course-grade");
  
    let totalPoints = 0;
    let totalCredits = 0;
  
    for (let i = 0; i < creditsInputs.length; i++) {
      const credits = parseFloat(creditsInputs[i].value);
      const grade = gradeSelects[i].value;
  
      if (isNaN(credits) || credits <= 0) {
        alert(`Please enter valid credits for Course ${i + 1}`);
        return;
      }
  
      totalPoints += gradePoints[grade] * credits;
      totalCredits += credits;
    }
  
    const gpa = totalPoints / totalCredits;
    document.getElementById("semesterResult").textContent = "Semester GPA: " + gpa.toFixed(2);
  });
  
  document.getElementById("calcAccumulativeBtn").addEventListener("click", function() {
    const currentGPA = parseFloat(document.getElementById("currentGPA").value);
    const completedCredits = parseFloat(document.getElementById("completedCredits").value);
  
    const creditsInputs = document.querySelectorAll(".course-credits");
    const gradeSelects = document.querySelectorAll(".course-grade");
  
    let semesterPoints = 0;
    let semesterCredits = 0;
  
    for (let i = 0; i < creditsInputs.length; i++) {
      const credits = parseFloat(creditsInputs[i].value);
      const grade = gradeSelects[i].value;
  
      semesterPoints += gradePoints[grade] * credits;
      semesterCredits += credits;
    }
  
    if (isNaN(currentGPA) || isNaN(completedCredits)) {
      alert("Please enter your current GPA and completed credits.");
      return;
    }
  
    const totalPoints = (currentGPA * completedCredits) + semesterPoints;
    const totalCredits = completedCredits + semesterCredits;
    const accumulativeGPA = totalPoints / totalCredits;
  
    document.getElementById("accumulativeResult").textContent = "Accumulative GPA: " + accumulativeGPA.toFixed(2);
  });
  
  document.getElementById("calcGoalBtn").addEventListener("click", function() {
    const currentGPA = parseFloat(document.getElementById("currentGPA").value);
    const completedCredits = parseFloat(document.getElementById("completedCredits").value);
    const goalGPA = parseFloat(document.getElementById("goalGPA").value);
  
    const creditsInputs = document.querySelectorAll(".course-credits");
  
    let semesterCredits = 0;
  
    for (let i = 0; i < creditsInputs.length; i++) {
      semesterCredits += parseFloat(creditsInputs[i].value);
    }
  
    if (isNaN(currentGPA) || isNaN(completedCredits) || isNaN(goalGPA)) {
      alert("Please enter all fields for the goal GPA calculation.");
      return;
    }
  
    const totalCredits = completedCredits + semesterCredits;
    const requiredTotalPoints = goalGPA * totalCredits;
    const earnedPoints = currentGPA * completedCredits;
    const requiredSemesterGPA = (requiredTotalPoints - earnedPoints) / semesterCredits;
  
    document.getElementById("goalResult").textContent =
      "You need a semester GPA of " + requiredSemesterGPA.toFixed(2) + " to reach your goal GPA.";
  });
  