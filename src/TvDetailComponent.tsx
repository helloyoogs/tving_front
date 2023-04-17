/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "./common.css";
import Header from "./Header";
import "./TvDetailComponent.css";
import banner1_food from "./img/banner1_food.webp";
import banner1_transfer_love from "./img/banner1_transfer_love.webp";
import banner1_yagu from "./img/banner1_yagu.webp";
import my_tving from "./img/my_tving.webp";
import {A11y, Autoplay, Pagination} from "swiper";
import Endpoint from "./config/Endpoint";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {API_KEY} from "./ignore/ignoresecurity";

const TvDetailComponent = () => {
    let [header_active, set_header_active] = useState<String[] | String>([" "]);
    const navigate = useNavigate();
    const [tvDetail, setTvDetail]: any = useState([]);
    let {id} = useParams();
    const [wishIcon, setWishIcon] = useState(false);
    const API_URL = "https://api.themoviedb.org/3/";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    console.log(tvDetail)
    const handleFalseWishIcon = () => {
        setWishIcon((wishIcon: boolean) => !wishIcon);
        axios
            .post("/content/dataSave",{
                removed_at:null,
                content_id: tvDetail.id,
                content_genres: tvDetail.genres,
                content_title: tvDetail.title,
                content_poster: tvDetail.poster_path
            })
    };
    const handleTrueWishIcon = () => {
        setWishIcon((wishIcon: boolean) => !wishIcon);
        axios
            .post("/content/dataSave",{
                added_at:null,
            })
    };
    //클릭한 아이디값의 데이터 불러오기
    useEffect(() => {
        axios
            .get(API_URL + "tv/" + id + "?api_key=" + API_KEY + "&language=ko-KO")
            .then((response) => {
                console.log(response.data)
                setTvDetail(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

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
    const goPass = () => {
        navigate("/pass");
    };
    const goMy = () => {
        navigate("/my");
    };
    return (
        <div className="detail_component">
            <Header
                content={[
                    {link: "/main", name: "홈", type: "logo"},
                    {
                        place: "right",
                        type: "my_tiving",
                        img: <img src={my_tving}/>,
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
            <div className="content_wrap1" style={{backgroundImage:`url(${IMAGE_BASE_URL+tvDetail?.backdrop_path})`}}>
                <div className={'content_container'}>
                <img src={IMAGE_BASE_URL + tvDetail?.poster_path} alt=""/>
                <div className={'content_info_container'}>
                    <div className={'content_info_box'}>
                        <h1>{tvDetail?.name}</h1>
                        {wishIcon === false?
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" onClick={handleFalseWishIcon}>
                            <path d="M0 0h32v32H0z" fill="transparent"></path>
                            <g data-name="패\uC2A4 4347" fill="none">
                                <path
                                    d="M16 31.5l-2.175-1.979C6.1 22.523 1 17.907 1 12.242A8.165 8.165 0 019.25 4 8.984 8.984 0 0116 7.133 8.984 8.984 0 0122.75 4 8.165 8.165 0 0131 12.242c0 5.665-5.1 10.281-12.822 17.293z"></path>
                                <path
                                    d="M16.004 29.34l1.15-1.037c3.73-3.386 6.951-6.31 9.107-8.95 2.17-2.658 3.138-4.851 3.138-7.11v-.016a6.604 6.604 0 00-1.924-4.707 6.522 6.522 0 00-4.713-1.92 7.382 7.382 0 00-5.548 2.575L16 9.589l-1.214-1.414A7.384 7.384 0 009.233 5.6a6.522 6.522 0 00-4.708 1.92A6.604 6.604 0 002.6 12.227v.015c0 2.264.972 4.461 3.151 7.124 2.164 2.644 5.397 5.572 9.141 8.963l.01.008 1.102 1.004M16 31.499l-2.175-1.978C6.099 22.523 1 17.907 1 12.242A8.165 8.165 0 019.25 4 8.984 8.984 0 0116 7.133 8.984 8.984 0 0122.75 4 8.165 8.165 0 0131 12.242c0 5.665-5.1 10.281-12.823 17.294L16 31.499z"
                                    fill="#fff"></path>
                            </g>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" onClick={handleTrueWishIcon}>
                            <path d="M0 0h32v32H0z" fill="transparent"></path>
                            <path
                                d="M16 31.498l-2.175-1.979C6.1 22.521 1 17.905 1 12.24a8.165 8.165 0 018.25-8.242A8.984 8.984 0 0116 7.131a8.984 8.984 0 016.75-3.133A8.165 8.165 0 0131 12.24c0 5.665-5.1 10.281-12.822 17.293z"
                                fill="#fff"></path>
                        </svg>
                        }
                    </div>
                    <div className={'content_info_box'}>
                        {tvDetail?.genres?.map((item: any, index: number) => (
                            <div key={"tvDetailGenres-" + index}>
                                <p> {item?.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className={'content_info_box'}>
                        <p>
                            {tvDetail?.overview}
                        </p>
                    </div>

                </div>
            </div>
            </div>

            <footer>
                <p>Copyright © 주식회사 티빙 All right reserved.</p>
            </footer>
        </div>
    );
};

export default TvDetailComponent;
