"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import title from "@/../public/images/title_vector.png";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeTop from "@/components/motionEffect/FadeTop";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const ClientPartners = () => {
  const allPartners: Partner[] = [
    { id: 1, name: "CIBIL", logo: "/images/bob.png" },
    { id: 2, name: "CRIF", logo: "/images/hdfc.avif" },
    { id: 3, name: "Equifax", logo: "/images/r3.png" },
    { id: 4, name: "Experian", logo: "/images/r1.jpg" },
    { id: 5, name: "Bank 1", logo: "/images/r2.jpg" },
    { id: 6, name: "Bank 2", logo: "/images/r4.jpg" },
    { id: 7, name: "Bank 3", logo: "/images/r6.avif" },
    { id: 8, name: "Bank 4", logo: "/images/r7.avif" },
    { id: 9, name: "Bank 5", logo: "/images/r8.avif" },
    { id: 10, name: "Bank 6", logo: "/images/r9.png" },
    { id: 11, name: "Bank 7", logo: "/images/r10.png" },
    { id: 12, name: "Bank 8", logo: "/images/r11.jpg" },
    { id: 13, name: "Bank 9", logo: "/images/boi.png" },
    { id: 14, name: "Bank 10", logo: "/images/r12.png" },
    { id: 15, name: "Bank 11", logo: "/images/hdfc.avif" },
    { id: 16, name: "Bank 12", logo: "/images/boi.png" },
  ];

  const duplicateAndExtend = (array: Partner[]) => {
    return [...array, ...array, ...array];
  };

  // Create 3 rows with duplicated partners
  const rowsOfPartners = [
    duplicateAndExtend(allPartners.slice(0, 8)),   // Row 1
    duplicateAndExtend(allPartners.slice(4, 12)),  // Row 2
    duplicateAndExtend(allPartners.slice(8, 16)),  // Row 3
  ];

  // Track the translation position for each row
  const [translations, setTranslations] = useState([0, 0, 0]);
  const [animationPaused, setAnimationPaused] = useState([false, false, false]);
  const rowRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  
  // Speeds for each row (px per second) - slower on mobile
  const [speeds, setSpeeds] = useState([25, 25, 25]);
  
  // Animation reference for each row
  const animationRefs = useRef<(number | null)[]>([null, null, null]);
  const lastTimestampRefs = useRef<number[]>([0, 0, 0]);

  // Handle responsive changes
  useEffect(() => {
    const handleResize = () => {
      // Adjust speeds based on screen width
      if (window.innerWidth < 768) {
        setSpeeds([15, 15, 15]); // Slower on mobile
      } else {
        setSpeeds([25, 25, 25]); // Normal speed on desktop
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate the rows
  const animate = (timestamp: number, rowIndex: number) => {
    if (!lastTimestampRefs.current[rowIndex]) {
      lastTimestampRefs.current[rowIndex] = timestamp;
    }
    
    // Calculate time elapsed since last frame
    const elapsed = timestamp - lastTimestampRefs.current[rowIndex];
    lastTimestampRefs.current[rowIndex] = timestamp;
    
    if (!animationPaused[rowIndex]) {
      // Update translation based on time elapsed and speed
      setTranslations(prev => {
        const newTranslations = [...prev];
        
        // Check if ref is available
        if (rowRefs[rowIndex].current) {
          // Calculate new position
          newTranslations[rowIndex] += (speeds[rowIndex] * elapsed) / 1000;
          
          // Get row width
          const rowWidth = rowRefs[rowIndex].current.scrollWidth;
          const visibleWidth = rowRefs[rowIndex].current.offsetWidth;
          
          // Reset position when we've scrolled one third of the way (since we have 3x duplicated content)
          if (newTranslations[rowIndex] >= rowWidth / 3) {
            newTranslations[rowIndex] = 0;
          }
        }
        
        return newTranslations;
      });
    }
    
    // Continue animation
    animationRefs.current[rowIndex] = requestAnimationFrame((ts) => animate(ts, rowIndex));
  };

  useEffect(() => {
    // Start animations for each row
    rowsOfPartners.forEach((_, rowIndex) => {
      animationRefs.current[rowIndex] = requestAnimationFrame((ts) => animate(ts, rowIndex));
    });
    
    return () => {
      // Clean up animations
      animationRefs.current.forEach(animId => {
        if (animId) cancelAnimationFrame(animId);
      });
    };
  }, [animationPaused, speeds]);

  // Pause animation on hover
  const handleMouseEnter = (rowIndex: number) => {
    setAnimationPaused(prev => {
      const newState = [...prev];
      newState[rowIndex] = true;
      return newState;
    });
  };

  // Resume animation on mouse leave
  const handleMouseLeave = (rowIndex: number) => {
    setAnimationPaused(prev => {
      const newState = [...prev];
      newState[rowIndex] = false;
      return newState;
    });
  };

  return (
    <section className="partners-section section overflow-y-hidden pb-4" id="partners">
      <div className="container">
        {/* Centered title */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-8">
            <FadeTop>
              <div className="section__content">
                <span className="section__content-sub-title headingFour d-flex align-items-center justify-content-center">
                  <Image src={title} alt="vector" className="me-2" /> Our Lending Partners
                </span>
                <h2 className="section__header-title">
                  Trusted banks and financial institutions we proudly work with.
                </h2>
              </div>
            </FadeTop>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <FadeLeft>
              {/* Render each row (now only 3) */}
              {rowsOfPartners.map((rowPartners, rowIndex) => (
                <div 
                  key={`row-${rowIndex}`} 
                  className="mb-4"
                  onMouseEnter={() => handleMouseEnter(rowIndex)}
                  onMouseLeave={() => handleMouseLeave(rowIndex)}
                >
                  <div 
                    className="partners-row position-relative"
                    style={{ 
                      overflow: "hidden", 
                      height: "auto",
                      maxWidth: "100%"
                    }}
                  >
                    <div
                      ref={rowRefs[rowIndex]}
                      className="partners-slider-track"
                      style={{
                        display: "flex",
                        transform: `translateX(-${translations[rowIndex]}px)`,
                        willChange: "transform",
                        transition: animationPaused[rowIndex] ? "transform 0.2s ease" : "none"
                      }}
                    >
                      {rowPartners.map((partner, index) => (
                        <div 
                          key={`${partner.id}-${index}`} 
                          className="partner-item"
                          style={{
                            flex: "0 0 auto",
                            padding: "0 15px",
                            margin: "0.5rem 0"
                          }}
                        >
                          <div
                            className="partner-card"
                            style={{
                              backgroundColor: "white",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                              padding: "1rem",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "transform 0.3s ease",
                              cursor: "pointer",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "translateY(-5px)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "translateY(0)")
                            }
                          >
                            <div className="partner-logo" style={{ width: "100%", textAlign: "center" }}>
                              <div style={{ position: "relative", height: "60px", width: "100%" }}>
                                <Image
                                  src={partner.logo}
                                  alt={partner.name}
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </FadeLeft>
          </div>
        </div>
      </div>

      {/* Add CSS for proper responsive display */}
      <style jsx>{`
        /* Mobile (2 per row) */
        @media (max-width: 575.98px) {
          .partner-item {
            width: 50%;
            min-width: 50%;
          }
          .partner-card {
            padding: 0.75rem !important;
          }
        }
        
        /* Small tablets (3 per row) */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .partner-item {
            width: 33.333%;
            min-width: 33.333%;
          }
        }
        
        /* Tablets (4 per row) */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .partner-item {
            width: 25%;
            min-width: 25%;
          }
        }
        
        /* Laptops/desktops (5 per row) */
        @media (min-width: 992px) {
          .partner-item {
            width: 20%;
            min-width: 20%;
          }
        }
        
        /* Larger desktops (6 per row) */
        @media (min-width: 1200px) {
          .partner-item {
            width: 16.666%;
            min-width: 16.666%;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientPartners;