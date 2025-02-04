import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear().toString()} Lekan </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/sportynest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent-foreground transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

