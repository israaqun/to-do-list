function deleteAllTasks(){taskList.innerHTML="",existingTasks.clear(),saveTaskListToLocalStorage(),updateDeleteAllButtonVisibility()}document.addEventListener("DOMContentLoaded",function(){const d=document.getElementById("taskList");var t=document.getElementById("listunav");const c=new Set;function i(){var t=document.getElementById("deleteAllButton");0<d.children.length?t.style.display="block":t.style.display="none"}function r(){var t=d.innerHTML;localStorage.setItem("taskList",t)}!function(){try{return localStorage.setItem("test","test"),localStorage.removeItem("test"),1}catch(t){}}()?(d.style.display="none",t.style.display="block"):(d.style.display="block",t.style.display="none",(t=localStorage.getItem("taskList"))&&(d.innerHTML=t,d.querySelectorAll(".task-text").forEach(function(t){c.add(t.textContent)})),i()),i(),d.addEventListener("click",function(t){t=t.target;if(t.classList.contains("delete-button")){var e=t.closest(".task-item"),n=e.querySelector(".task-text");n&&(n=n.textContent,e.remove(),c.delete(n),i(),r())}else if(t.classList.contains("update-button")){const a=t.closest(".task-item"),s=a.querySelector(".task-text");if(s){const l=s.textContent,o=document.createElement("input"),d=(o.classList.add("edit-input"),o.value=l,document.createElement("button"));d.classList.add("save-button"),d.textContent="Save",d.addEventListener("click",function(){var t,e=o.value;l!==(t=e)&&c.has(t)?alert("Task already exists. Please enter a different task."):(s.textContent=e,(t=document.createElement("button")).classList.add("update-button"),t.textContent="Update",a.querySelector(".task-actions").appendChild(t),a.removeChild(o),a.removeChild(d),r(),i())}),a.querySelector(".task-actions").removeChild(t),a.appendChild(o),a.appendChild(d),o.focus()}}}),document.querySelector(".task-button").addEventListener("click",function(){var t=document.getElementById("taskInput");const e=t.value.trim();if(""===e)alert("Please enter a task.");else{var n=e.toLowerCase().replace(/ /g,"-").replace(/[^a-zA-Z0-9-]/g,"");if(console.log("Task Slug:",n),n=e,c.has(n))alert("Task already exists. Please enter a different task.");else{const o=document.createElement("li");o.classList.add("task-item");var n=document.createElement("span"),a=(n.classList.add("task-text"),n.textContent=e,document.createElement("div")),s=(a.classList.add("task-actions"),document.createElement("button")),l=(s.classList.add("update-button"),s.textContent="Update",document.createElement("button"));l.classList.add("delete-button"),l.textContent="Delete",l.addEventListener("click",function(){o.remove(),c.delete(e),r(),i()}),a.appendChild(s),a.appendChild(l),o.appendChild(n),o.appendChild(a),d.appendChild(o),t.value="",c.add(e),r(),i()}}})});