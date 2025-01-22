/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Avatar from "react-avatar";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_USER_ID = "YOUR_USER_ID";

interface FormData {
	name: string;
	email: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	message: Yup.string().required("Message is required"),
});

const ContactUs: React.FC = () => {
	const [formData, setFormData] = useState<FormData | any>({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData: any) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors({});

		try {
			await validationSchema.validate(formData, { abortEarly: false });
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				formData,
				EMAILJS_USER_ID
			);
			setIsSubmitted(true);
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const newErrors: FormErrors | any = {};
				error.inner.forEach((err) => {
					if (err.path) newErrors[err.path] = err.message;
				});
				setErrors(newErrors);
			} else {
				console.error("Error sending email:", error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8  p-10 rounded-xl shadow-lg bg-black/10">
				<div className="text-center">
					<Avatar name="Contact Us" size="80" round className="mx-auto" />
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Contact Us
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						We'd love to hear from you!
					</p>
				</div>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">
						<div className="flex items-center mb-4">
							<Avatar
								name={formData.name || "Name"}
								size="40"
								round
								className="mr-4"
							/>
							<div className="flex-grow">
								<label htmlFor="name" className="sr-only">
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									value={formData.name}
									onChange={handleChange}
									className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Name"
								/>
								{errors.name && (
									<div className="text-red-500 text-xs mt-1">{errors.name}</div>
								)}
							</div>
						</div>
						<div className="flex items-center mb-4">
							<Avatar
								email={formData.email || "email@example.com"}
								size="40"
								round
								className="mr-4"
							/>
							<div className="flex-grow">
								<label htmlFor="email" className="sr-only">
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Email address"
								/>
								{errors.email && (
									<div className="text-red-500 text-xs mt-1">
										{errors.email}
									</div>
								)}
							</div>
						</div>
						<div>
							<label htmlFor="message" className="sr-only">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Your message"
								rows={4}
							/>
							{errors.message && (
								<div className="text-red-500 text-xs mt-1">
									{errors.message}
								</div>
							)}
						</div>
					</div>
					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition duration-150 ease-in-out"
						>
							{isSubmitting ? "Sending..." : "Send Message"}
						</button>
					</div>
				</form>
				{isSubmitted && (
					<div className="mt-4 text-center text-green-600 bg-green-100 p-3 rounded-lg">
						Thank you for your message. We'll get back to you soon!
					</div>
				)}
			</div>
		</div>
	);
};

export default ContactUs;
