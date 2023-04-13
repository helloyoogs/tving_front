/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./common.css";
import Header from "./Header";
import "./MainComponent.css";
import banner1_food from "./img/banner1_food.webp";
import banner1_transfer_love from "./img/banner1_transfer_love.webp";
import banner1_yagu from "./img/banner1_yagu.webp";
import my_tving from "./img/my_tving.webp";
import { A11y, Autoplay, Pagination } from "swiper";
import Endpoint from "./config/Endpoint";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import { API_KEY } from "./ignore/ignoresecurity";

const DetailComponent = () => {
    let [header_active, set_header_active] = useState<String[] | String>([" "]);
    const navigate = useNavigate();
    const [moviesPopular, setMoviesPopular]= useState([]);
    const [dramasPopular, setDramasPopular]= useState([]);
    const [moviesDetail, setMoviesDetail]= useState([]);
    let { id } = useParams();
console.log(id)
    const API_URL = "https://api.themoviedb.org/3/";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    //클릭한 아이디값의 데이터 불러오기
    useEffect(()=>{
        axios
            .get(API_URL + "movie/"+id+"?api_key=" + API_KEY+"&language=ko-KO")
            .then((response) => {
                console.log(response.data)
               // console.log(id)
            })
            .catch((error) => {
                console.log(error);
            });
    },[])
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
            </div>
            <footer>
                <p>Copyright © 주식회사 티빙 All right reserved.</p>
            </footer>
        </div>
    );
};

export default DetailComponent;
