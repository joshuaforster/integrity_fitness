import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

export const metadata = {
  title: "Contact | Integrity Fitness Education",
};

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
