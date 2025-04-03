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
      icon: "💰",
      title: "Affordable Fees",
      description:
        "We are dead cheap in fees. Quality training with less price is our goal.",
    },

    {
      icon: "📝",
      title: "Interview Preparation",
      description:
        "Every course is covered with interview point questions and real-time scenarios of what the company may look for from you.",
    },
  ];

  return (
    <section
      className=" lg:px-32 px-4 py-8 bg-gray-200"
      aria-label="Pune Software Technologies Why Choose Us Section"
    >
      <Typography variant="h2" as="h2" className="text-center mb-4">
        Why <span className="text-blue-700">Choose Us?</span>
      </Typography>
      <Typography variant="h5" as="h5" className="lg:hidden text-center block ">
        Choose us for a career-transforming learning experience with expert IT
        trainers, hands-on practical training, flexible timings, and affordable
        fees. We provide comprehensive lab support and interview preparation,
        ensuring you gain real-world skills and confidence to excel in your
        field.
      </Typography>
      <Typography
        variant="h4"
        as="h4"
        className="text-center  hidden lg:block mb-8 mx-2 lg:mx-16 text-gray-600"
      >
        A choice that makes a big difference in your career. We are committed to
        helping you reach your goals by providing practical training in latest IT technologies.
      </Typography>
      <div className="grid lg:grid-cols-4 gap-12 hidden lg:grid ">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex flex-col border-2 bg-white hover:scale-105 hover:shadow-xl items-center text-center border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{reason.icon}</div>
            <Typography variant="h5" as="h5" className="mb-2 text-gray-800">
              {reason.title}
            </Typography>
            <Typography variant="p" as="p" className="text-gray-600 ">
              {reason.description}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
