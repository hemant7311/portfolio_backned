// Minimal dynamic data for backend API

const Bio = {
  name: "Hemant Rathore",
  roles: [
    "Full Stack Developer",
    "Digital Marketer",
    "App Developer",
    "Shopify Specialist",
  ],
  description:
    "Hi, I'm Hemant Rathore. I'm a Full Stack Developer and Digital Marketer based in Noida. I build websites, web applications, mobile apps and Shopify stores.",
  github: "https://github.com/hemant7311",
  resume: "https://drive.google.com/file/d/1NBwQhw4-ghwc3B1r_U6ce1DLoykAVn1H/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/hemant-rathore-developer/",
  twitter: "https://twitter.com/hemantrathore",
  insta: "https://www.instagram.com/buildbyhemant/",
  facebook: "https://www.facebook.com/profile.php?id=61593364824396",
};

// Import the projects array directly from the frontend constants file is not reliable in Node.
// So we define the projects array here based on the existing frontend data.
const projects = [
  {
    id: 0,
    title: "BlazeStore E-commerce Website",
    date: "2025",
    description:
      "A modern e-commerce website with responsive UI, product listings, and smooth user experience.",
    image:
      "https://ebz-static.s3.ap-south-1.amazonaws.com/easebuzz-static/upi-credit-cards-v1.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap","Node.js","Express","MongoDB" ],
    category: "web app",
    github: "",
    webapp: "https://www.blazestore.in/",
  },
  {
    id: 1,
    title: "Spice Arena Product Website",
    date: "2025",
    description:
      "Dynamic product showcase website with structured layout and product detail pages.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    category: "web app",
    github: "",
    webapp: "https://www.thespicearena.com/product.php",
  },
  {
    id: 2,
    title: "Flekso Clothing Website",
    date: "2025",
    description:
      "A stylish clothing brand website focused on oversized t-shirts with modern UI and responsive design.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "Express", "MongoDB"],
    category: "web app",
    github: "",
    webapp: "",
  },
  {
    id: 3,
    title: "Learnex Course Platform",
    date: "2025",
    description:
      "Online learning platform with categorized courses including development, AI, and design.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    tags: ["React", "Node.js", "MongoDB"],
    category: "web app",
    github: "",
    webapp: "",
  },
  {
    id: 4,
    title: "Sarkari Courses Portal",
    date: "2025",
    description:
      "Educational portal providing government exam courses and study materials.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "web app",
    github: "",
    webapp: "",
  },
  {
    id: 5,
    title: "UI/UX Design Projects",
    date: "2025",
    description:
      "Collection of modern UI/UX designs including mobile apps, websites, and dashboards.",
    image:
      "https://img.magnific.com/free-vector/gradient-dark-mode-app-template_52683-118059.jpg?semt=ais_hybrid&w=740&q=80",
    tags: ["Figma", "UI Design", "UX Research"],
    category: "UI/UX Designer",
    github: "",
    webapp: "",
  },
  {
    id: 6,
    title: "Learnex E-learning Mobile App",
    date: "2025",
    description:
      "Developed a full-featured Android e-learning app using Flutter with Firebase backend. Features include course streaming, authentication, bookmarking, and progress tracking.",
    image:
      "https://miro.medium.com/v2/resize:fit:1200/1*oWuYxFyG23uxFBKyXUNFOQ.jpeg",
    tags: ["Flutter", "Dart", "Firebase", "UI/UX"],
    category: "android app",
    github: "",
    webapp: "",
  },
];
module.exports = { Bio, projects };