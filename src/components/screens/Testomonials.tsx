import { FC } from "react";
import Typography from "../atoms/Typography";

const testimonials = [
  {
    name: "Ankita Chitranshu",
    review:
      "I highly recommend training here. The instructor is passionate and dedicated, very descriptive and detail oriented. The course is easy to follow. All relevant tools were provided.",
  },
  {
    name: "Madhuri Pathak",
    review:
      "I am currently learning SAP (FICO). I would love to recommend this institute for its structured way for teaching and engaging students in implementing real-time use case scenarios. Our trainer, Rakesh sir, his teaching techniques are very effective.",
  },
  {
    name: "Kiran Deshmukh",
    review:
      "I am currently learning SAP BW/4HANA, and the training experience has been exceptional. The faculty is highly experienced and incredibly supportive, always available to clear any doubts I have. I appreciate the real-time, hands-on approach in the course.",
  },
  {
    name: "Pratham Dongre",
    review:
      "Mr. Rakesh Sir's SAP FICO course was a great learning experience. The instructor's knowledge and expertise were evident in the way they explained complex concepts in a clear and concise manner. The hands-on exercises provided valuable practical experience.",
  },
  {
    name: "Pooja Sonawane",
    review:
      "I recently completed SAP FICO course in Tech Concept Hub and it was amazing experience. Rakesh Sir's way of teaching techniques is excellent and deeply supportive. He gives knowledge of theoretical as well as practical in an easy-to-understand way.",
  },
];

const TestimonialsPage: FC = () => {
  return (
    <section
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Pune Software Technologies Testimonials Section"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Student Testimonials
      </h1>

      {/* Flexbox layout with responsive design */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-600"
          >
            <Typography variant="h3" as="h3" className="text-xl font-semibold">
              {testimonial.name}
            </Typography>
            <Typography variant="p" as="p" className="mt-4 text-gray-700">
              {testimonial.review}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPage;
