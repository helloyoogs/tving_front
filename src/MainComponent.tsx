/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./common.css";
import Header from "./Header";
import "./MainComponent.css";
import mainslide1_1 from "./img/mainslide1_1.webp";
import mainslide1_2 from "./img/mainslide1_2.webp";
import mainslide1_3 from "./img/mainslide1_3.webp";
import mainslide1_4 from "./img/mainslide1_4.webp";
import mainslide1_5 from "./img/mainslide1_5.webp";
import mainslide1_6 from "./img/mainslide1_6.webp";
import mainslide1_7 from "./img/mainslide1_7.webp";
import mainslide1_8 from "./img/mainslide1_8.webp";
import mainslide1_9 from "./img/mainslide1_9.webp";
import mainslide1_10 from "./img/mainslide1_10.webp";
import mainslide1_11 from "./img/mainslide1_11.webp";
import banner1_food from "./img/banner1_food.webp";
import banner1_transfer_love from "./img/banner1_transfer_love.webp";
import banner1_yagu from "./img/banner1_yagu.webp";
import my_tving from "./img/my_tving.webp";
import { A11y, Autoplay, Pagination } from "swiper";
import Axios from "axios";
import Endpoint from "./config/Endpoint";
import { RequestSignUp } from "./Container/JoinContainer";
import { useNavigate } from "react-router";
import axios from "axios";
import * as colorette from "colorette";
import { API_KEY } from "../ignore/ignoresecurity";

const MainComponent = (props: any) => {
  let [header_active, set_header_active] = useState<String[] | String>([" "]);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const API_URL = "https://api.themoviedb.org/3/";
  const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";

  const Popular = () => {
    axios
      .get(API_URL + "movie/popular?api_key=" + API_KEY)
      .then((response) => {
        //  setThisMonthlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* wheel,scrtoll 이벤트 main_header */
  function scroll_header() {
    if (scrollY > 0) {
      set_header_active((header_active = "active"));
    } else {
      set_header_active((header_active = " "));
    }
  }
  window.addEventListener("scroll", scroll_header);

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
      api_key: "api-key",
    },
  });

  const doLogout = () => {
    axios
      .post(Endpoint.authServer + "/user/logout")
      .then((response) => {
        // accessToken과 refreshToken 쿠키 삭제
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 로그아웃 요청이 성공적으로 수행된 경우
        console.log(response.data); // 응답 데이터 출력
        // 로그아웃에 성공한 후에는 보통 다른 페이지로 이동하게 됩니다.
        // 예를 들어, 로그인 페이지로 이동한다면 다음과 같이 작성할 수 있습니다.
        window.location.href = "/";
      })
      .catch((error) => {
        // 로그아웃 요청이 실패한 경우
        console.log(error.response.data); // 오류 응답 데이터 출력
        alert("로그아웃에 실패하였습니다. 다시 시도해주세요.");
      });
  };
  const goPass = () => {
    navigate("/pass");
  };
  const goMy = () => {
    navigate("/my");
  };
  const bannerItems = [
    {
      id: 0,
      name: "푸드크로니클",
      src: `${banner1_food}`,
      alt: "",
    },
    {
      id: 1,
      name: "환승연애",
      src: `${banner1_transfer_love}`,
      alt: "",
    },
    {
      id: 2,
      name: "최강야구",
      src: `${banner1_yagu}`,
      alt: "",
    },
  ];
  const slideItems = [
    {
      id: 0,
      name: "만찢남",
      src: `${mainslide1_1}`,
      alt: "",
    },
    {
      id: 1,
      name: "두발로 티켓팅",
      src: `${mainslide1_2}`,
      alt: "",
    },
    {
      id: 2,
      name: "케이팝 제너레이션",
      src: `${mainslide1_3}`,
      alt: "",
    },
    {
      id: 3,
      name: "(여자)아이들 외 취급주의 2",
      src: `${mainslide1_4}`,
      alt: "",
    },
    {
      id: 4,
      name: "대리인간 [드라마 스테이지 2021]",
      src: `${mainslide1_5}`,
      alt: "",
    },
    {
      id: 5,
      name: "위닝런",
      src: `${mainslide1_6}`,
      alt: "",
    },
    {
      id: 6,
      name: "최강야구",
      src: `${mainslide1_7}`,
      alt: "",
    },
    {
      id: 7,
      name: "하이큐!! 투 더 탑",
      src: `${mainslide1_8}`,
      alt: "",
    },
    {
      id: 8,
      name: "슬램덩크",
      src: `${mainslide1_9}`,
      alt: "",
    },
    {
      id: 9,
      name: "아무것도 하고 싶지 않아",
      src: `${mainslide1_10}`,
      alt: "",
    },
    {
      id: 10,
      name: "대행사",
      src: `${mainslide1_11}`,
      alt: "",
    },
  ];

  return (
    <div className="main_conponent">
      <Header
        content={[
          { link: "/main", name: "홈", type: "logo" },
          { link: "#", name: "TV프로그램" },
          { link: "#", name: "영화" },
          {
            place: "right",
            type: "my_tiving",
            img: <img src={my_tving} />,
            list: (
              <>
                <a onClick={doLogout}>로그아웃</a>
                <a onClick={goPass}>이용권 구매</a>
                <a onClick={goMy}>My</a>
              </>
            ),
          },
        ]}
        className={header_active}
      />
      <div className="content_wrap1">
        <Swiper
          className="banner"
          speed={600}
          direction={"horizontal"}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[A11y, Autoplay, Pagination]}
        >
          {bannerItems.map((item) => (
            <SwiperSlide key={"slide1-" + Math.random()}>
              <img src={item.src} alt="" className="slide1_img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      /* tmdb api test */
      <div className="content_wrap2">
        <h2>실시간 인기 영화</h2>
        <Swiper
          spaceBetween={12}
          speed={600}
          direction={"horizontal"}
          slidesPerView={"auto"}
          className="slide1"
        >
          {slideItems.map((item) => (
            <SwiperSlide key={"slide1-" + Math.random()}>
              <img src={item.src} alt="" className="slide1_img" />
              {/* {item.name} */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div>
  );
};

export default MainComponent;
