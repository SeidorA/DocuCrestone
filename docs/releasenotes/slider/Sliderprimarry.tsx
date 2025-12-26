import React, { useState } from "react";
import styles from "./slider.module.css";
import { CaralIcon } from "iconcaral2";


type Entrada = {
  title_slide: string;
  description: string;
};

type SlidereleceProps = {
  version: string;
  items: Entrada[];
};

export function Sliderelece({ version, items, title }: SlidereleceProps) {
  const [current, setCurrent] = useState(0);

  const itemnum = items.length - 1;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? itemnum : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === itemnum ? 0 : prev + 1));
  };

  const imgrelece = `/img/relece/${version}/${current}.gif`;
  const ulrend = `./${version}`;

  return (
    <>
      <div className={styles.slider_realece}>
        <div className={styles.slider_img}>
          <img src={imgrelece} alt="" />
        </div>
        <div className={styles.slider_conten}>
          <div className={styles.slider_top}>
            {current !== 0 && (
              <button className={styles.btnb} onClick={prevSlide}>
                <CaralIcon name="arrowLeft" />
                Return
              </button>
            )}
            <div className={styles.numtop}>
              <span className={styles.active}> {current + 1} </span>
              <span style={{
                color: "var(--ifm-color-gray-hard)"
              }}>{`/ ${items.length}`}</span>
            </div>
          </div>
          <div className={styles.contenet} >
            <h2 style={{
              color: "var(--ifm-color-gray-hard)"
            }}> V {title} </h2>
            <h1>{items[current].title_slide}</h1>
            <p>{items[current].description}</p>
          </div>
          <div className={styles.slider_bottom}>
            {current === itemnum ? (
              <a
                href={ulrend}
                className={styles.btnn}
                style={{ textDecoration: "none" }}
              >
                Read more
              </a>
            ) : (
              <button className={styles.btnn} onClick={nextSlide}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        {items.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#333" : "#ccc",
              margin: "0 3px"
            }}
          />
        ))}
      </div>
    </>
  );
}

type relecelistProps = {
  releases: String
};


function Rowlastrelece({ versionre, date, description, linkto }: { versionre?: string; date?: string, description?: string, linkto?: string }) {

  const reference = `./${linkto}`
  return (
    <div className={styles.rowre}>
      <div className={styles.numre}>
        <h1>V. {versionre}</h1>
        <img
          className={styles[`position_${Math.floor(Math.random() * 4) + 1}`]}
          src="/img/sp.png"
          alt=""
        />
      </div>
      <div className={styles.content}>
        <small style={{
          color: "var(--ifm-color-gray-hard)"
        }}>Released on {date}</small>
        <p>{description}</p>
        <a className={(styles.btnn)} href={reference}>Read more</a>
      </div>
    </div>
  )

}


export function Previouslyedreace({ releases }: relecelistProps) {


  return (
    <div className={styles.list_realace}>
      <h1>Release Notes</h1>
      <p>Stay up to date with the latest improvements, features, and fixes in Crestone. This section provides a chronological overview of all platform updates, helping you track changes across versions and understand how each release enhances functionality, performance, and stability.</p>
      {[...releases].reverse().map(release => (
        <Rowlastrelece versionre={release.name} linkto={release.link} description={release.description} date={release.date} />
      ))}
    </div>
  )
}


export function Slidersimple({ version, items }: SlidereleceProps) {
  const [current, setCurrent] = useState(0);
  const itemnum = items.length - 1;
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? itemnum : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === itemnum ? 0 : prev + 1));
  };
  const imgrelece = `/img/relece/${version}/${current}.gif`;

  return (
    <>
      <div className={styles.slider_img_simple}>
        <img src={imgrelece} alt="" />
      </div>

      <div >
        <div className={styles.controls}>

          <button className={styles.btnb} onClick={prevSlide}>
            <CaralIcon name="arrowLeft" />
            Return
          </button>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center'
            }}>
              <span className={styles.active}> {current + 1} </span>
              <span style={{
                color: "var(--ifm-color-gray-hard)"
              }}>{`/ ${items.length}`}</span>
            </div>

            <div className={styles.slider_realece}>
              <div style={{ marginTop: 10 }}>
                {items.map((_, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: idx === current ? "#333" : "#ccc",
                      margin: "0 3px"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className={styles.btnn} onClick={nextSlide}>
            Next
            <CaralIcon name="arrowRight" />
          </button>

        </div>

        <div className={styles.contenet} >
          <h1>{items[current].title_slide}</h1>
          <p>{items[current].description}</p>
        </div>

      </div>

    </>
  );
}
