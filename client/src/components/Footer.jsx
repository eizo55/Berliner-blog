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
import { BsFacebook, BsInstagram, BsTwitch, BsTwitterX } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-purple-800">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="  mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-primary-500 to-pink-500 rounded-lg text-white">
                Berlin auf English
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
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Berlin auf English
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
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Berlin auf English
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
            by="Berlin Auf English Blog"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-6  mt-4 sm:justify-center">
          <FooterIcon href="#" icon={BsFacebook} />
          <FooterIcon href="#" icon={BsInstagram} />
          <FooterIcon href="#" icon={BsTwitterX} />
          <FooterIcon href="#" icon={BsTwitch} />
        </div>
      </div>
    </Footer>
  );
}
