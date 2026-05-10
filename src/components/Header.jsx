import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo1.svg";
import { FaSearch, FaShoppingCart, FaFacebookF } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import path from "../constant/path";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { fetchProducts } from "../utils/redux/fetchProductsSlice";
import { FaChevronDown } from "react-icons/fa";
import CartDropdown from "./CartDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
const Header = () => {
  const { t } = useTranslation();

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartDropdownRef = useRef(null);

  // Access UserContext
  const { user, logout, isCustomer, isManager, isEmployee } =
    useContext(UserContext);

  // Define navigate
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(":hover")) {
        setShowDropdown(false);
      }
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (action) => {
    console.log(`Selected action: ${action}`);
    setShowDropdown(false);
  };

  // Handle logout
  const handleLogoutConfirm = () => {
    logout(); // Call logout from UserContext
    setShowDropdown(false);
    // navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFormattedDate = () => {
    const days = [
      t('header.sunday'),
      t('header.monday'),
      t('header.tuesday'),
      t('header.wednesday'),
      t('header.thursday'),
      t('header.friday'),
      t('header.saturday'),
    ];
    const months = [
      t('header.jan'),
      t('header.feb'),
      t('header.mar'),
      t('header.apr'),
      t('header.may'),
      t('header.jun'),
      t('header.jul'),
      t('header.aug'),
      t('header.sep'),
      t('header.oct'),
      t('header.nov'),
      t('header.dec'),
    ];

    const day = days[currentDateTime.getDay()];
    const date = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const formatTime = () => {
    let hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? t('common.pm') : t('common.am');
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleClickCart = () => {
    setShowCartDropdown(!showCartDropdown);
  };
  
  const handleCartMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleCartMouseLeave = () => {
    setTimeout(() => {
      if (cartDropdownRef.current && !cartDropdownRef.current.matches(":hover")) {
        setShowCartDropdown(false);
      }
    }, 100);
  };

  const cartQuantity = useSelector((state) => state.cart.carts.length);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Lấy danh sách sản phẩm từ Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  // Hàm loại bỏ dấu tiếng Việt
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm (theo productName và catalogName, không dấu)
  const filteredProducts = products.filter((product) => {
    const normalizedSearch = removeVietnameseTones(searchTerm.toLowerCase());
    const productName = removeVietnameseTones(
      product.productName.toLowerCase()
    );
    const catalogName = removeVietnameseTones(
      product.categoryName.toLowerCase()
    );

    return (
      productName.includes(normalizedSearch) ||
      catalogName.includes(normalizedSearch)
    );
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">{t('header.loading')}</div>
    );
  if (error) return <div className="text-red-500 p-4">{t('header.error')} {error}</div>;

  // Khi người dùng nhập
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowProductSuggestions(true); // bật dropdown
  };

  // Khi nhấn Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setShowProductSuggestions(false); // ẩn dropdown
    }
  };

  // Khi click sản phẩm
  const handleProductClick = (productID) => {
    navigate(`/product/${productID}/productAbout`);
    setShowProductSuggestions(false); // ẩn dropdown
  };

  // Khi click vào icon tìm kiếm
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${searchTerm}`);
      setShowProductSuggestions(false); // ẩn dropdown
    }
  };

  // Khi focus vào input tìm kiếm và text không rỗng
  const handleFocus = () => {
    if (searchTerm.trim() !== "") {
      setShowProductSuggestions(true); // bật dropdown
    }
  };
  // Khi blur khỏi input tìm kiếm
  const handleBlur = () => {
    setTimeout(() => {
      setShowProductSuggestions(false); // ẩn dropdown
    }, 100);
  };

  return (
    <header className={`font-sans fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "shadow-2xl shadow-purple-900/50" : ""
    }`}>
      {/* Top Bar - MODERN 2025 với Hiệu Ứng Slide Up + Blur */}
      <div className={`relative bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white text-xs flex justify-between items-center px-8 transition-all duration-700 ease-in-out overflow-hidden ${
        isScrolled 
          ? "py-0 h-0 opacity-0 -translate-y-full blur-sm scale-95" // 2025: Slide up + blur + scale
          : "py-2.5 h-auto opacity-100 translate-y-0 blur-0 scale-100" // Normal state
      }`}>
        {/* Animated background glow with pulse */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 animate-gradient"></div>
        
        {/* Shimmer effect - 2025 style */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
        
        {/* Date & Time - Enhanced với glass effect */}
        <div className="relative z-10 flex items-center gap-3 font-medium">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
            <span className="text-purple-300 animate-pulse">📅</span>
            <span className="font-bold text-white">{getFormattedDate()}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
            <span className="text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }}>🕐</span>
            <span className="font-mono font-bold text-white">{formatTime()}</span>
          </div>
        </div>

        {/* Store Location - Enhanced with glow */}
        <div className="relative z-10 flex items-center gap-2 text-sm group">
          <span className="text-purple-200 group-hover:scale-110 transition-transform duration-300">📍</span>
          <span className="text-white/90">{t('header.visitShop')}</span>
          <span className="font-bold text-white bg-gradient-to-r from-white to-purple-300 bg-clip-text hover:from-purple-300 hover:to-white transition-all duration-300">{t('header.shopAddress')}</span>
          <span className="text-purple-300 mx-2">|</span>
          <Link
            to="/contact"
            className="group/link flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
          >
            <span className="font-semibold text-purple-200 group-hover/link:text-white">{t('header.contactUs')}</span>
            <svg className="w-3 h-3 text-purple-300 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Contact Info - Enhanced with premium glow */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 group">
            <span className="text-purple-300 group-hover:scale-110 transition-transform duration-300">📞</span>
            <span className="text-white/90">{t('header.call')}</span>
            <strong className="text-white font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text">{t('header.inContactUs')}</strong>
          </div>
          <div className="w-9 h-9 bg-white/10 hover:bg-purple-600 backdrop-blur-md rounded-lg border border-white/20 hover:border-purple-400 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-purple-500/50 group">
            <FaFacebookF className="text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Modern 2025 Ecommerce */}
      <div className={`relative bg-gradient-to-r from-black via-gray-900 to-purple-950 border-b border-purple-700/50 transition-all duration-500 backdrop-blur-xl ${
        isScrolled ? "py-2 shadow-lg" : "py-4"
      }`}>
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        
        {/* Container: 3-column layout - Logo | Menu Center | Icons */}
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-3 items-center">
          
          {/* LEFT: Logo */}
          <div className="flex items-center justify-start">
            {/* Logo - Enhanced with glow */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img src={logo} alt={t('remaining.logo')} className={`relative rounded-xl transition-all duration-500 ${
                isScrolled ? "h-9" : "h-12"
              } group-hover:scale-105`} />
            </div>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="relative z-20 flex justify-center">
          <ul className="flex gap-6 text-sm font-semibold text-white whitespace-nowrap">
            {/* Home */}
            <li className="group relative">
              <Link to={path.home} className="flex items-center gap-1.5 hover:text-purple-400 transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.home')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </li>

            {/* MEGA DROPDOWN - All Products */}
            <li className="relative group">
              <div className="flex items-center gap-1.5 hover:text-purple-400 cursor-pointer transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.products')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <FaChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Mega Dropdown - Wide with Categories - Centered */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[800px] z-20 invisible group-hover:visible transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                
                {/* Grid Layout for Categories */}
                <div className="grid grid-cols-4 gap-6">
                  
                  {/* Column 1: Laptops */}
                  <div>
                    <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                      <span>💻</span> <span className="text-white">{t('categories.laptops')}</span>
                    </h3>
                    <a href="/products?search=laptop" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.allLaptops')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>

                  {/* Column 2: Gaming Gear */}
                  <div>
                    <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                      <span>🎮</span> <span className="text-white">{t('categories.gamingGear')}</span>
                    </h3>
                    <a href="/products?search=mouse" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.mouse')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=BanPhim" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.keyboard')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=GamingGear" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.gameGear')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=Mousepad" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.mousePad')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=Headphone" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.headphone')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>

                  {/* Column 3: PC Parts */}
                  <div>
                    <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                      <span>🔧</span> <span className="text-white">{t('categories.pcParts')}</span>
                    </h3>
                    <a href="/products?search=screen" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.monitor')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=Case" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.case')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=CPU" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.cpu')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=Main" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.mainboard')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=PSU" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.psu')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=HDD" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.storage')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=RAM" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.ram')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>

                  {/* Column 4: Smart Devices */}
                  <div>
                    <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                      <span>📱</span> <span className="text-white">{t('categories.smartDevice')}</span>
                    </h3>
                    <a href="/products?search=iPhone" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.iphone')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=SamSung Galaxy" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.samsung')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=Xiaomi" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.xiaomi')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/products?search=iPad" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                      <span>{t('categories.ipad')}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>

                </div>
                </div>
              </div>
            </li>

            {/* Deals - HOT DEALS với badge */}
            <li className="group relative">
              <Link to="/deals" className="flex items-center gap-1.5 hover:text-purple-400 transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.deals')}
                  <span className="absolute -top-2 -right-8 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">{t('nav.hotBadge')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </li>

            {/* New Arrivals với badge NEW */}
            <li className="group relative">
              <Link to="/new-arrivals" className="flex items-center gap-1.5 hover:text-purple-400 transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.new')}
                  <span className="absolute -top-2 -right-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{t('nav.newBadge')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </li>

            {/* Brands Dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1.5 hover:text-purple-400 cursor-pointer transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.brands')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <FaChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Brands Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[350px] z-20 invisible group-hover:visible transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                
                <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                  <span className="text-white">{t('brands.topBrands')}</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <a href="/brands/msi" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>{t('remaining.msi')}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/brands/asus" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>{t('remaining.asus')}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/brands/razer" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>{t('remaining.razer')}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/brands/logitech" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>{t('remaining.logitech')}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/brands/corsair" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>{t('remaining.corsair')}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/brands/hp" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                    <span>HP</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
                
                <a href="/brands" className="block mt-3 text-center text-sm text-purple-600 hover:text-purple-900 font-semibold transition-colors">
                  {t('brands.viewAll')}
                </a>
                </div>
              </div>
            </li>

            {/* Blog */}
            <li className="group relative">
              <Link to="/blog" className="flex items-center gap-1.5 hover:text-purple-400 transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.blog')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </li>

            {/* Support Dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1.5 hover:text-purple-400 cursor-pointer transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.support')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <FaChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Support Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[280px] z-[60] invisible group-hover:visible transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                
                <h3 className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-3 bg-gradient-to-r from-purple-900 to-purple-950 px-3 py-2 rounded-lg">
                  <span className="text-white">{t('support.helpCenter')}</span>
                </h3>
                
                <Link to="/track-order" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.trackOrder')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                <Link to="/faq" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.faq')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                <Link to="/contact" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.contactUs')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                <Link to="/warranty" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.warranty')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                <Link to="/returns" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.returns')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                <Link to="/customer-service" className="group/item flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 rounded-lg transition-all">
                  <span>{t('support.customerService')}</span>
                  <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
              </div>
            </li>


          </ul>
          </nav>

          {/* RIGHT: Icons - Modern 2025 Ecommerce */}
          <div className="relative z-10 flex items-center justify-end gap-5">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Shopping Cart - Enhanced */}
            <div 
              className="relative group"
              ref={cartDropdownRef}
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <div className="relative w-11 h-11 bg-white/10 hover:bg-purple-600 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-400 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110">
                <FaShoppingCart
                  className="text-white text-lg group-hover:scale-110 transition-transform"
                  onClick={handleClickCart}
                />
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none shadow-lg animate-pulse border-2 border-white">
                    {cartQuantity}
                  </span>
                )}
              </div>
              <CartDropdown 
                isOpen={showCartDropdown} 
                onClose={() => setShowCartDropdown(false)}
              />
            </div>

            {/* User Account - Enhanced */}
            <div
              className="relative group"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-11 h-11 bg-white/10 hover:bg-purple-600 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-400 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110">
                <IoPersonCircle
                  className="text-2xl text-white group-hover:scale-110 transition-transform"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              </div>

            {showDropdown && (
              <div className="absolute right-0 w-72 mt-4 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10 overflow-hidden animate-fadeIn">
                {/* Dropdown arrow */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                
                {/* User Header - Màu như header chính */}
                <div className="relative p-5 bg-gradient-to-r from-black via-gray-900 to-purple-950 border-b border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {user ? "👤" : "🔐"}
                    </div>
                    <div>
                      <p className="text-sm text-white font-bold">
                        {user ? `${t('header.hello')}, ${user.fullName}` : t('header.welcomeBack')}
                      </p>
                      <p className="text-xs text-purple-300">
                        {user ? t('header.manageAccount') : t('header.pleaseLogin')}
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="py-2 bg-white">
                  {user ? (
                    <>
                      {/* Show profile link for customers */}
                      {isCustomer() && (
                        <li
                          className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                          onClick={() => handleMenuItemClick("profile")}
                        >
                          <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300">
                            <span className="font-medium">{t('account.myAccount')}</span>
                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </Link>
                        </li>
                      )}
                      {/* Show admin link for managers */}
                      {isManager() && (
                        <li
                          className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                          onClick={() => handleMenuItemClick("admin")}
                        >
                          <Link to="/admin" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300">
                            <span className="font-medium">{t('account.manage')}</span>
                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </Link>
                        </li>
                      )}
                      {/* Show employee link for employees */}
                      {isEmployee() && (
                        <li
                          className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                          onClick={() => handleMenuItemClick("employee")}
                        >
                          <Link to="/employee" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300">
                            <span className="font-medium">{t('account.staff')}</span>
                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </Link>
                        </li>
                      )}
                      <li
                        className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                        onClick={() => handleMenuItemClick("orders")}
                      >
                        <span className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300">
                          <span className="font-medium">{t('account.orders')}</span>
                          <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </li>

                      {/* Divider */}
                      <div className="my-2 mx-4 border-t border-gray-200"></div>

                      {/* Sign Out - Highlight quan trọng - giữ màu đỏ */}
                      <li
                        className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                        onClick={handleLogoutConfirm}
                      >
                        <span className="flex items-center gap-3 px-5 py-3 text-red-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 cursor-pointer transition-all duration-300 font-medium">
                          <span className="font-medium">{t('account.signOut')}</span>
                          <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </li>
                    </>
                  ) : (
                    <li
                      className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                      onClick={() => handleMenuItemClick("login")}
                    >
                      <Link
                        to="/login"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="flex items-center gap-3 px-5 py-3 text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300 font-bold"
                      >
                        <span className="font-bold">{t('account.loginRegister')}</span>
                        <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </li>
                  )}

                  {/* Divider */}
                  <div className="my-2 mx-4 border-t border-gray-200"></div>

                  <li
                    className="group/item mx-2 my-1 rounded-xl overflow-hidden"
                    onClick={() => handleMenuItemClick("help")}
                  >
                    <span className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-950 cursor-pointer transition-all duration-300">
                      <span className="font-medium">{t('account.helpCenter')}</span>
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </li>
                </ul>
              </div>
            )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

// Updated: 2025-10-12T16:06:43.565Z

// Updated: 2025-10-12T16:09:08.637Z
