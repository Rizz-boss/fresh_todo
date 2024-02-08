$(document).ready(function () {
    let apiUrl = "http://example.com/api/v1";
    let currentUser = JSON.parse(localStorage.getItem("Current_User"));
    $("#welcome_message").html(`Hello, ${currentUser.name}`);

    function fetchAllCategories() {
        $.ajax({
            method: "GET",
            url: `${apiUrl}/categories?user_id=${currentUser.id}`,
            success: function (data) {
                $.each(data, function (index, category) {
                    $("#category-list").append(
                        `<li id='${category.id}' class='category-item'>
                            <div style='background-color: ${category.color}'></div>
                            ${category.name}
                        </li>`
                    );
                    $("#category-dropdown").append(`
                        <option value='${category.id}'>${category.name}</option>
                    `);
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
    fetchAllCategories();

    // Get User Tasks
    function fetchUserTasks() {
        $.ajax({
            method: "GET",
            url: `${apiUrl}/tasks?user_id=${currentUser.id}`,
            success: function (data) {
                displayTasks(data);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
    fetchUserTasks();

    function displayTasks(data) {
        let tasksHTML = "";
        if (data.length) {
            $.each(data, function (index, task) {
                tasksHTML += `
                    <div class="task-item">
                        <div class="task-title">
                            <h3>${task.title}</h3>
                            <div class="task-icons">
                                <button class="edit-btn"><img src='edit.png'></button>
                                <button class="delete-btn"><img src='delete.png'></button>
                            </div>
                        </div>
                        <p>${task.description}</p>
                        <div class="task-footer">
                            <div class="category">${task.category}</div>
                            <div class="task-status">
                                <input type="checkbox" id="" />
                                <span>Done</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            $("#task-list").html(tasksHTML);
        } else {
            $("#task-list").html("No tasks available");
        }
    }

    function showModal() {
        $("#taskModal").fadeIn();
        $("body").addClass("modal-open");
    }

    function hideModal() {
        $("#taskModal").fadeOut();
        $("body").removeClass("modal-open");
    }

    function createNewCategory() {
        let newCategory = {
            user_id: currentUser.id,
            name: $("#newCategoryName").val(),
            color: $("#newCategoryColor").val(),
        };
        $.ajax({
            method: "POST",
            url: `${apiUrl}/categories`,
            data: newCategory,
            success: function () {
                alert("Category Created");
                hideModal(); // Close the modal after creating a category
            },
            error: function (error) {
                console.log(error);
            },
        });
    }

    $("#newCategoryForm").submit(function (event) {
        event.preventDefault();
        createNewCategory();
    });

    function handleTaskForm(event) {
        event.preventDefault();
        createTask();
        hideModal();
    }

    $(document).ready(function () {
        // ...

        $("#openTaskModalBtn").click(showModal);

        $("#closeTaskModalBtn").click(hideModal);

        $("#openTaskModalBtn").click(fetchAllCategories);

        $("#taskForm").submit(handleTaskForm);

        // ...
    });

    function filterCategories() {
        $("#category-list").on("click", ".category-item", function () {
            let categoryId = $(this).attr("id");
            let categoryItems = $("#category-list .category-item");
            categoryItems.removeClass("active");
            $(this).addClass("active");

            if (categoryId === "allCategories") {
                fetchUserTasks();
            } else {
                $.ajax({
                    method: "GET",
                    url: `${apiUrl}/categories/tasks?category_id=${categoryId}`,
                    success: function (data) {
                        displayTasks(data);
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
            }
        });
    }

    filterCategories();
});
