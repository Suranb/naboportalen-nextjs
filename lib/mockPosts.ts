export const mockPosts = [
  {
    id: 1,
    author: "Styret",
    content: "Styret har lagt ut dokumentene for årets generalforsamling.",
    image: undefined,
    comments: [],
  },
  {
    id: 2,
    author: "Ola Nordmann",
    content: "Hei, er det noen som kan hjelpe med å bytte sikring i kjelleren?",
    image: undefined,
    comments: [
      { id: 1, author: "Kari", content: "Ja, vi brukte Hansen Elektro." },
    ],
  },
  {
    id: 3,
    author: "Styret",
    content: "Velkommen til nytt beboermøte neste uke!",
    image: "/images/meeting-placeholder.jpg", // example image path
    comments: [],
  },
];

export const mockSubdomainData = {
  name: "Sørenga Borettslag",
  description: "Et hyggelig nabolag ved sjøen.",
  aboutUrl: "https://example.com/om-sorenga",
  bannerImage: "https://placehold.co/1200x300?text=Sørenga",
  posts: mockPosts,
};
