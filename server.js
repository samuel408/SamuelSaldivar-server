const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const OpenAI = require("openai");
const app = express();
const port =  process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  }));

// open ai 

const openai = new OpenAI({
  apiKey: "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",
});
app.post('/chat', async (req, res) => {
  const prompt = "you need to pitch samuel to this potential employer whatever the employer asks relate it to his resume " + req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 150,
    temperature: 0,
  },);
  console.log(completion.choices[0].message.content);
  res.send(completion.choices[0].message.content);

});

//contact form
app.post("/", (req, res) => {
    console.log('Received a POST request to / from:', req.get('origin'));

  const { name, email, message } = req.body;

  // Use nodemailer to send an email
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'samuel14082023@outlook.com', // Your email address
      pass: 'Samuel408!', // Your Gmail password or App Password
    },
  });

  const mailOptions = {
    from: 'samuel14082023@outlook.com',
    to: 'samuelwebsiteemails@gmail.com', // The email address where you want to receive form submissions
    subject: 'New Website Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });

  res.json({ message: 'Form submitted successfully' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
