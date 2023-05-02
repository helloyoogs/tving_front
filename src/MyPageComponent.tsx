/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "./common.css";
import Header from "./Header";
import "./MyPageComponent.css";
import {useNavigate} from "react-router";
import axios from "axios";
import Endpoint from "./config/Endpoint";
import my_tving from "./img/my_tving.webp";
import my_tving_big from "./img/my_tving_big.webp";

interface SubscriptionType {
    id: number;
    name: string;
    price: number;
}

const MyPageComponent = () => {
    let [header_active, set_header_active] = useState<String[] | String>([" "]);
    const [thisMonthlist, setThisMonthlist]: any = useState();
    const [nextMonthlist, setNextMonthList]: any = useState();
    const [subscriptions, setSubscriptions]: any = useState([]);
    const [wishList, setWishList]: any = useState([]);
    const [tabPage, setTabPage]: any = useState();
    const [data, setData]: any = useState([]);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate();
    //이용 내역 테이블에서 로그인한 아이디이고 end_date가 만료되지 않은 회원만 조회
    useEffect(() => {
        axios
            .get("/payment/list")
            .then((response) => {
                setThisMonthlist(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .post("/usageState/updateSubscriptionCheck")
            .then((response) => {
                // setSubscriptions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get("/payment/nextList")
            .then((response) => {
                setNextMonthList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get("/subscription")
            .then((response) => {
                setSubscriptions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //찜목록
    useEffect(() => {
        axios
            .get("/wish/list", {}).then((response) => {
            setWishList(response.data)
        })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //결제
    /* wheel,scrtoll 이벤트 main_header */
    function scroll_header() {
        if (scrollY > 0) {
            set_header_active((header_active = "active"));
        } else {
            set_header_active((header_active = " "));
        }
    }

    window.addEventListener("scroll", scroll_header);

    function getDateAfterMonths(months: number, day: any) {
        let date = new Date();
        date.setMonth(date.getMonth() + months);
        if (day != null) {
            date.setDate(day);
        }
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

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
    useEffect(() => {
        axios
            .get("/payment")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const ListComponent = () => {
        useEffect(() => {
            console.log(data);
        }, [data]);
        return (
            data && data.length > 0 ?
                <table width="500">
                    <thead>
                    <tr>
                        <th>상태</th>
                        <th>상품명</th>
                        <th>결제 금액</th>
                        <th>결제일</th>
                        <th>이용 기간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(data) &&
                        data?.map((item: any, index: number) => {
                            const subscription =
                                subscriptions &&
                                subscriptions?.find(
                                    (subscription: SubscriptionType) =>
                                        subscription?.id === item?.subscription_id
                                );
                            return (
                                <tr key={"dataTable" + index}>
                                    <td>
                                        {item?.usageState?.end_date > getDateAfterMonths(0, null) &&
                                        (item?.usageState?.subscription_check === "true" ||
                                            item?.pay_check === "true")
                                            ? "사용중"
                                            : "만료"}
                                    </td>
                                    <td>{subscription?.name}</td>
                                    <td>{item?.payment_amount}원</td>
                                    <td>{item?.payment_date}</td>
                                    <td width={"200px"}>
                                        {item?.usageState?.start_date +
                                            " ~ " +
                                            item?.usageState?.end_date}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : <p>이용 내역이 없습니다</p>
        );
    };
    const WishComponent = () => {
        useEffect(() => {
            console.log(wishList);
        }, [wishList]);
        return (
            <div className={'my_wish_component'}>
                {wishList && wishList.length > 0 ?
                    wishList?.map((item: any, index: number) => {
                        return (
                            <div className={'my_wish_wrap'} key={"wishList-" + index}>
                                <img src={IMAGE_BASE_URL + item.content_poster} alt="" className="slide1_img"/>
                                <div>{item.content_title}</div>
                            </div>
                        );
                    })
                    : <p>찜 내역이 없습니다</p>}
            </div>
        );
    };
    const showWatchingList = () => {
        return <WishComponent/>;
    };
    const showList = () => {
        return <ListComponent/>;
    };

    const doListAll = () => {
        axios
            .get("/payment/list")
            .then((response) => {
                setThisMonthlist(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("/payment/nextList")
            .then((response) => {
                setNextMonthList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSubscriptionCancle = () => {
        return subscriptionCancle()
            .then(() => {
                doListAll();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };
    const subscriptionCancle = () => {
        return axios
            .get("/payment/list")
            .then((response) => {
                return axios.put("/usageState/" + response.data.usageState.id, {
                    subscription_check: false,
                });
                return axios.put("/payment/" + response.data.usageState.id, {
                    pay_check: false,
                });
            })
            .then(() => {
                if (nextMonthlist) {
                    return axios.get("/payment/nextList").then((response) => {
                        return axios.put("/usageState/" + response.data.usageState.id, {
                            subscription_check: false,
                        });
                        return axios.put("/payment/" + response.data.usageState.id, {
                            pay_check: false,
                        });
                    });
                }
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };

    const handleSubscriptionReStart = () => {
        return subscriptionReStart()
            .then(() => {
                doListAll();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };
    const subscriptionReStart = () => {
        return axios.get("/payment/list").then((response) => {
            return axios.put("/usageState/" + response.data.usageState.id, {
                subscription_check: true,
            });
            return axios.put("/payment/" + response.data.usageState.id, {
                pay_check: true,
            });
        });
    };
    const handleAutoPayReStart = () => {
        return autoPayReStart()
            .then(() => {
                doListAll();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };
    const autoPayReStart = () => {
        return axios.get("/payment/list").then((response) => {
            return axios.put("/payment/" + response.data.usageState.id, {
                pay_check: true,
            });
        });
    };
    const handleAutoPayCancle = () => {
        return autoPayCancle()
            .then(() => {
                doListAll();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };
    const autoPayCancle = () => {
        return axios
            .get("/payment/list")
            .then((response) => {
                return axios.put("/payment/" + response.data.usageState.id, {
                    pay_check: false,
                });
            })
            .then(() => {
                if (nextMonthlist) {
                    return axios.get("/payment/nextList").then((response) => {
                        return axios.put("/usageState/" + response.data.usageState.id, {
                            subscription_check: false,
                        });
                        return axios.put("/payment/" + response.data.usageState.id, {
                            pay_check: false,
                        });
                    });
                }
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };
    return (
        <div className="my_component">
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

            <div className="content_wrap1">
                <div className={"my_info_container"}>
                    <img src={my_tving_big} alt=""/>
                    <div className={"my_info_content"}>
                        <p> {thisMonthlist?.user_id}님의 마이페이지</p>
                        {thisMonthlist?.id ? (
                            <div className={"cancle_button"}>
                                {thisMonthlist.usageState.subscription_check === "true" ? (
                                    <>
                                        <button onClick={handleSubscriptionCancle}>
                                            구독 취소
                                        </button>
                                        {thisMonthlist.pay_check === "true" ? (
                                            <button onClick={handleAutoPayCancle}>
                                                자동 결제 취소
                                            </button>
                                        ) : thisMonthlist.usageState.end_date >
                                        getDateAfterMonths(0, null) ? (
                                            <button onClick={handleAutoPayReStart}>
                                                자동 결제 재시작
                                            </button>
                                        ) : (
                                            <p>자동 결제 해지되었습니다.</p>
                                        )}
                                    </>
                                ) : thisMonthlist.usageState.end_date >
                                getDateAfterMonths(0, null) ? (
                                    <button onClick={handleSubscriptionReStart}>
                                        구독 재시작
                                    </button>
                                ) : (
                                    <p>구독 해지되었습니다.</p>
                                )}
                            </div>
                        ) : (
                            <div>
                                {thisMonthlist?.id
                                    ? "나의 이용권"
                                    : "사용중인 이용권이 없습니다"}
                                &nbsp; &nbsp;
                                <button onClick={goPass}>이용권 구독</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={"content_wrap2"}>
                <span onClick={() => setTabPage("showWatchingList")}>시청 내역</span>
                <span onClick={() => setTabPage("showWatchingList")}>찜</span>
                <span onClick={() => setTabPage("showList")}>이용 내역</span>
            </div>
            <div className={"content_wrap3"}>
                {tabPage === "showWatchingList" ? showWatchingList() : showList()}
            </div>
            <footer>
                <p>Copyright © 주식회사 티빙 All right reserved.</p>
            </footer>
        </div>
    );
};

export default MyPageComponent;
