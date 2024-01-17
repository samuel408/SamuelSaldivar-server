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
  apiKey: process.env.OPENAI_API_KEY,
});



app.post('/chat', async (req, res) => {

  
  const prompt = "you need to pitch samuel to this potential employer whatever the employer asks relate it to his resume in brief:University of California, Merced | B.S Computer Science and Engineering | Expected: May 2024 Relevant Coursework: Advanced Programming, Data Structures, Computer Organization, Algorithm Design, Calculus, Discrete Math, Statistics, Linear Algebra, Physics, Database Systems, Software Engineering, Full Stack Web Development, Human-computer Interaction, Spatial Analysis. EXPERIENCE Software Engineering Intern | Sweep, Merced, CA | August 2023 - December 2023 Full Stack Software Engineer and Team Lead. Led the development of a sophisticated large language model (LLM) for PDF parsing and response generation. Utilized Python, Flask, HTML, JavaScript, and CSS for backend and user interface development. Demonstrated effective leadership and prompt engineering to fine-tune the AI model for project-specific needs. Full-stack Engineering Boot-camp | University of California, Berkeley, CA | December 2020 - May 2021 Completed UC Berkeley Extension Full Stack Bootcamp. Mastered frontend and backend development with expertise in HTML, CSS, JavaScript, React, Node.js, and database management. Developed server-side applications using Express.js, applying Agile methodologies and web security best practices. PROJECTS Tech Daily | Merced, CA Interactive platform similar to Reddit with user profiles, posts, discussions, and upvoting. Efficient SQL-backed infrastructure for seamless user experience. Covid Tracker | Berkeley, CA Developed COVID-19 Tracker app with Chart API and News API integration. User-friendly interface displaying the latest news and interactive charts. Weather Report | Merced, CA Designed and developed a Weather app using weather APIs. Implemented color-coded UV index feature and search history functionality. LEADERSHIP Sigma Chi Fraternity | Merced, CA | Lambda Delta Chapter Tribune and Alumni Chair, efficiently managing updates for alumni and international fraternity. Active in the outreach committee, providing constructive feedback and honing organizational skills. Coordinated chapter events and external communications, developing strong organizational, communication, and time management abilities. SKILLS Programming: Python, JavaScript, Java, C/C++, HTML/CSS, React.js, Node.js, Flask, Express.js, MySQL, SQLite3, MongoDB, Bootstrap. Software: Visual Studio Code, Pycharm, Docker, Github, Excel." + req.body;

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
