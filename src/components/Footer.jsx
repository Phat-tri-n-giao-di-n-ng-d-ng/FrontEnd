import React from "react";

import logo_facebook from "../assets/images/logo/logo_facebook_footer.svg";
import logo_instagram from "../assets/images/logo/logo_insta_footer.svg";

import logo1 from "../assets/images/logo/logo_paypal_footer.svg";
import logo2 from "../assets/images/logo/logo_visa_footer.svg";
import logo3 from "../assets/images/logo/logo_maestro_footer.svg";
import logo4 from "../assets/images/logo/logo_discover_footer.svg";
import logo5 from "../assets/images/logo/logo_american-express_footer.svg";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-purple-950 text-gray-300 py-12 px-4 border-t-2 border-purple-800">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12 text-center flex justify-between items-center">
          <div className="text-start">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mb-6 text-purple-200">
              {t('footer.newsletter.subtitle')}
            </p>
          </div>
          <div className="flex justify-center gap-4 h-12">
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              className="px-4 py-2 w-80 rounded-lg focus:outline-none text-white bg-gray-800 border-2 border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-400"
            />
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-6 py-2 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105">
              {t('footer.newsletter.subscribe')}
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.information.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.aboutZip')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.privatePolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.search')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.ordersReturns')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.contactUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.advancedSearch')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.newsletter')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.pcParts.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.cpus')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.addOnCards')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.hardDrives')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.graphicCards')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.keyboardsMice')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.casesPowerCooling')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.ram')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.software')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.speakersHeadsets')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.motherboards')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.desktopPCs.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.cpus')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.customPCs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.servers')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.msiAllInOne')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.hpCompaq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.asusPCs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.tecsPCs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.laptops.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.everydayUse')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.msiWorkstation')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.msiPrestige')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.tabletsPads')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.netbooks')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.infinityGaming')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.address.title')}</h4>
            <address className="not-italic">
              <p className="mb-2">
                {t('footer.address.street')}
              </p>
              <p className="mb-2">
                {t('footer.address.phone')} <span className="text-purple-400 font-semibold">{t('footer.address.phoneNumber')}</span>
              </p>
              <p className="mb-2">{t('footer.address.openHours')}</p>
              <ul
                className="list-disc list-inside mb-4"
                style={{ listStyleType: "none" }}
              >
                <li>{t('footer.address.mondayThursday')}</li>
                <li>{t('footer.address.friday')}</li>
                <li>{t('footer.address.saturday')}</li>
              </ul>
              <p>
                {t('footer.address.email')} <span className="text-purple-400 font-semibold">{t('footer.address.emailAddress')}</span>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex gap-4">
              <img src={logo_facebook} alt={t('remaining.facebook')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
              <img src={logo_instagram} alt={t('remaining.instagram')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
            </div>

            {/* Payment Icons */}
            <div className="flex gap-4">
              <img src={logo1} alt={t('remaining.paypal')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
              <img src={logo2} alt={t('remaining.visa')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
              <img src={logo3} alt={t('remaining.maestro')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
              <img src={logo4} alt={t('remaining.discover')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
              <img src={logo5} alt={t('remaining.american_express')} className="h-6 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100" />
            </div>

            {/* Copyright Text */}
            <div>
              <p className="text-purple-300">{t('footer.copyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Updated: 2025-10-12T16:06:44.847Z

// Updated: 2025-10-12T16:08:44.838Z
