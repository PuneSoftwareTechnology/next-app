import { IoCall } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import { ReactElement } from "react";
import Link from "next/link";

type ContactButton = {
  href: string;
  icon: ReactElement;
  bgColor: string;
  ariaLabel: string;
};

const contactButtons: ContactButton[] = [
  {
    href: "tel:+919175599880",
    icon: <IoCall size={30} />,
    bgColor: "bg-blue-600",
    ariaLabel: "Call Us",
  },
  {
    href: "https://wa.me/9175599880",
    icon: <SiWhatsapp size={30} />,
    bgColor: "bg-green-500",
    ariaLabel: "Message us on WhatsApp",
  },
];

const ContactButtons = () => {
  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-center space-y-2 md:space-y-4">
      {contactButtons.map((button, index) => (
        <Link
          key={index}
          href={button.href}
          className={`group ${button.bgColor} text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110 hover:opacity-80 relative`}
          aria-label={button.ariaLabel}
        >
          {button.icon}
        </Link>
      ))}
    </div>
  );
};

export default ContactButtons;
