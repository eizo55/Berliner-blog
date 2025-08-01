import {
  Footer,
  FooterLinkGroup,
  FooterTitle,
  FooterLink,
  FooterDivider,
  FooterCopyright,
  FooterIcon,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-5 border-purple-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="  mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-primary-500 to-pink-500 rounded-lg text-white">
                Berliner
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-3 sm:grid-cols-3 sm:gap-10 ">
            <div>
              {" "}
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Berliner
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              {" "}
              <FooterTitle title="Follow me" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://www.linkedin.com/in/abdulaziz-faham-690a17229/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </FooterLink>
                <FooterLink
                  href="https://github.com/eizo55"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterLink>
                <FooterLink
                  href="https://www.instagram.com/eizo5/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              {" "}
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div>
          <FooterCopyright
            href="#"
            by="Berliner Blog Abdulaziz Faham"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-6  mt-4 sm:justify-center">
          <FooterIcon
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/abdulaziz-faham-690a17229/"
            icon={BsLinkedin}
          />
          <FooterIcon
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/eizo55"
            icon={BsGithub}
          />
          <FooterIcon
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/eizo5/?hl=en"
            icon={BsInstagram}
          />
        </div>
      </div>
    </Footer>
  );
}
