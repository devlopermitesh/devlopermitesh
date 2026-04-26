import { links } from "@/constant";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  website: string | undefined;
  comment: string;
}
const LetsTalk = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      website: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // basic frontend sanitization (avoid sending junk)
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        website: data.website?.trim() || "",
        comment: data.comment.trim(),
      };

      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to send message");
      }

      // optional success handling
      console.log("Success");
    } catch (error: any) {
      console.error("Error:", error.message || "Something went wrong");
    }
  };
  return (
    <section className="w-full h-auto  max-w-7xl flex flex-col md:flex-row items-start justify-around md:py-40 mx-auto ">
      {/* form field */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg flex flex-col gap-5 bg-white p-8 rounded-2xl "
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <input
            placeholder="Your name"
            className="w-full px-4 py-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            {...register("name", {
              required: "Your name is required",
              minLength: { value: 3, message: "Too short!" },
            })}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <input
            placeholder="Your email"
            className="w-full px-4 py-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            {...register("email", {
              validate: (value) => value.includes("@") || "Invalid email",
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="flex flex-col gap-1">
          <input
            placeholder="Your website (optional)"
            className="w-full px-4 py-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            {...register("website")}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <textarea
            rows={4}
            placeholder="Your message"
            className="w-full px-4 py-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
            {...register("comment", {
              required: "Comment is required",
              maxLength: { value: 400, message: "Too long!" },
            })}
          />
          {errors.comment && (
            <p className="text-xs text-red-500">{errors.comment.message}</p>
          )}
        </div>

        {/* Button + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Get in Touch"}
          </button>

          <div className="flex gap-3">
            {links.map(({ icon: Icon, url, site_name }) => (
              <a
                key={site_name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={site_name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow-sm transition hover:-translate-y-1 hover:bg-black hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </form>

      <div className="flex flex-col max-w-lg gap-6 text-center md:text-left order-first md:order-last">
        {/* Small intro */}
        <h2 className="text-xl md:text-3xl text-gray-700 leading-snug">
          <b>Let’s</b>{" "}
          <span className="text-white [-webkit-text-stroke:1px_black]">
            talk
          </span>{" "}
          <b>for</b>
        </h2>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Something Special
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
          I seek to push the limits of creativity to create high-engaging,
          user-friendly, and memorable interactive experiences.
        </p>

        {/* Email */}
        <p className="text-lg md:text-xl font-semibold text-black pt-2">
          miteshgehlot6@gmail.com
        </p>
      </div>
    </section>
  );
};
export default LetsTalk;
