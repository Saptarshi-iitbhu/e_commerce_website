// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 border-t">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          
          {/* Brand Info */}
          <div>
            <Link to={"/"} className="bold-22 uppercase font-paci">
              Shopper <span className="text-secondary bold-28">.</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Discover stylish clothing and shoes online, crafted for comfort
              and quality. Shop fashion-forward designs that elevate your look
              and fit every lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link to="/collection" className="hover:text-gray-900">Best Sellers</Link></li>
              <li><Link to="/offers" className="hover:text-gray-900">Offers & Deals</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-gray-900">FAQs</Link></li>
            </ul>
          </div>

          {/* Need Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/delivery" className="hover:text-gray-900">Delivery Information</Link></li>
              <li><Link to="/returns" className="hover:text-gray-900">Return & Refund Policy</Link></li>
              <li><Link to="/payments" className="hover:text-gray-900">Payment Methods</Link></li>
              <li><Link to="/track" className="hover:text-gray-900">Track your Order</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://instagram.com" className="hover:text-gray-900">Instagram</a></li>
              <li><a href="https://twitter.com" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="https://facebook.com" className="hover:text-gray-900">Facebook</a></li>
              <li><a href="https://youtube.com" className="hover:text-gray-900">YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t pt-6 text-center text-sm text-gray-500">
          Copyright © {new Date().getFullYear()} Saptarshi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
