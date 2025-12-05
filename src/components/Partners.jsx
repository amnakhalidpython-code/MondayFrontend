import React from "react";

const partners = [
  { name: "HoltCatBlack", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/Holt.png" },
  { name: "Universal Music Group", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/universal.png" },
  { name: "Coca Cola", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/cocacola.png" },
  { name: "Lionsgate", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/lionsgate.png" },
  { name: "Carrefour", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/carrefour.png" },
  { name: "BD", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/bd.png" },
  { name: "Glossier", src: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Logos_black/glossier.png" },
];

const Partners = () => {
  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-xl md:text-xl font-normal mb-12">
          Trusted by over 60% of the Fortune 500
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img
                src={partner.src}
                alt={partner.name}
                className="max-h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
