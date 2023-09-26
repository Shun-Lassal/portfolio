<script setup>
// Use the imported Node.js function in the Vue component
const timeTerms = ref([]);
const newTermDescription = ref('');
const selectedTermId = ref(null);
const todos = ref([]);
const newTaskDescription = ref('');

// Function to fetch Time Terms
const fetchTimeTerms = async () => {
  try {
    const response = await $fetch('/api/time_term');
    if (response.result && response.result.data) {
      timeTerms.value = response.result.data;
      if (timeTerms.value.length > 0) {
        // Fetch Todos for the first Time Term in the list
        fetchTodos(timeTerms.value[0]._id);
      }
    } else {
      timeTerms.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch Time Terms:', error);
  }
};


// Function to add a new Time Term
const addNewTimeTerm = async () => {
  const response = await $fetch('/api/time_term', {
    method: 'POST',
    body: JSON.stringify({ termDescription: newTermDescription.value }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.result) {
    newTermDescription.value = ''; // Clear the input field after adding
    fetchTimeTerms(); // Fetch the updated list of Time Terms
  } else {
    // Handle error if needed
  }
};

// Function to delete a Time Term
const deleteTimeTerm = async (termId) => {
  try {
    const deleteTimeTermResponse = await $fetch('/api/time_term', {
      method: 'DELETE',
      body: JSON.stringify({ termId: termId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteTodosResponse = await $fetch('/api/todo', {
      method: 'DELETE',
      body: JSON.stringify({ termId: termId}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (deleteTimeTermResponse.result) {
      fetchTimeTerms(); // Fetch the updated list of TimeTerms
    } else {
      // Handle the error if needed
    }

    if(deleteTodosResponse.result)
    {
      fetchTodos(termId); // Fetch the updated list of Todos
    }
    else {
      // Handle the error if needed
    }
  } catch (error) {
    console.error('Failed to delete Time Term:', error);
  }
};

// Function to fetch Todos based on the selected Time Term
const fetchTodos = async (termId) => {
  try {
    selectedTermId.value = termId; // Update the selectedTermId
    const response = await $fetch(`/api/todo?termId=${termId}`);
    if (response.result && response.result.data) {
      todos.value = response.result.data;
    } else {
      todos.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch Todos:', error);
  }
};

// Function to add a new Todo
const addNewTodo = async () => {
  // Ensure there's a selected Term and a new task description
  if (!selectedTermId.value || !newTaskDescription.value) {
    return;
  }

  // Fetch the existing Todos for the selected termId
  const existingTodos = todos.value.filter((todo) => todo.termId === selectedTermId.value);

  // Calculate the next order value for the new Todo
  const nextOrder = existingTodos.length > 0 ? Math.max(...existingTodos.map((todo) => todo.order)) + 1 : 0;

  const response = await $fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify({
      order: nextOrder,
      taskDescription: newTaskDescription.value,
      taskDone: false, // Set the default value for taskDone if needed
      termId: selectedTermId.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });


  if (response.result) {
    newTaskDescription.value = ''; // Clear the input field after adding
    fetchTodos(selectedTermId.value); // Fetch the updated list of Todos
  } else {
    // Handle error if needed
  }
};

// Function to update the Todo check status
const updateTodoCheck = async (todoId, taskDone) => {
  const response = await $fetch('/api/todo', {
    method: 'PUT',
    body: JSON.stringify({
      id: todoId,
      taskDone: taskDone,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.result) {
    fetchTodos(selectedTermId.value); // Fetch the updated list of Todos
  } else {
    // Handle error if needed
  }
};

// Function to delete a Todo
const deleteTodo = async (todoId) => {
  const response = await $fetch('/api/todo', {
    method: 'DELETE',
    body: JSON.stringify({ id: todoId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.result) {
    fetchTodos(selectedTermId.value); // Fetch the updated list of Todos
  } else {
    // Handle error if needed
  }
};

const deleteTodosByTermId = async (termId) => {
  const response = await $fetch('/api/todo', {
    method: 'DELETE',
    body: JSON.stringify({ termId: termId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.result) {
    fetchTodos(selectedTermId.value); // Fetch the updated list of Todos
  } else {
    // Handle error if needed
  }
};

// Function to move Todo up in order
const moveTodoUp = async (todoId) => {
  const todoIndex = todos.value.findIndex((todo) => todo._id === todoId);

  // Check if the Todo exists and is not the first one in the list
  if (todoIndex > 0) {
    // Swap the order value with the previous Todo
    const tempOrder = todos.value[todoIndex].order;
    todos.value[todoIndex].order = todos.value[todoIndex - 1].order;
    todos.value[todoIndex - 1].order = tempOrder;

    // Update the order values in the database
    try {
      await Promise.all([
        updateTodoOrderInDB(todos.value[todoIndex]),
        updateTodoOrderInDB(todos.value[todoIndex - 1]),
      ]);

      // Fetch the updated list of Todos
      fetchTodos(selectedTermId.value);
    } catch (error) {
      console.error('Failed to move Todo up:', error);
    }
  }
};

// Function to move Todo down in order
const moveTodoDown = async (todoId) => {
  const todoIndex = todos.value.findIndex((todo) => todo._id === todoId);

  // Check if the Todo exists and is not the last one in the list
  if (todoIndex < todos.value.length - 1 && todoIndex >= 0) {
    // Swap the order value with the next Todo
    const tempOrder = todos.value[todoIndex].order;
    todos.value[todoIndex].order = todos.value[todoIndex + 1].order;
    todos.value[todoIndex + 1].order = tempOrder;

    // Update the order values in the database
    try {
      await Promise.all([
        updateTodoOrderInDB(todos.value[todoIndex]),
        updateTodoOrderInDB(todos.value[todoIndex + 1]),
      ]);

      // Fetch the updated list of Todos
      fetchTodos(selectedTermId.value);
    } catch (error) {
      console.error('Failed to move Todo down:', error);
    }
  }
};


// Helper function to update the Todo's order in the database
const updateTodoOrderInDB = async (todo) => {
  try {
    await $fetch('/api/todo', {
      method: 'PUT',
      body: JSON.stringify({
        id: todo._id,
        order: todo.order,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to update Todo order in DB:', error);
    throw error;
  }
};


// Fetch Time Terms on component mount
onMounted(fetchTimeTerms);

</script>

<template>
  <MainBody>
    <template v-slot:h1>Todo List</template>
    <div class="flex flex-col md:flex-row justify-evenly items-center w-full pb-4 space-x-0 md:space-x-12 space-y-12 md:space-y-0">     
      <!-- Term Module -->
      <div class="w-2/3 md:w-1/3 min-h-72 max-h-96 h-72 text-gray-900 flex flex-col justify-start items-center">
        <span class="px-4 text-gray-900 drop-shadow-md border-b-2 border-b-gray-800 w-full text-center">Time Terms</span>
        <div class="w-full h-full overflow-y-scroll px-1">
          <div v-if="timeTerms && timeTerms.length > 0" v-for="timeTerm in timeTerms" :key="timeTerm._id" :class="['text-gray-900 flex flex-row justify-start items-center', timeTerm._id === selectedTermId ? 'bg-gray-200' : 'bg-gray-100']" @click="fetchTodos(timeTerm._id)">
            <!-- +REGLER CA JE VEUX QUE SA TRANSLATE QUAND C'EST SELECTIONNER-->
            <span :class="['flex-1 text-xl duration-200', timeTerm._id === selectedTermId ? 'translate-x-4 font-medium tracking-wider' : '']">{{ timeTerm.termDescription }}</span>
            <!-- AU DESSUS @-->
            <div class="w-1/6 flex flex-row justify-evenly items-center h-12 z-10">
              <button @click="deleteTimeTerm(timeTerm._id)" :class="[' w-full text-red-500 text-xl h-full', timeTerm._id === selectedTermId ? 'hover:bg-gray-300' : 'hover:bg-gray-200']">X</button>
            </div>
          </div>
            <p v-else class="flex flex-col justify-center items-center h-full text-gray-900">No time terms found</p>
        </div>
        <div class="flex flex-row justify-start w-full">
          <input v-model="newTermDescription" maxlength="32" type="text" name="newterm" id="newterm" class="w-full bg-gray-100 h-12 outline-none text-4xl border-t-2 border-t-gray-800">
          <button @click="addNewTimeTerm" type="button" class="w-12 px-2 text-gray-900 drop-shadow-md hover:bg-gray-200 border-t-2 border-t-gray-800 text-2xl hover:text-4xl duration-500">+</button>
        </div>
      </div>
      <!-- Term Module End -->
      
      <!-- Task Module -->
        <div class="w-2/3 md:w-1/3 min-h-72 max-h-96 h-72 flex flex-col justify-start items-center">
          <span class="px-2 text-gray-900 drop-shadow-md border-b-2 border-b-gray-800 w-full text-center">Tasks</span>
          <div class="w-full h-full overflow-y-scroll px-1">
            <!-- Fetch Todos (Tasks) based on the selectedTermId -->
            <div v-if="todos && todos.length > 0" v-for="todo in todos" :key="todo._id" class="text-gray-900 flex flex-row justify-start items-center bg-gray-100 hover:bg-gray-200 h-12">
              <div class="py-1 px-2">
                <input type="checkbox" :checked="todo.taskDone" @change="updateTodoCheck(todo._id, !todo.taskDone)" class="p-1">
              </div>
              <span class="flex-1 text-xl overflow-x-scroll">{{ todo.taskDescription }}</span>
              <div class="w-1/4 flex flex-row justify-evenly items-center">
                <button @click="moveTodoUp(todo._id)" class=""><Icon name="uil:arrow-up" size="1.8em" class="text-gray-900 hover:bg-gray-300"/></button>
                <button @click="moveTodoDown(todo._id)" class=""><Icon name="uil:arrow-down" size="1.8em" class="text-gray-900 hover:bg-gray-300"/></button>
                <button @click="deleteTodo(todo._id)" class="font-medium w-full text-red-600 text-xl hover:bg-gray-300">X</button>
              </div>
            </div>
            <p v-else class="flex flex-col justify-center items-center h-full text-gray-900">No tasks found</p>
            <!-- Fetch Todos (Tasks) based on the selectedTermId -->
          </div>
          <div class="flex flex-row justify-start w-full">
            <input v-model="newTaskDescription" type="text" name="newtask" id="newtask" class="w-full bg-gray-100 h-12 outline-none text-4xl border-t-2 border-t-gray-800">
            <button @click="addNewTodo" type="button" class="w-12 px-2 text-gray-900 drop-shadow-md hover:bg-gray-200 border-t-2 border-t-gray-800 text-2xl hover:text-4xl duration-500">+</button>
          </div>
        </div>
        <!-- Task Module End -->

    </div>
  </MainBody>
</template>