import React from "react";

const Footer = () => {
  const Links = [
    {
      title: "Useful links",
      links: [
        {
          name: "About us",
        },
        {
          name: "Events",
        },
        {
          name: "Blogs",
        },
        {
          name: "FAQ",
        },
      ],
    },
    {
      title: "Main Menu",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Offers",
          link: "#",
        },
        {
          name: "Menus",
          link: "#",
        },
        {
          name: "Reservation",
          link: "#",
        },
      ],
    },
    {
      title: "Contact Us",
      links: [
        {
          name: "example@email.com",
          link: "#",
        },
        {
          name: "+64 958 248 966",
          link: "#",
        },
        {
          name: "Social media",
          link: "#",
        },
      ],
    },
  ];
  return (
    <div className="container">
      <div className="footer-list p-8">
        <div className="">
          <img src="/images/logo.png" alt="" />
          <p className="text-grayText text-xl leading-normal mt-4">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </div>
        {Links.map((link, index) => (
          <div className="" key={index}>
            <h3 className="mb-5 text-2xl font-semibold">{link.title}</h3>
            <ul className="flex flex-col gap-5">
              {link.links.map((item, index) => (
                <li key={index}>
                  <a href="#">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
