const respondJSON = (request, response, status, object, acceptedTypes) => {
  response.writeHead(status, { 'Content-Type': acceptedTypes });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
    if(acceptedTypes[0] ==='text/xml'){
        let responseXML = "<response>";
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 200, responseXML,acceptedTypes[0]);
    };
    const string = JSON.stringify(responseJSON)
  respondJSON(request, response, 200, string, acceptedTypes[0]);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  
  if (!params.valid || params.valid !== 'true') { 
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    if(acceptedTypes[0] === 'text/xml'){
        let responseXML = "<response>";
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 400, responseXML,acceptedTypes[0]);
    }
    const string = JSON.stringify(responseJSON)
    return respondJSON(request, response, 400, string, acceptedTypes[0]);
  }
    
    if(acceptedTypes[0] === 'text/xml'){
        let responseXML = "<response>";
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 200, responseXML,acceptedTypes[0]);
    }
  const string = JSON.stringify(responseJSON)
  return respondJSON(request, response, 200, string, acceptedTypes[0]);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON, acceptedTypes);
  }
  return respondJSON(request, response, 200, responseJSON,acceptedTypes);
};
const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  respondJSON(request, response, 403, responseJSON, acceptedTypes);
};
const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  respondJSON(request, response, 500, responseJSON, acceptedTypes);
};
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not yet been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  respondJSON(request, response, 501, responseJSON,acceptedTypes);
};
const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON, acceptedTypes);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
