"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { counter } from "../../../../public/data/homeTwoData";

const Counter = () => {
  return (
    <section className="countdown section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="countdown__area justify-content-center  justify-content-md-between flex-wrap">
              {counter?.map((count) => (
                <div key={count.id} className="countdown__part">
                  <div className="countdown__icon">
                    <Image src={count?.img} alt="icon" width={56} height={56} />
                  </div>
                  <div className="countdown__content">
                    <div className="countdown__title display-4">
                      <div>
                        <CountUp
                          start={0}
                          end={count?.number}
                          decimals={1}
                          enableScrollSpy={true}
                        >
                          {({ countUpRef }) => (
                            <div>
                              <span ref={countUpRef} />
                            </div>
                          )}
                        </CountUp>
                      </div>
                      {count.title === "Awards Won" ? "+" : "K"}
                    </div>
                    <p>{count.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
