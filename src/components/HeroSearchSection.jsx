import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaMapMarkerAlt, FaTimes, FaStore, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const HeroSearchSection = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Tuy Hoa, Phu Yen");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const navigate = useNavigate();
  
  const { products } = useSelector((state) => state.products);

  // Remove Vietnamese tones
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const normalizedSearch = removeVietnameseTones(searchTerm.toLowerCase());
    const productName = removeVietnameseTones(product.productName.toLowerCase());
    const categoryName = removeVietnameseTones(product.categoryName.toLowerCase());
    return productName.includes(normalizedSearch) || categoryName.includes(normalizedSearch);
  });

  // Handle shop marker click
  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setLocation(shop.name);
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleProductClick = (productID) => {
    navigate(`/product/${productID}/productAbout`);
    setShowSuggestions(false);
    setSearchTerm("");
  };



  return (
    <div className="relative bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white py-20 px-4 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
            {t('search.heroTitle')}
          </h1>
          <p className="text-xl text-purple-200">
            {t('search.heroSubtitle')}
          </p>
        </div>

        {/* Search Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Product Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder={t('search.search_for_products')}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyPress={handleKeyPress}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-14 pr-4 py-4 text-gray-900 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>

              {/* Product Suggestions Dropdown */}
              {showSuggestions && searchTerm && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <div
                      key={product.productID}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex items-center gap-4 transition-colors"
                      onClick={() => handleProductClick(product.productID)}
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{product.productName}</h4>
                        <p className="text-purple-600 font-semibold">
                          {parseFloat(product.price).toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Selector - Ecommerce 2025 */}
            <div className="relative md:w-96">
              <div className="group relative">
                {/* Icon with gradient background */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                
                {/* Badge indicator */}
                <div className="absolute left-11 top-2 z-20 px-2 py-0.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                  OPEN
                </div>

                <button
                  onClick={() => setShowLocationPicker(!showLocationPicker)}
                  className="w-full pl-16 pr-12 py-4 text-gray-900 text-base font-medium rounded-xl border-2 border-gray-200 hover:border-purple-500 focus:border-purple-600 focus:outline-none cursor-pointer transition-all bg-gradient-to-r from-white to-purple-50/20 hover:from-purple-50/30 hover:to-purple-100/40 shadow-md hover:shadow-xl group relative overflow-hidden"
                >
                  <span className="block text-left">
                    <span className="text-xs text-purple-600 font-semibold uppercase tracking-wide block mb-1">
                      📍 Pickup Location
                    </span>
                    <span className="text-gray-900 font-bold truncate block">
                      {location}
                    </span>
                  </span>

                  {/* Dropdown arrow */}
                  <svg 
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600 transition-transform duration-300 ${showLocationPicker ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              <FaSearch />
              <span className="hidden sm:inline">{t('search.search')}</span>
            </button>
          </div>

          {/* Location Picker Modal with Real Map */}
          {showLocationPicker && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-28 animate-fadeIn">
              <div className="bg-gradient-to-br from-black via-gray-900 to-purple-950 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30">
                {/* Header - Modern 2025 Design */}
                <div className="relative bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white p-8 overflow-hidden">
                  {/* Animated Background Effects */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-800 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon with glassmorphism */}
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                        <FaStore className="text-3xl text-purple-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-black mb-1 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
                          Store Locator 2025
                        </h3>
                        <p className="text-purple-300 text-sm font-medium flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Find your nearest premium store
                        </p>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setShowLocationPicker(false);
                        setSelectedShop(null);
                      }}
                      className="group w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-red-500/50 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <FaTimes className="text-2xl text-white group-hover:text-red-400 group-hover:rotate-90 transition-all duration-300" />
                    </button>
                  </div>
                </div>

                {/* Location Access Bar - Modern 2025 */}
                <div className="relative bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-purple-900/50 backdrop-blur-xl border-y border-purple-500/20 p-5">
                  <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <FaMapMarkerAlt className="text-white text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base mb-1">{t('search.share_your_location')}</h4>
                        <p className="text-purple-300 text-sm">{t('search.well_find_the_nearest')}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              alert(`Your location: ${position.coords.latitude}, ${position.coords.longitude}`);
                            },
                            (error) => {
                              alert('Unable to get your location. Please select a store manually.');
                            }
                          );
                        }
                      }}
                      className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white rounded-2xl font-bold text-base transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-purple-500/50 flex items-center gap-3"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <svg className="relative z-10 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="relative z-10">{t('search.use_my_location')}</span>
                      <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Store Locator 2025 - Modern Design */}
                <div className="relative" style={{ height: '500px' }}>
                  {selectedShop ? (
                    // Selected Shop - Premium Card Design 2025 with Scroll
                    <div className="relative w-full h-full bg-gradient-to-br from-black via-gray-900 to-purple-950 overflow-y-auto overflow-x-hidden">
                      {/* Custom Scrollbar Style */}
                      <style>{`
                        .shop-detail-container::-webkit-scrollbar {
                          width: 8px;
                        }
                        .shop-detail-container::-webkit-scrollbar-track {
                          background: rgba(0, 0, 0, 0.3);
                          border-radius: 10px;
                        }
                        .shop-detail-container::-webkit-scrollbar-thumb {
                          background: linear-gradient(to bottom, #9333ea, #7c3aed);
                          border-radius: 10px;
                        }
                        .shop-detail-container::-webkit-scrollbar-thumb:hover {
                          background: linear-gradient(to bottom, #a855f7, #9333ea);
                        }
                      `}</style>

                      {/* Glassmorphism Background Effects */}
                      <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                      </div>

                      {/* Grid Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                      }}></div>

                      {/* Scrollable Content */}
                      <div className="shop-detail-container relative z-10 min-h-full flex items-center justify-center p-6 py-12">
                        <div className="max-w-3xl w-full">
                          {/* Glassmorphism Card */}
                          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                            {/* Header - Đồng bộ với header chính */}
                            <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 p-8 text-white text-center relative overflow-hidden">
                              {/* Animated shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                              
                              <div className="relative z-10">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-6">
                                  <FaStore className="text-4xl drop-shadow-lg" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
                                  {selectedShop.name}
                                </h3>
                                <p className="text-purple-300 text-lg flex items-center justify-center gap-2">
                                  <FaMapMarkerAlt className="animate-bounce" />
                                  {selectedShop.city}
                                </p>
                              </div>
                            </div>

                            {/* Body - Glassmorphism Style 2025 */}
                            <div className="p-8 space-y-6">
                              {/* Info Cards */}
                              <div className="space-y-4">
                                {/* Address Card */}
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                  <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                      <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">{t('common.address')}</h4>
                                      <p className="text-purple-200 leading-relaxed">{selectedShop.address}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Phone Card */}
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                  <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                      <FaPhone className="text-white text-xl" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">{t('common.phone')}</h4>
                                      <p className="text-purple-200 text-lg font-semibold">{selectedShop.phone}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons - 2025 Style */}
                              <div className="grid grid-cols-1 gap-4 pt-4">
                                {/* Google Maps Button */}
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedShop.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group relative overflow-hidden flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  <FaMapMarkerAlt className="relative z-10 text-2xl group-hover:animate-bounce" />
                                  <span className="relative z-10">{t('search.m_google_maps')}</span>
                                  <svg className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                </a>

                                {/* Select Store Button */}
                                <button
                                  onClick={() => {
                                    setLocation(selectedShop.city);
                                    setShowLocationPicker(false);
                                    setSelectedShop(null);
                                  }}
                                  className="group relative overflow-hidden flex items-center justify-center gap-3 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                                >
                                  <FaStore className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                                  <span>{t('search.chn_ca_hng_ny')}</span>
                                </button>

                                {/* Back Button */}
                                <button
                                  onClick={() => setSelectedShop(null)}
                                  className="flex items-center justify-center gap-2 py-3 text-white/70 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/5"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                  </svg>
                                  Quay lại danh sách
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Vietnam Badge - 2025 */}
                          <div className="mt-6 text-center animate-fadeIn">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 rounded-full px-8 py-4 shadow-2xl border-4 border-yellow-400/30">
                              <span className="text-3xl animate-pulse">{t('search.unknown')}</span>
                              <span className="font-bold text-white text-lg tracking-wide">{t('search.made_in_vietnam')}</span>
                              <span className="text-3xl animate-pulse">{t('search.unknown')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Store List - Modern Dark Theme 2025
                    <div className="relative w-full h-full bg-gradient-to-br from-black via-gray-900 to-purple-950 overflow-y-auto">
                      {/* Glassmorphism Background Effects */}
                      <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>

                      {/* Grid Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                      }}></div>

                      {/* Content */}
                      <div className="relative z-10 p-6 md:p-8">
                        <div className="max-w-7xl mx-auto">
                          {/* Header - 2025 Style */}
                          <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center gap-4 mb-6 animate-fadeIn">
                              <div className="text-6xl animate-bounce">{t('search.unknown')}</div>
                              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
                                Our Store Locations
                              </h3>
                              <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🏪</div>
                            </div>
                            <p className="text-purple-300 text-lg md:text-xl font-medium mb-4">{t('search.click_on_any_store')}</p>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-purple-200 text-sm font-semibold">{t('search.5_premium_locations_across')}</span>
                            </div>
                          </div>

                          {/* Store Cards Grid - 2025 Glassmorphism */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {shopLocations.map((shop, index) => (
                              <div
                                key={shop.id}
                                onClick={() => setSelectedShop(shop)}
                                className="group bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                {/* Card Header - Glassmorphism */}
                                <div className="relative bg-gradient-to-br from-purple-600/80 via-purple-700/80 to-purple-800/80 backdrop-blur-xl p-5 overflow-hidden">
                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                  
                                  <div className="relative flex items-center gap-3">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                      <FaStore className="text-white text-2xl" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-black text-xl text-white leading-tight">{shop.city}</h4>
                                      <p className="text-purple-200 text-xs font-semibold mt-1 tracking-wider uppercase">{t('search.premium_store')}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Card Body - Glassmorphism */}
                                <div className="p-6">
                                  <h5 className="font-bold text-white text-lg mb-4 group-hover:text-purple-300 transition-colors">
                                    {shop.name}
                                  </h5>
                                  
                                  <div className="space-y-3 mb-5">
                                    {/* Address */}
                                    <div className="flex items-start gap-3 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                                      <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0 text-base" />
                                      <span className="line-clamp-2 leading-relaxed">{shop.address}</span>
                                    </div>
                                    {/* Phone */}
                                    <div className="flex items-center gap-3 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                                      <FaPhone className="text-purple-400 flex-shrink-0 text-base" />
                                      <span className="font-semibold">{shop.phone}</span>
                                    </div>
                                  </div>

                                  {/* View Button - Premium 2025 */}
                                  <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-purple-500/50 transition-all duration-500 flex items-center justify-center gap-3 group-hover:scale-105 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <FaMapMarkerAlt className="relative z-10 text-lg group-hover:animate-bounce" />
                                    <span className="relative z-10">{t('search.view_details')}</span>
                                    <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Vietnam Pride Banner - 2025 */}
                          <div className="mt-12 relative">
                            {/* Main Banner */}
                            <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 rounded-3xl p-8 text-white text-center shadow-2xl border-4 border-yellow-400/50 backdrop-blur-xl relative overflow-hidden">
                              {/* Animated background */}
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 opacity-0 hover:opacity-30 transition-opacity duration-1000"></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
                                  <span className="text-5xl animate-pulse">{t('search.unknown')}</span>
                                  <p className="font-black text-2xl md:text-3xl tracking-wide">{t('search.made_in_vietnam')}</p>
                                  <span className="text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>{t('search.unknown')}</span>
                                </div>
                                <div className="w-24 h-1 bg-yellow-300 mx-auto mb-4 rounded-full"></div>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                  <FaStore className="text-3xl animate-bounce" />
                                  <p className="font-bold text-lg md:text-xl">
                                    Proudly Serving 5 Premium Locations Across Vietnam
                                  </p>
                                  <FaStore className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }} />
                                </div>
                              </div>
                            </div>

                            {/* Tech Info Card */}
                            <div className="mt-6 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-xl">
                              <div className="text-center space-y-3">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <p className="text-purple-300 text-sm font-bold uppercase tracking-widest">{t('search.system_status')}</p>
                                </div>
                                <p className="text-purple-200 text-base">
                                  🗺️ Map Service: <span className="font-bold text-white">{t('search.google_maps')}</span> <span className="text-purple-400">{t('search.vietnamese')}</span>
                                </p>
                                <div className="pt-3 border-t border-white/10">
                                  <p className="text-purple-300/70 text-sm">
                                    💡 Alternative: <span className="text-purple-300 font-semibold">{t('search.vietbando_vietmapvn')}</span> • <span className="text-purple-300 font-semibold">{t('search.gomapvn')}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Store Info Panel */}
                {selectedShop && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-t-2 border-purple-200 animate-fadeIn">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FaStore className="text-white text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedShop.name}</h4>
                            <p className="text-gray-700 text-sm mb-2 flex items-start gap-2">
                              <FaMapMarkerAlt className="text-purple-600 mt-1 flex-shrink-0" />
                              <span>{selectedShop.address}</span>
                            </p>
                            <p className="text-gray-700 text-sm flex items-center gap-2 mb-4">
                              <FaPhone className="text-purple-600" />
                              {selectedShop.phone}
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setLocation(selectedShop.city);
                                  setShowLocationPicker(false);
                                  setSelectedShop(null);
                                }}
                                className="flex-1 py-3 bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                              >
                                Select This Store
                              </button>
                              <button
                                onClick={() => setSelectedShop(null)}
                                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                              >{t('account.close')}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Store List */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 max-h-64 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <FaStore className="text-purple-600 text-xl" />
                    <h4 className="font-bold text-gray-900 text-lg">{t('search.all_store_locations')}</h4>
                    <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {shopLocations.length} Stores
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shopLocations.map((shop) => (
                      <div
                        key={shop.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] shadow-sm hover:shadow-lg ${
                          selectedShop?.id === shop.id
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-blue-50/50'
                        }`}
                        onClick={() => handleShopClick(shop)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="font-bold text-gray-900 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                              <FaStore className="text-white text-lg" />
                            </div>
                            <span className="text-base">{shop.name}</span>
                          </h5>
                          {selectedShop?.id === shop.id && (
                            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">{t('admin.selected')}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 flex items-start gap-2 ml-1">
                          <FaMapMarkerAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>{shop.address}</span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mb-3 ml-1">
                          <FaPhone className="text-purple-500" />
                          {shop.phone}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(shop.name);
                            setShowLocationPicker(false);
                            setSelectedShop(null);
                          }}
                          className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg text-sm font-semibold transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                        >
                          Select This Store
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Category Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CategoryChip label={t('common.laptops')} onClick={() => navigate("/products?search=laptop")} />
          <CategoryChip label={t('search.gaming_gear')} onClick={() => navigate("/products?search=gaming")} />
          <CategoryChip label={t('search.pc_parts')} onClick={() => navigate("/products?search=cpu")} />
          <CategoryChip label={t('search.monitors')} onClick={() => navigate("/products?search=screen")} />
          <CategoryChip label={t('search.accessories')} onClick={() => navigate("/products?search=mouse")} />
        </div>
      </div>
    </div>
  );
};

const CategoryChip = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full transition-all hover:scale-105"
  >
    {label}
  </button>
);

export default HeroSearchSection;

// Updated: 2025-10-12T16:06:24.737Z

// Updated: 2025-10-12T16:08:52.729Z
