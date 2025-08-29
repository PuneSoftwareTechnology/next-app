"use client";
import React, { useRef, useState, useEffect } from "react";
import Typography from "../atoms/Typography";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/util/interfaces/blog";
import ERROR_IMAGE from "../../assests/images/imageError.png";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface BlogsProps {
  blogs: Blog[];
}

const BlogsPage: React.FC<BlogsProps> = ({ blogs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Check if scrollable
  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkScroll(); // initial check
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [blogs]);

  // Scroll function
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.7; // scroll 70% of visible area
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative mx-auto px-4 lg:px-32 py-8"
      aria-labelledby="blogs-heading"
    >
      <Typography
        id="blogs-heading"
        variant="h2"
        as="h2"
        className="text-center mb-6"
      >
        Read More About Technology
      </Typography>

      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md 
             bg-gradient-to-r from-blue-300 to-blue-100 hover:from-blue-500 hover:to-blue-200 lg:ml-20"
          aria-label="Scroll left"
        >
          <HiChevronLeft className="w-8 h-8 text-gray-600" />
        </button>
      )}

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md 
             bg-gradient-to-l from-blue-300 to-blue-100 hover:from-blue-500 hover:to-blue-200 lg:mr-20"
          aria-label="Scroll right"
        >
          <HiChevronRight className="w-8 h-8 text-gray-600" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory no-scrollbar"
        role="list"
        aria-label="Latest technology blogs"
      >
        {blogs.map((blog: Blog, index: number) => (
          <article
            key={index}
            role="listitem"
            className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform snap-start"
          >
            <Link
              href={`/blog/${blog.slug}`}
              aria-label={`Read blog: ${blog.title}`}
              className="flex flex-col h-full"
            >
              <Image
                src={blog?.featured_image || ERROR_IMAGE}
                alt={
                  blog.title
                    ? `Thumbnail for blog: ${blog.title}`
                    : "Blog image"
                }
                height={160}
                width={280}
                className="rounded-t-lg object-cover w-full h-40"
                priority={index < 2}
              />
              <div className="flex flex-col justify-between flex-1">
                <Typography
                  variant="h5"
                  as="h3"
                  className="m-4 text-left text-gray-800 line-clamp-2"
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="p"
                  as="p"
                  className="text-gray-600 px-4 pb-4 line-clamp-3"
                >
                  {blog.introduction && blog.introduction.length > 100
                    ? blog.introduction.slice(0, 100) + "..."
                    : blog.introduction}
                </Typography>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/all-blogs"
          className="bg-blue-600 w-fit text-white rounded-md px-6 py-3 hover:bg-blue-700 transition"
          aria-label="Read all blogs from Pune Software Technologies"
        >
          <Typography variant="h5" as="h3" className="text-white">
            Read All Blogs
          </Typography>
        </Link>
      </div>
    </section>
  );
};

export default BlogsPage;
