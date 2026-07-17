export const initialCommunityPosts = [
  {
    id: "post-1",
    author: "Elena Rostova",
    authorTitle: "Lead Data Scientist (Former Returner)",
    content: "Just wanted to share that explaining my 2-year gap was not as scary as I thought it would be. I focused 100% on my recent coding projects and how those match the company requirements. You've got this, ladies! Keep your chin up.",
    category: "Success Stories",
    likes: 42,
    comments: [
      { id: "c-1-1", author: "Sarah Jenkins", content: "Absolutely agree! Confidence is half the battle. Be proud of the skills you acquired during the break.", date: "2026-07-15" },
      { id: "c-1-2", author: "Mary K.", content: "This is so encouraging. I'm preparing for my first interview next week and will use this advice.", date: "2026-07-16" }
    ],
    date: "2026-07-15",
    isLiked: false
  },
  {
    id: "post-2",
    author: "Grace Hopper",
    authorTitle: "Aspiring Frontend Developer",
    content: "What are some recommendations for learning React? I just completed HTML and JS basics, but hooks are feeling a bit overwhelming at first. Any beginner-friendly tutorials or courses?",
    category: "Skill Development",
    likes: 18,
    comments: [
      { id: "c-2-1", author: "Michelle Wong", content: "Highly recommend Scrimba's interactive React course. It allows you to pause the video and edit the code directly in the player!", date: "2026-07-14" },
      { id: "c-2-2", author: "Aisha N.", content: "Start by writing simple counters or todo apps. Building them from scratch makes useState click.", date: "2026-07-14" }
    ],
    date: "2026-07-14",
    isLiked: false
  },
  {
    id: "post-3",
    author: "Diana Prince",
    authorTitle: "Project Manager in Transition",
    content: "Does anyone have experience applying to returnships? Do they review resumes differently compared to standard corporate pipelines? I have a 5-year break and want to put my best foot forward.",
    category: "Career Advice",
    likes: 29,
    comments: [
      { id: "c-3-1", author: "Tanya Roberts", content: "Yes! Returnship programs are designed specifically to look past resume gaps. Focus on your transferrable leadership skills from volunteering or community work.", date: "2026-07-13" }
    ],
    date: "2026-07-13",
    isLiked: false
  }
];

export const communityCategories = [
  "Career Advice",
  "Interview Preparation",
  "Skill Development",
  "Success Stories",
  "General Discussion"
];
