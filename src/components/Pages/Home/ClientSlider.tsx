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
    { id: 3, name: "Equifax", logo: "/images/boi.png" },
    { id: 4, name: "Experian", logo: "/images/hdfc.avif" },
    { id: 5, name: "Bank 1", logo: "/images/bob.png" },
    { id: 6, name: "Bank 2", logo: "/images/hdfc.avif" },
    { id: 7, name: "Bank 3", logo: "/images/boi.png" },
    { id: 8, name: "Bank 4", logo: "/images/bob.png" },
    { id: 9, name: "Bank 5", logo: "/images/hdfc.avif" },
    { id: 10, name: "Bank 6", logo: "/images/boi.png" },
    { id: 11, name: "Bank 7", logo: "/images/bob.png" },
    { id: 12, name: "Bank 8", logo: "/images/hdfc.avif" },
    { id: 13, name: "Bank 9", logo: "/images/boi.png" },
    { id: 14, name: "Bank 10", logo: "/images/bob.png" },
    { id: 15, name: "Bank 11", logo: "/images/hdfc.avif" },
    { id: 16, name: "Bank 12", logo: "/images/boi.png" },
  ];

  const duplicateAndExtend = (array: Partner[]) => {
    return [...array, ...array, ...array];
  };

  // Create 4 rows with duplicated partners
  const rowsOfPartners = [
    duplicateAndExtend(allPartners.slice(0, 8)),   // Row 1
    duplicateAndExtend(allPartners.slice(4, 12)),  // Row 2
    duplicateAndExtend(allPartners.slice(8, 16)),  // Row 3
    duplicateAndExtend(allPartners.slice(0, 8).reverse()), // Row 4 (reversed for variety)
  ];

  // Track the translation position for each row
  const [translations, setTranslations] = useState([0, 0, 0, 0]);
  const [animationPaused, setAnimationPaused] = useState([false, false, false, false]);
  const rowRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Speeds for each row (px per second)
  const speeds = [25, 25, 25, 25];
  
  // Animation reference for each row
  const animationRefs = useRef([null, null, null, null]);
  const lastTimestampRefs = useRef([0, 0, 0, 0]);

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
        
        // Calculate new position
        newTranslations[rowIndex] += (speeds[rowIndex] * elapsed) / 1000;
        
        // Get row width
        const rowWidth = rowRefs[rowIndex].current.scrollWidth;
        const visibleWidth = rowRefs[rowIndex].current.offsetWidth;
        
        // Reset position when we've scrolled one third of the way (since we have 3x duplicated content)
        if (newTranslations[rowIndex] >= rowWidth / 3) {
          newTranslations[rowIndex] = 0;
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
  }, [animationPaused]);

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
    <section className="partners-section section overflow-y-hidden" id="partners">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <FadeTop>
              <div className="section__content">
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> Our Lending Partners
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
              {/* Render each row */}
              {rowsOfPartners.map((rowPartners, rowIndex) => (
                <div 
                  key={`row-${rowIndex}`} 
                  className="mb-5"
                  onMouseEnter={() => handleMouseEnter(rowIndex)}
                  onMouseLeave={() => handleMouseLeave(rowIndex)}
                >
                  <div 
                    className="partners-row position-relative"
                    style={{ overflow: "hidden" }}
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
                            flex: "0 0 25%",
                            padding: "0 15px",
                            minWidth: "25%",
                            maxWidth: "25%",
                          }}
                        >
                          <div
                            className="partner-card"
                            style={{
                              backgroundColor: "white",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                              padding: "2rem",
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
                              <div style={{ position: "relative", height: "80px", width: "100%" }}>
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
    </section>
  );
};

export default ClientPartners;