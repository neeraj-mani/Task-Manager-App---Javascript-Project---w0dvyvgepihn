const modal = document.querySelector(".task-modal");
const modalBg = document.querySelector(".modal-bg");
const createTaskBtn = document.querySelector(".create-task");
const addTaskBtn = document.querySelector(".add-task");
const openTasks = document.querySelector(".tasks__all");
const taskInput = document.querySelector(".task-input");
const taskContainerList = document.querySelectorAll(".tasks");

createTaskBtn.addEventListener("click", (e) => {
  modal.classList.toggle("modal-open");
  taskInput.focus();
});
modalBg.addEventListener("click", () => {
  modal.classList.toggle("modal-open");
});
function addTask(taskString, taskType, taskContainer) {
  taskContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div class="task-container" draggable="true">
        <div class="task-label task-label__${taskType}"></div>
        <p class="task-content">${taskString}</p>
        <button class="delete_button">Delete</div>
      </div>`
  );
}

let currentDraggable = null;
addTaskBtn.addEventListener("click", () => {
  if (!taskInput.value.trim().length > 0) return;
  addTask(taskInput.value, "open", openTasks);
  modal.classList.toggle("modal-open");
  taskInput.value = "";
});
taskContainerList.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log(e);
  });
  container.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    currentDraggable.classList.remove("dragging");
    if (e.target.closest(".tasks") === currentDraggable.parentElement) return;
    const data = e.dataTransfer.getData("text");
    addTask(
      data,
      e.target.closest(".tasks").dataset.type,
      e.target.closest(".tasks")
    );
    currentDraggable.remove();
  });

  container.addEventListener("dragstart", (e) => {
    currentDraggable = e.target;
    currentDraggable.classList.add("dragging");
    e.dataTransfer.setDragImage(e.target, 10, 10);
    e.dataTransfer.setData(
      "text",
      e.target.querySelector(".task-content").innerText
    );
    console.log(e);
  });
});

taskContainerList.forEach((container) =>
  container.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("delete_button"));
    if (e.target.classList.contains("delete_button")) {
      e.target.closest(".task-container").remove();
      console.log("deleted");
    }
  })
);
