import Typography from "../atoms/Typography";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: "👨‍💻",
      title: "IT Experts as Trainers",
      description:
        "Learning a technology with a professional who is well-expertise in that solves 60% of your needs.",
    },
    {
      icon: "🛠️",
      title: "Fully Hands-on Training",
      description:
        "We support any training with more practical classes. So, we always prefer to give hands-on training.",
    },
    {
      icon: "⏰",
      title: "Flexible Timings",
      description:
        "We started with 2 trainers; now we are 100+, and it's still increasing. So, we can give the students flexibility.",
    },
    {
      icon: "💰",
      title: "Affordable Fees",
      description:
        "We are dead cheap in fees. Quality training with less price is our goal.",
    },
    {
      icon: "🖥️",
      title: "Lab Support",
      description:
        "If you need software assistance, we are here to back you up. Bring your issues, and we’ll help you solve them.",
    },
    {
      icon: "📝",
      title: "Interview Preparation",
      description:
        "Every course is covered with interview point questions and real-time scenarios of what the company may look for from you.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8  px-6 md:px-32">
      <Typography variant="h2" className="text-center mb-4">
        Why <span className="text-primary">Choose Us?</span>
      </Typography>
      <Typography variant="p" className="text-center mb-8 text-gray-600">
        A choice that makes a big difference in your career. We are committed to
        helping you reach your goals and enhance your training experience by
        providing innovative surroundings and facilities.
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{reason.icon}</div>
            <Typography variant="h5" className="mb-2 text-gray-800">
              {reason.title}
            </Typography>
            <Typography variant="p" className="text-gray-600">
              {reason.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
