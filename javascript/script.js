// import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
// import ScrollTrigger from "gsap/ScrollTrigger";
if (window.innerWidth > 1000) {
  let dotBorder = document.getElementsByClassName("dot");
  let dot = document.getElementsByClassName("dotsst");
  let left = document.getElementsByClassName("left")[0];
  let rightImage1 = document.getElementsByClassName("right_img1");
  let rightImage2 = document.getElementsByClassName("right_img2");
  let right = document.getElementsByClassName("right")[0];
  let transring = document.getElementById("transring");
  window.onunload = function () {
    window.scrollTo(0, 0);
  };
  dotBorder[0].style.strokeWidth = "2px";
  dot[0].style.opacity = 1;
  dot[0].style.fill = "rgb(0, 146, 255)";
  const colorChanger = (leftColor, rightColor) => {
    left.style.background = leftColor;
    transring.style.background = leftColor;
    right.style.background = rightColor;
  };
  let pages = (enterIn, pageNo, direction) => {
    const page = document.getElementById(`page${pageNo}`);
    const leftHeader = document.getElementById(`page${pageNo}_header`);
    const leftInfo = document.getElementById(`page${pageNo}_info`);
    const leftFooter = document.getElementById(`page${pageNo}_footer`);
    if (enterIn) {
      switch (pageNo) {
        case 1:
          colorChanger("#7200bf", "rgb(0, 0, 0, 15%)");
          break;
        case 2:
          colorChanger("#4d26cd", "#1c0361");
          break;
        case 3:
          colorChanger("#0d1039", "#151748");
          break;
        case 4:
          colorChanger("#16273b", "rgb(13 21 30 / 99%)");
          break;
        case 5:
          colorChanger("#1358c0", "#2dcddd");
          break;
        case 6:
          colorChanger("#012c92", "transparent");
          break;
        case 7:
          colorChanger("#00834d", "#00b669");
          break;
        default:
          break;
      }
      leftFooter.className = "enlarge";
      page.className = `right_imgContainer page${pageNo}_animation`;
      leftHeader.className = `page${pageNo}_animation_enterIn_${direction}`;
      leftInfo.className = `page${pageNo}_animation_enterIn_${direction}`;
    } else {
      leftFooter.className = "shrink";
      page.className = `right_imgContainer page${pageNo}_animation_rev`;
      leftHeader.className = `page${pageNo}_animation_enterOut_${direction}`;
      leftInfo.className = `page${pageNo}_animation_enterOut_${direction}`;
    }
  };

  let ring = document.getElementById("Opaque_Ring");
  let stopPoint = 0;
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "9000px bottom",
      scrub: 1,
      ease: "none",

      onUpdate: (self) => {
        let prevStopPoint = stopPoint;
        stopPoint = Math.floor(self.progress.toFixed(3) * 7);
        let strokeDasharray = stopPoint * (814 / 6);
        if (stopPoint + 1 === 3) {
          strokeDasharray += 7;
        }
        if (stopPoint + 1 === 5) {
          strokeDasharray -= 10;
        }
        ring.style.strokeDasharray = `${strokeDasharray}, 814`;
        if (stopPoint === 7) {
          return;
        }
        if (stopPoint > prevStopPoint) {
          pages(false, stopPoint, "forward");
          pages(true, stopPoint + 1, "forward");

          for (let i = 0; i <= stopPoint; i++) {
            dotBorder[i].style.transitionDelay = "0.6s";
            dot[i].style.transition =
              "opacity 0.2s 0.6s ease-in-out, fill 0.2s 0.8s ease-in-out";
            dotBorder[i].style.strokeWidth =
              window.innerWidth <= 1368 ? "3px" : "2px";

            dot[i].style.opacity = 1;
            dot[i].style.fill = "rgb(0, 146, 255)";
          }
        } else if (stopPoint < prevStopPoint) {
          if (prevStopPoint !== 7) {
            pages(true, stopPoint + 1, "backward");
            pages(false, stopPoint + 2, "backward");
          }

          for (let i = stopPoint + 1; i < 7; i++) {
            dotBorder[i].style.transitionDelay =
              dot[i].style.transitionDelay =
              dot[i].style.transitionDelay =
                "0s";
            dotBorder[i].style.strokeWidth = "0px";
            dot[i].style.fill = "white";
            dot[i].style.opacity = 0.6;
          }
        }
      },
      pin: true,
    },
  });
}
