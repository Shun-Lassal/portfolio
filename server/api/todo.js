import connectDB from '../../db';
import todoSchema from '@@/models/todo';

export default defineEventHandler(async (e) => {
  const method = e.node.req.method;

  if (method === 'GET') {
    const queryParams = new URLSearchParams(e.node.req.url.split('?')[1]);
    const termId = queryParams.get('termId');

    // Fetch Todos by termId if provided
    const todos = termId ? await getTodosByTermId(termId) : await getTodos();
    return sendJsonResponse(e, { result: todos });
  } else {
    const body = await readBody(e);
    const result = await handleRequest(method, body);
    return sendJsonResponse(e, { result });
  }

});

async function handleRequest(method, body) {
  switch (method) {
    case 'POST':
      return newTodo(body);

    case 'PUT':
      if (body.taskDone !== undefined) {
        return updateTodoCheck(body);
      } else if (body.order !== undefined) { // Check if the 'order' property is provided in the body
        return updateTodoOrder(body);
      }
      return { error: 'Invalid request for updating Todo.' };

    case 'DELETE':
      if(body.termId !== undefined)
      {
        return deleteTodosByTermId(body)
      }
      else if (body.id !== undefined)
      {
        return deleteTodo(body)
      }
      return { error: 'Invalid request for deleting Todo.' };

    default:
      return { error: 'Invalid method.' };
  }
}

async function getTodos() {
  try {
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    console.log('[DB] Getting Todos');
    const Todos = await TodoModel.find();
    console.log(JSON.stringify(Todos));
    return { data: Todos };
  } catch (err) {
    console.log('[DB] Fetch failed: ', err);
    return { error: 'Failed to fetch Todos.' };
  }
}

async function getTodosByTermId(termId) {
  try {
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    console.log('[DB] Getting Todos by TermId:', termId);
    const todos = await TodoModel.find({ termId }).sort({ order: 1 }); // Sort by order ascending
    console.log(JSON.stringify(todos));
    return { data: todos };
  } catch (err) {
    console.log('[DB] Fetch by TermId failed: ', err);
    return { error: 'Failed to fetch Todos by TermId.' };
  }
}

async function newTodo(body) {
  try {
    console.log(body.order);
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    await TodoModel.create({ order: body.order, taskDescription: body.taskDescription, taskDone: body.taskDone, termId: body.termId });
    console.log('[DB] new Todo created!');
    return { message: 'Todo created successfully.' };
  } catch (err) {
    console.log('[DB] new Todo Failed: ', err);
    return { error: 'Failed to create Todo.' };
  }
}

async function updateTodoOrder(body) {
  try {
    console.log(body);
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    await TodoModel.findByIdAndUpdate(body.id, { order: body.order });
    return { message: 'Todo Order updated successfully.' };
  } catch (err) {
    console.log('[DB] Update Todo Order Failed: ', err);
    return { error: 'Failed to update Todo Order.' };
  }
}

async function updateTodoCheck(body) {
  try {
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    await TodoModel.findByIdAndUpdate(body.id, { taskDone: body.taskDone });
    return { message: 'Todo Check updated successfully.' };
  } catch (err) {
    console.log('[DB] Update Todo Check Failed: ', err);
    return { error: 'Failed to update Todo Check.' };
  }
}

async function deleteTodo(body) {
  try {
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    await TodoModel.findByIdAndDelete(body.id);
    console.log('[DB] Todo Deleted!');
    return { message: 'Todo deleted successfully.' };
  } catch (err) {
    console.log('[DB] Delete Todo Failed: ', err);
    return { error: 'Failed to delete Todo.' };
  }
}

async function deleteTodosByTermId(body) {
  try {
    const connection = await connectDB();
    const TodoModel = connection.model('Todo', todoSchema);
    await TodoModel.deleteMany({termId: body.termId});
    console.log('[DB] Todos Deleted!');
    return { message: 'Todos deleted successfully.' };
  } catch (err) {
    console.log('[DB] Delete Todo Failed: ', err);
    return { error: 'Failed to delete Todo.' };
  }
}

function sendJsonResponse(e, data) {
  const jsonResponse = JSON.stringify(data);
  e.node.res.setHeader('Content-Type', 'application/json');
  e.node.res.end(jsonResponse);
}
