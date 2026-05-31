export type TestimonialItem = {
  name: string;
  body: string;
  date?: string;
  subtitle?: string;
  photo?: string; // e.g. "/images/testimonials/grace-sandford.jpg"
};

export const testimonials: readonly TestimonialItem[] = [
  {
    name: "Grace Sandford",
    // photo: "/images/testimonials/grace-sandford.jpg",
    body: "I am a fairly new client/student at Integrity Fitness Education but I already feel so well supported. The information I need is easily accessible and support sessions are also available when needed. It works well as I am able to study alongside work and I'm excited about the progress that I've made so far already and that's all thanks to Harry and Paris. If you are looking to get your level 2 & 3 qualifications, I couldn't recommend them enough!",
    subtitle: "Recent Student",
  },
  {
    name: "Charlie Wade",
    // photo: "/images/testimonials/charlie-wade.jpg",
    body: "When it comes to tutoring you expect a top standard that not only delivers academic results but also people management for getting them through the course on what's bespoke for the student. Integrity fitness education does that amazingly and goes beyond that. Harry and Paris have only been an essential part of my education. I cannot thank the team enough. Without this company I wouldn't be doing so well in my PT business.",
    subtitle: "PT Business Owner",
  },
  {
    name: "Viktoria Fitt",
    // photo: "/images/testimonials/viktoria-fitt.jpg",
    body: "I recently gained my Level 3 Personal Trainer qualification with Integrity Fitness Education, and couldn't recommend them more. Throughout the entire course I felt completely supported and was provided with a wealth of additional resources.",
    subtitle: "Level 3 Graduate",
  },
  {
    name: "Megan Brown",
    // photo: "/images/testimonials/megan-brown.jpg",
    body: "Highly recommend Integrity Fitness to gain your qualification of becoming a personal trainer, through to additional qualifications to better yourself and what you can offer as a PT. Harry and Paris offer fantastic knowledge and support throughout and provide a genuine service. Highly recommend them!",
    subtitle: "Alumni Coach",
  },
  {
    name: "Poppy Hawkins",
    // photo: "/images/testimonials/poppy-hawkins.jpg",
    body: "Both Paris and Harry were amazing when it came to helping me to complete my Level 3 Personal Training qualification. They always made sure to answer any questions I had and made an effort to reach out and speak to me one on one about my progress.",
    subtitle: "Level 3 Graduate",
  },
  {
    name: "Aine Kuzeviciute",
    // photo: "/images/testimonials/aine-kuzeviciute.jpg",
    body: "Integrity Fitness Education have been brilliant. The content they provide has an incredible amount of information, the videos which help fill out the coursework and get ready for practical exams are also incredibly helpful. All the content is exceptional.",
    subtitle: "Course Student",
  },
  {
    name: "Sandrine Modesti",
    // photo: "/images/testimonials/sandrine-modesti.jpg",
    body: "Really enjoying the course! Paris and Harry are both friendly, very knowledgeable, obviously love what they do, and are great at sharing their passion for the benefits of exercise and Personal Training. The course material is well structured.",
    subtitle: "Current Student",
  },
  {
    name: "Hannah Lev",
    // photo: "/images/testimonials/hannah-lev.jpg",
    body: "Amazing experience! Both Paris and Harry have been super helpful throughout the whole course! They allowed me to go at my pace as I had a time frame before moving country and they were excellent in making sure I was able to achieve that!",
    subtitle: "Level 3 Graduate",
  },
];
