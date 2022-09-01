exports.handler = async function (event) {
  const { name } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${name} !` }),
  };
};
