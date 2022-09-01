const MailChimp = require("mailchimp-api-v3");
const md5 = require("md5");

const api_key = "";
const list_id = "";

const mailchimp = new MailChimp(api_key);

const validateEmail = email => {
  if (typeof email !== "string") return false;

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

exports.handler = async function (event) {
  const { email } = JSON.parse(event.body);

  if (!validateEmail(email)) {
    const message = `Le mail ${email} n'est pas valid. Veuillez réessayer.`;

    return {
      statusCode: 500,
      body: JSON.stringify({ message })
    };
  }

  const hash = md5(email);
  await mailchimp.put(`/lists/${list_id}/members/${hash}`, {
    email_address: email,
    status: "subscribed",
  });

  const message = `Le mail ${email} a été ajouté avec succès.`
  return {
    statusCode: 200,
    body: JSON.stringify({ message })
  }
};
