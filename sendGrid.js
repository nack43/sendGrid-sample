require('dotenv').config();
const fs = require('fs');
const ejs = require('ejs');
const sgMail = require('@sendgrid/mail');

const renderAndSaveHtml = async () => {
  const html = await ejs.renderFile('template.ejs', { title: "This is a sample email", cid: "cid:skytree" })
  fs.writeFileSync('sample.html', html);
}

const sendEmail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'xxx@xxx.xxx',
    from: 'test@test.com',
    subject: 'This is sample mail',
    html: fs.readFileSync('sample.html', 'utf-8'),
    attachments: [
      {
        filename: 'skytree',          
        type: 'image/jpeg',
        content_id: 'skytree',
        content: fs.readFileSync('skytree.jpg', { encoding: 'base64'}),
        disposition: 'inline',
      }
    ],
  };

  sgMail.send(msg);
}

const main = async () => {
  await renderAndSaveHtml();
  sendEmail();
}

main();
