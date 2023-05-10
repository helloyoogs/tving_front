/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "./common.css";
import Header from "./Header";
import "./MainComponent.css";
import banner1_food from "./img/banner1_food.webp";
import banner1_transfer_love from "./img/banner1_transfer_love.webp";
import banner1_yagu from "./img/banner1_yagu.webp";
// @ts-ignore
import search from "./img/icon_search.svg";
// @ts-ignore
import x from "./img/x.svg";
// @ts-ignore
import x_circle from "./img/icon_x_circle.svg";
import my_tving from "./img/my_tving.webp";
import {A11y, Autoplay, Pagination} from "swiper";
import Endpoint from "./config/Endpoint";
import {useNavigate} from "react-router";
import axios from "axios";
import {API_KEY} from "./ignore/ignoresecurity";

const MainComponent = (props: any) => {
    let [header_active, set_header_active] = useState<String[] | String>([" "]);
    let [searchIcon, setSearchIcon] = useState<any>(search);
    let [listOnOff, setListOnOff] = useState<any>(false);
    const navigate = useNavigate();
    const [moviesPopular, setMoviesPopular] = useState([]);
    const [tvPopular, setTvPopular] = useState([]);
    const [moviesTopRated, setMoviesTopRated] = useState([]);
    const [tvTopRated, setTvTopRated] = useState([]);
    const [moviesNowPlaying, setmoviesNowPlaying] = useState([]);
    const API_URL = "https://api.themoviedb.org/3/";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        Promise.all([
            axios.get(API_URL + "movie/popular?api_key=" + API_KEY + "&language=ko-KO&page=3"),
            axios.get(API_URL + "movie/top_rated?api_key=" + API_KEY + "&language=ko-KO&page=8"),
            axios.get(API_URL + "tv/popular?api_key=" + API_KEY + "&language=ko-KO&page=12"),
            axios.get(API_URL + "tv/top_rated?api_key=" + API_KEY + "&language=ko-KO&page=2"),
        ])
            .then((responses) => {
                setMoviesPopular(responses[0].data.results);
                setMoviesTopRated(responses[1].data.results);
                setTvPopular(responses[2].data.results);
                setTvTopRated(responses[3].data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    /* wheel,scrtoll 이벤트 main_header */
    function scroll_header() {
        if (scrollY > 0) {
            set_header_active((header_active = "active"));
        } else {
            set_header_active((header_active = " "));
        }
    }

    window.addEventListener("scroll", scroll_header);

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
    const goMovieDetail = (id: any) => {
        navigate("/movieDetail/" + id);
    };
    const goTvDetail = (id: any) => {
        navigate("/tvDetail/" + id);
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

    const handleSeacrch = () => {
        const body = document.getElementsByTagName('body')[0];

        searchIcon === search ?
            setSearchIcon(x) : setSearchIcon(search)
        searchIcon === search ?
            body.classList.add('scrollLock') : body.classList.remove('scrollLock')
    }
    const handleList = () => {
        setListOnOff(!listOnOff)
    }
    return (
        <div className="main_conponent">
            <Header
                content={[
                    {link: "/main", name: "홈", type: "logo"},
                    {
                        place: "right",
                        type: "search",
                        img: <img src={searchIcon} alt={""}/>,
                        clinkEventName: handleSeacrch,
                        list: (
                            searchIcon === x &&
                            <>
                                <div className={'search_container'}>
                                <label className={'search_box'}>
                                    <input type={"search"} placeholder={"제목을 입력해보세요"}/>
                                    <img src={search} alt={""}/>
                                </label>
                                <div className={'search_word_container'}>
                                    <div className={'recent_search_container'}>
                                        <div className={'recent_search_title_box'}>
                                            <p className={'title'}>최근 검색어</p>
                                            <div className={'all_delete'} role={'button'}>
                                                모두 지우기
                                                <img src={x_circle} alt={""}/></div>
                                        </div>
                                    </div>
                                    <div className={'line'}></div>
                                    <div className={'popular_search_container'}>
                                        <p className={'title'}>인기 검색어</p>
                                    </div>
                                </div>
                                </div>

                            </>
                        ),
                    },
                    {
                        place: "right",
                        type: "my_tiving",
                        img: <img src={my_tving}/>,
                        clinkEventName: handleList,
                        list: (
                            listOnOff &&
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
                    pagination={{clickable: true}}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[A11y, Autoplay, Pagination]}
                >
                    {bannerItems?.map((item: any, index: number) => (
                        <SwiperSlide key={"banner-" + index}>
                            <img src={item.src} alt="" className="slide1_img"/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content_wrap2">
                <h2>실시간 인기 드라마</h2>
                <Swiper
                    spaceBetween={12}
                    speed={600}
                    direction={"horizontal"}
                    slidesPerView={"auto"}
                    className="slide1"
                >
                    {tvPopular?.map((item: any, index: number) => (
                        <SwiperSlide key={"tvPopular-" + index} onClick={() => goTvDetail(item.id)}>
                            <img src={IMAGE_BASE_URL + item?.poster_path} alt="" className="slide1_img"/>
                            <p> {item?.name}</p>
                            {/* {item.name} */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content_wrap2">
                <h2>Top 20 영화</h2>
                <Swiper
                    spaceBetween={12}
                    speed={600}
                    direction={"horizontal"}
                    slidesPerView={"auto"}
                    className="slide1"
                >
                    {moviesTopRated && moviesTopRated.length > 0 && moviesTopRated?.map((item: any, index: number) => (
                        <SwiperSlide key={"moviesLatest-" + index} onClick={() => goMovieDetail(item.id)}>
                            <img src={IMAGE_BASE_URL + item?.poster_path} alt="" className="slide1_img"/>
                            <p> {item?.title}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content_wrap2">
                <h2>실시간 영화</h2>
                <Swiper
                    spaceBetween={12}
                    speed={600}
                    direction={"horizontal"}
                    slidesPerView={"auto"}
                    className="slide1"
                >
                    {moviesNowPlaying && moviesNowPlaying.length > 0 && moviesNowPlaying?.map((item: any, index: number) => (
                        <SwiperSlide key={"tvOnTheAir-" + index} onClick={() => goMovieDetail(item.id)}>
                            <img src={IMAGE_BASE_URL + item?.poster_path} alt="" className="slide1_img"/>
                            <p> {item?.title}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content_wrap2">
                <h2>Top 20 드라마</h2>
                <Swiper
                    spaceBetween={12}
                    speed={600}
                    direction={"horizontal"}
                    slidesPerView={"auto"}
                    className="slide1"
                >
                    {tvTopRated && tvTopRated.length > 0 && tvTopRated?.map((item: any, index: number) => (
                        <SwiperSlide key={"tvTopRated-" + index} onClick={() => goTvDetail(item.id)}>
                            <img src={IMAGE_BASE_URL + item?.poster_path} alt="" className="slide1_img"/>
                            <p> {item?.name}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content_wrap2">
                <h2>실시간 인기 영화</h2>
                <Swiper
                    spaceBetween={12}
                    speed={600}
                    direction={"horizontal"}
                    slidesPerView={"auto"}
                    className="slide1"
                >
                    {moviesPopular?.map((item: any, index: number) => (
                        <SwiperSlide key={"moviesPopular-" + index} onClick={() => goMovieDetail(item.id)}>
                            <img src={IMAGE_BASE_URL + item?.poster_path} alt="" className="slide1_img"/>
                            <p> {item?.title}</p>
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
