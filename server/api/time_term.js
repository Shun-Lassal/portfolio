import connectDB from '../../db';
import timeTermSchema from '@@/models/time_term';

export default defineEventHandler(async (e) => {
  const method = e.node.req.method;

  switch (method) {
    case 'GET':
      const queryParams = new URLSearchParams(e.node.req.url.split('?')[1]);
      const termId = queryParams.get('termId');
      const timeTerms = termId ? await getAllTimeTerms({ termId }) : await getAllTimeTerms();
      return sendJsonResponse(e, { result: timeTerms });

    case 'POST':
      const body = await readBody(e);
      const result = await createTimeTerm(body);
      return sendJsonResponse(e, { result });

    case 'DELETE':
      const deleteBody = await readBody(e);
      const deleteResult = await deleteTimeTerm(deleteBody);
      return sendJsonResponse(e, { result: deleteResult });

    default:
      return sendJsonResponse(e, { error: 'Invalid method.' });
  }
});

//?termId=""
async function getAllTimeTerms(filter = {}) {
  try {
    const connection = await connectDB();
    const TimeTermModel = connection.model('Time_Term', timeTermSchema);
    console.log('[DB] Getting Time Terms');
    const timeTerms = await TimeTermModel.find(filter).sort({ taskDescription: 1 });
    console.log(JSON.stringify(timeTerms));
    return { data: timeTerms };
  } catch (err) {
    console.log('[DB] Fetch Time Terms failed: ', err);
    return { error: 'Failed to fetch Time Terms.' };
  }
}

async function createTimeTerm(body) {
  try {
    const connection = await connectDB();
    const TimeTermModel = connection.model('Time_Term', timeTermSchema);

    // Find the maximum termOrder among existing TimeTerm documents
    const maxTermOrder = await TimeTermModel.findOne().sort({ termOrder: -1 }).select('termOrder').lean();
    let newTermOrder = 1;

    if (maxTermOrder && !isNaN(maxTermOrder.termOrder)) {
      newTermOrder = maxTermOrder.termOrder + 1;
    }

    // Add the newTermOrder to the body
    const newTimeTermData = { ...body, termOrder: newTermOrder };

    await TimeTermModel.create(newTimeTermData);
    console.log('[DB] New Time Term created!');
    return { message: 'Time Term created successfully.' };
  } catch (err) {
    console.log('[DB] New Time Term creation failed: ', err);
    return { error: 'Failed to create Time Term.' };
  }
}

async function deleteTimeTerm(body) {
  try {
    const connection = await connectDB();
    const TimeTermModel = connection.model('Time_Term', timeTermSchema);
    await TimeTermModel.findByIdAndDelete(body.termId);
    console.log('[DB] Time Term Deleted!');
    return { message: 'Time Term deleted successfully.' };
  } catch (err) {
    console.log('[DB] Delete Time Term failed: ', err);
    return { error: 'Failed to delete Time Term.' };
  }
}

function sendJsonResponse(e, data) {
  const jsonResponse = JSON.stringify(data);
  e.node.res.setHeader('Content-Type', 'application/json');
  e.node.res.end(jsonResponse);
}
