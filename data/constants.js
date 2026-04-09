// Minimal dynamic data for backend API

const Bio = {
  name: "Hemant Rathore",
  roles: [
    "Full Stack Developer",
    "Android Developer",
    "UI/UX Designer",
    "Programmer",
  ],
  description:
    "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  github: "https://github.com/rishavchanda",
  resume:
    "https://drive.google.com/file/d/1ffZrcMcn8UatXGIaautbbqpV7ADNaETA/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/hemant-rathore-developer/",
  twitter: "https://twitter.com/RishavChanda",
  insta: "https://www.instagram.com/rishav_chanda/",
  facebook: "https://www.facebook.com/rishav.chanda.165/",
};

// Import the projects array directly from the frontend constants file is not reliable in Node.
// So we define the projects array here based on the existing frontend data.
const projects = [
  {
    id: 0,
    title: "Tesla Clone",
    date: "Jun 2023 - Jul 2023",
    description:
      "Tesla landing page clone using React and Styled Components.",
    image:
      "https://user-images.githubusercontent.com/64485885/234916413-96296f13-fe4b-4cc4-b215-e72bd7c27928.png",
    tags: ["React Js", "Styled Components"],
    category: "web app",
    github: "https://github.com/rishavchanda/Tesla-Clone-React",
    webapp: "https://tesla-react-clone.netlify.app/",
  },
  {
    id: 1,
    title: "Vexa",
    date: "Oct 2022 - Present",
    description:
      "Project management app with task tracking, team collaboration, and time tracking.",
    image:
      "https://user-images.githubusercontent.com/64485885/234916413-96296f13-fe4b-4cc4-b215-e72bd7c27928.png",
    tags: ["React Js", "MongoDb", "Node Js", "Express Js", "Redux", "NodeMailer"],
    category: "web app",
    github: "https://github.com/rishavchanda/Project-Management-App",
    webapp: "https://vexa-app.netlify.app/",
  },
  {
    id: 2,
    title: "Brain Tumor Detection",
    date: "Jan 2023 - Mar 2023",
    description:
      "Deep learning project to detect brain tumors using CNN models.",
    image:
      "https://user-images.githubusercontent.com/64485885/255237090-cf798a2c-1b41-4bb7-b904-b5353a1f08e8.png",
    tags: ["Python", "Keras", "TensorFlow"],
    category: "machine learning",
    github: "https://github.com/rishavchanda/Brain-Tumor-Detection",
    webapp: "https://github.com/rishavchanda/Brain-Tumor-Detection",
  },
  {
    id: 10,
    title: "Job Finding App",
    date: "Jun 2023 - Jul 2023",
    description:
      "React Native app to search jobs using an external API.",
    image:
      "https://user-images.githubusercontent.com/64485885/255237090-cf798a2c-1b41-4bb7-b904-b5353a1f08e8.png",
    tags: ["React Native", "JavaScript", "Axios"],
    category: "android app",
    github: "https://github.com/rishavchanda/Job-finder-App",
    webapp: "https://github.com/rishavchanda/Job-finder-App",
  },
];

module.exports = { Bio, projects };