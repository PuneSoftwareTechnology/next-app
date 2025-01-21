import Typography from "../atoms/Typography";

const Courses = () => {
  const courses = [
    {
      name: "SAP Training",
      description: "15 Courses",
      icon: "🖥️", // Replace with an actual icon or image URL
    },
    {
      name: "Cloud Technologies",
      description: "10 Courses",
      icon: "☁️", // Replace with an actual icon or image URL
    },
    {
      name: "Data Analytics Certification",
      description: "20 Courses",
      icon: "📊", // Replace with an actual icon or image URL
    },
    {
      name: "AI and Machine Learning",
      description: "8 Courses",
      icon: "🤖", // Replace with an actual icon or image URL
    },
    {
      name: "Cyber Security",
      description: "12 Courses",
      icon: "🔒", // Replace with an actual icon or image URL
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 px-6 md:px-32">
      <Typography variant="h2" className="text-center mb-6">
        Choose your <span className="text-primary">area of interest</span>
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-center bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-8">
              <Typography variant="h5" className="mb-2 text-gray-800">
                {course.name}
              </Typography>
              <Typography variant="p" className="text-gray-600">
                {course.description}
              </Typography>
            </div>
            <div className="text-5xl mb-4 mt-8 ">{course.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
