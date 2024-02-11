$(document).ready(function () {
    let url = "http://todo.reworkstaging.name.ng/v1";
    let loggedUser = JSON.parse(localStorage.getItem("Task_Manager_User"));
    $("#user_name").html(`Welcome, ${loggedUser.name}`);
    

    // Function to populate the category dropdown
    function populateCategoryDropdown() {
       
            // Clear the existing options in the dropdown
            $("#tag_id").empty();
        
            // Make an AJAX request to fetch all tags for the logged-in user
            $.ajax({
                method: "GET",
                url: `${url}/tags?user_id=${loggedUser.id}`,
                success: function (data) {
                    // Iterate over the retrieved tags and populate the dropdown options
                    $.each(data, function (i, tag) {
                        $("#tag_id").append(`<option value="${tag.id}">${tag.title}</option>`);
                    });
                },
                error: function (err) {
                    console.log(err);
                },
            });
        
        
    }

    // Get Tasks
    function getAllTasks() {
        $.ajax({
            method: "GET",
            url: `${url}/tasks?user_id=${loggedUser.id}`,
            success: function (data) {
                displayTask(data);
            },
            error: function (err) {
                console.log(err);
            },
        });
    }
    getAllTasks();

    function displayTask(data) {
        console.log(data);
        let todos = "";
        if (data.length) {
            $.each(data, function (i, ele) {
                todos += `
                    <div class="todo_card">
                        <div class="todo_card_title">
                            <h3>${ele.title}</h3>
                            <div class="todo_card_title_icons">
                                <button class="edit_btn" style="background-color: transparent; border: none;"><img src='edit.png'></button>
                                <button class="delete_btn" style="background-color: transparent; border: none;"><img src='delete.png'></button>
                            </div>
                        </div>
                        <p>${ele.content}</p>
                        <div class="todo_card_footer">
                            <div >${ele.tag}</div>
                            <div class="todo_card_status">
                                <input type="checkbox" id="" />
                                <span>Done</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            $("#todo_cards").html(todos);
        } else {
            $("#todo_cards").html("No Todos Created");
        }
    }

    // Function to delete a task
// Function to delete a task
function deleteTask(taskId) {
    // Ask for confirmation before deleting
    if (confirm("Are you sure you want to delete this task?")) {
        // Make AJAX request to delete the task
        $.ajax({
            method: "DELETE",
            url: `${url}/task{task.id}`,
            success: function () {
                // Remove the task element from the DOM
                $(`.todo_card[data-id="${taskId}"]`).remove();
                alert("Task Deleted");
            },
            error: function (err) {
                console.log(err);
            },
        });
    }
}

// Event listener for delete button click
$(document).on("click", ".delete_btn", function () {
    let taskId = $(this).closest('.todo_card').data('id');
    deleteTask(taskId);
});



    function TodoModal() {
        $("#myModalCategory").fadeIn();
        $("body").addClass("modal-open");
    }

    function HideTodoModal() {
        $("#myModalCategory").fadeOut();
        $("body").removeClass("modal-open");
    }

    function openTaskModal() {
        $("#taskModal").fadeIn();
        $("body").addClass("modal-open");
    }

    function closeTaskModal() {
        $("#taskModal").fadeOut();
        $("body").removeClass("modal-open");
    }

    $("#openModalBtn").click(TodoModal);
    $("#closeModalBtnTwo").click(HideTodoModal);

    function createTag() {
        let newTag = {
            user_id: loggedUser.id,
            title: $("#CategoryName").val(),
            color: $("#categoryColor").val(),
        };
        $.ajax({
            method: "POST",
            url: `${url}/tags`,
            data: newTag,
            success: function (success) {
                alert("Tag Created");
                console.log(success);
                HideTodoModal();
            },
            error: function (err) {
                console.log(err);
            },
        });
    }

    $("#categoryForm").submit(function (event) {
        event.preventDefault();
        createTag();
    });

    function createTask() {
        let newTask = {
            tag_id: $("#tag_id").val(),
            title: $("#taskTitle").val(),
            content: $("#taskDescription").val(),
        };
        $.ajax({
            method: "POST",
            url: `${url}/tasks`,
            data: newTask,
            success: function () {
                getAllTasks();
                alert("Task Created");
            },
            error: function (err) {
                console.log(err);
            },
        });
    }
    // Function to handle task editing
function editTask(taskId) {
    // Make AJAX request to fetch the details of the task to be edited
    $.ajax({
        method: "GET",
        url: `${url}/tasks?user_id=${loggedUser.id}`,
        success: function (task) {
            
            $("#edit_task_id").val(task.id);
            $("#edit_title").val(task.title);
            $("#edit_content").val(task.content);
            $("#edit_tag_id").val(task.tag_id);
            
            
            $("#editTaskModal").fadeIn();
            $.each(data, function (i, tag) {
                $("#tag_id").append(`<option value="${tag.id}">${tag.title}</option>`);
            });
        },
       
        error: function (err) {
            console.log(err);
        },
    });
}

// Event listener for edit button click
$(document).on("click", ".edit_btn", function () {
    let taskId = $(this).closest('.todo_card').data('id');
    editTask(taskId); // Call editTask function with taskId
});

// Event listener for edit form submission
$("#editTaskForm").submit(function (event) {
    event.preventDefault();
    let taskId = $("#edit_task_id").val();
    let updatedTask = {
        title: $("#edit_title").val(),
        content: $("#edit_content").val(),
        tag_id: $("#edit_tag_id").val(),
    };
    // Make AJAX request to update the task
    $.ajax({
        method: "PUT", // Assuming your API uses PUT for updates
        url: `${url}/tasks`,
        data: updatedTask,
        success: function () {
            getAllTasks(); // Refresh the tasks after update
            alert("Task Updated");
            $("#editTaskModal").fadeOut();
        },
        error: function (err) {
            console.log(err);
        },
    });
});


    
    function getAllTags() {
        $.ajax({
            method: "GET",
            url: `${url}/tags?user_id=${loggedUser.id}`,
            success: function (data) {
                $.each(data, function (i, ele) {
                    $("#todo-lists-category").append(
                        `<li id='${ele.id}' class='single_tags'>
                            <div style='background-color: ${ele.color}'></div>
                            ${ele.title}
                        </li>`
                    );
                    $("#tag_id").append(`
                        <option value='${ele.id}'>${ele.title}</option>
                    `);
                });
            },
            error: function (err) {
                console.log(err);
            },
        });
    }

    getAllTags();

    // Event listener for edit button

    function handleTaskFormSubmission(event) {
        event.preventDefault();
        createTask();
        closeTaskModal();
    }

    $(document).ready(function () {
        $("#openTaskModalBtn").click(openTaskModal);
        $("#closeTaskModalBtn").click(closeTaskModal);
        $("#openTaskModalBtn").click(populateCategoryDropdown);
        $("#taskForm").submit(handleTaskFormSubmission);
    });

    function filterTag() {
        $("#todo-lists-category").on("click", ".single_tags", function () {
            let tagId = $(this).attr("id");
            let childLis = $("#todo-lists-category .single_tags");
            childLis.removeClass("active");
            $(this).addClass("active");

            if (tagId === "allTodos") {
                getAllTasks();
            } else {
                $.ajax({
                    method: "GET",
                    url: `${url}/tags/tasks?tag_id=${tagId}`,
                    success: function (data) {
                        displayTask(data);
                    },
                    error: function (err) {
                        console.log(err);
                    },
                });
            }
        });
    }

    filterTag();
});


    





