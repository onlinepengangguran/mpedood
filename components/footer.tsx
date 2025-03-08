import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import config from "@/config/default/config.json"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerCopyright = config.footer_copyright
    .replace("%year%", currentYear.toString())
    .replace("%site_name%", config.site_name)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{config.site_name}</h3>
            <p className="text-secondary mb-4">{config.site_tagline}</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link href="/">Home</Link>
              </li>
              <li className="footer-link">
                <Link href="/page/about">About</Link>
              </li>
              <li className="footer-link">
                <Link href="/page/contact">Contact</Link>
              </li>
              <li className="footer-link">
                <Link href="/page/dmca">DMCA</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Disclaimer</h3>
            <p className="text-sm text-secondary">
              All content on this website is for informational purposes only. We do not store any files on our server.
              All contents are provided by non-affiliated third parties.
            </p>
            <div className="mt-4 flex items-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:contact@example.com">contact@example.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p dangerouslySetInnerHTML={{ __html: footerCopyright }} />
          <p className="mt-2">
            Design by{" "}
            <a href="#" className="text-primary-color hover:underline">
              Modern Web Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

