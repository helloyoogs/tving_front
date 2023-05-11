/*eslint-disable*/
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "./Header";
import "./PassComponent.css";
import axios from "axios";
import { IMPCODE } from "./ignore/ignoresecurity";
declare const window: typeof globalThis & {
  IMP: any;
};

interface SubscriptionType {
  id: number;
  name: string;
  price: number;
}
const PassComponent = () => {
  const [subscriptions, setSubscriptions]: any = useState([]);
  const [thisMonthlist, setThisMonthlist]: any = useState();
  const [nextMonthlist, setNextMonthList]: any = useState();
  const subscription =
    subscriptions &&
    subscriptions?.find(
      (subscription: SubscriptionType) =>
        subscription?.id === thisMonthlist?.subscription_id
    );
  function getDateAfterMonths(months: number, day: any) {
    let date = new Date();
    date.setMonth(date.getMonth() + months);
    if (day != null) {
      date.setDate(day);
    }
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
  useEffect(() => {
    axios
      .post("/usageState/updateSubscriptionCheck")
      .then((response) => {
        console.log(response.data);
        // setSubscriptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //구독 상품 종류 조회해서 가져오기
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
  //이용 내역 테이블에서 로그인한 아이디이고 end_date가 만료되지 않은 회원만 조회
  useEffect(() => {
    axios
      .get("/payment/list")
      .then((response) => {
        setThisMonthlist(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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

  //이용 내역 테이블에서 로그인한 아이디이고 end_date가 만료되지 않은 회원만 조회
  useEffect(() => {
    axios
      .get("/payment/nextList")
      .then((response) => {
        setNextMonthList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //결제
  const handleOnPay = (index: number) => {
    const IMP = window.IMP;
    IMP.init(IMPCODE); // 가맹점 식별코드 입력

    const actual_amount = subscriptions[index].price; // Store payment_amount in a variable

    IMP.request_pay(
      {
        amount: actual_amount, // 결제 금액
        pg: "kakao", // 결제 수단 - 카카오페이
        pay_method: "kakaopay", // 결제 수단 - 카드
        merchant_uid: `mid_${new Date().getTime()}`, // 가맹점에서 관리하는 거래번호
        name: subscriptions[index].name, // 상품명
      },
      (rsp: any) => {
        if (rsp.success) {
          // 결제 성공 시 imp_uid 값을 백엔드 API에 전송하여 저장
          const impUid = rsp.imp_uid;
          pay(index, actual_amount, impUid);
          alert("결제가 완료되었습니다.");
        }
      }
    );
  };
  const refundAmount = () => {
    // 환불금액 구하기
    const currentDate: any = new Date();
    const subscriptionStartDate: any = new Date(
      thisMonthlist?.usageState?.start_date
    );
    const subscriptionEndDate: any = new Date(
      thisMonthlist?.usageState?.end_date
    );
    const usableDay = Math.ceil(
      (subscriptionEndDate - subscriptionStartDate) / (1000 * 60 * 60 * 24)
    );
    const useday = Math.ceil(
      (subscriptionEndDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    return (useday / usableDay) * subscription?.price;
  };

  //업그레이드 타입 결제
  const handleUpgrade = (index: number) => {
    console.log(refundAmount());
    const IMP = window.IMP;
    IMP.init(IMPCODE); // 가맹점 식별코드 입력

    const refund = refundAmount();
    const actual_amount = subscriptions[index].price - refund;

    IMP.request_pay(
      {
        amount: actual_amount, // 결제 금액
        pg: "kakao", // 결제 수단 - 카카오페이
        pay_method: "kakaopay", // 결제 수단 - 카드
        merchant_uid: `mid_${new Date().getTime()}`, // 가맹점에서 관리하는 거래번호
        name: subscriptions[index].name, // 상품명
      },
      (rsp: any) => {
        if (rsp.success) {
          const impUid = rsp.imp_uid;
          upgrade(index, actual_amount, impUid)
            .then(() => {
              doListAll();
              alert("업그레이드가 완료되었습니다.");
            })
            .catch(() => {
              alert("업그레이드가 완료되지 않았습니다. 다시 시도해주세요.");
            });
        }
      }
    );
  };
  //다운그레이드 타입 결제
  const handleDowngrade = (index: number) => {
    console.log("다운그레이드");
    const impUid = "downgrade" + new Date();
    const actual_amount = subscriptions[index].price;
    nextMonthlist
      ? Promise.all([
          axios
            .get("/payment/nextList")
            .then((response) => {
              axios.put("/payment/" + response.data.id, {
                pay_check: false,
              });
              axios.put("/usageState/" + response.data.usageState.id, {
                subscription_check: false,
              });
            })
            .catch((error) => {
              console.log(error);
            }),
        ])
          .then((response) => {
            downgrade(index, actual_amount, impUid)
              .then(() => {
                doListAll();
                alert("다운그레이드가 완료되었습니다.");
              })
              .catch(() => {
                alert("다운그레이드가 완료되지 않았습니다. 다시 시도해주세요.");
              });
          })
          .catch((error) => {
            console.error(error.response.data);
          })
      : downgrade(index, actual_amount, impUid)
          .then(() => {
            doListAll();
            alert("다운그레이드가 완료되었습니다.");
          })
          .catch(() => {
            alert("다운그레이드가 완료되지 않았습니다. 다시 시도해주세요.");
          });
  };
  // const refundPayment = async (index:number) => {
  //     // 환불금액 구하기
  //         const currentDate:any = new Date();
  //         const subscriptionStartDate:any = new Date(usages?.start_date);
  //         const subscriptionEndDate:any = new Date(usages?.end_date);
  //         const usableDay  = Math.ceil((subscriptionEndDate - subscriptionStartDate ) / (1000 * 60 * 60 * 24));
  //         const useday  = Math.ceil((subscriptionEndDate - currentDate) / (1000 * 60 * 60 * 24));
  //         const refundAmount = useday / usableDay * subscription?.price
  //         const actual_amount = subscriptions[index].price; // Store payment_amount in a variable
  //     const response = await axios.post(
  //         "https://api.iamport.kr/payments/cancel",
  //         {
  //             imp_uid: payments.imp_uid,
  //             amount: refundAmount,
  //             reason: '다운그레이드',
  //         },
  //         {
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "Authorization": "Basic " + btoa("3173518987579725" + ":" + "debf9e6ce0e47675fd678fe5e647dbfdadbb2378f6ed8148b5373a2ebb33a33bbed2264b28d72699"),
  //             },
  //         }
  //     );
  //         if (response.data.success) {
  //             const impUid = response.data.imp_uid;
  //            // doDowngrade(index,actual_amount,impUid)
  //             alert('다운그레이드가 완료되었습니다.');
  //         } else {
  //             alert('다운그레이드가 완료되지 않았습니다. 다시 시도해주세요.')
  //         }
  //
  // };

  //이용 내역 테이블 데이터 조회
  const pay = (index: any, actual_amount: number, impUid: string) => {
    const data = {
      subscription_id: subscriptions[index].id,
      imp_uid: impUid,
      subscription_check: "true",
    };

    axios
      .post("/usageState/usage", data)
      .then((res) => {
        console.log(res);
        const usageStateId = res.data.id;
        const payment = {
          usageState: { id: usageStateId },
          imp_uid: impUid,
          subscription_id: subscriptions[index].id,
          origin_amount: subscriptions[index].price,
          payment_amount: actual_amount,
          pay_check: true,
        };
        try {
          axios.post("/payment/pay", payment);
          setTimeout(() => {
            doListAll();
          }, 500);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => console.log(err));
  };
  const upgrade = (index: number, actual_amount: number, impUid: string) => {
    return axios
      .get("/payment/list")
      .then((response) => {
        return axios.put("/usageState/" + response.data.usageState.id, {
          subscription_check: false,
        });
      })
      .then((response) => {
        return axios.put("/payment/" + response.data.id, {
          pay_check: false,
        });
      })
      .then(() => {
        pay(index, actual_amount, impUid);
      })
      .then(() => {
        if (nextMonthlist) {
          return axios.get("/payment/nextList").then((response) => {
            return axios.put("/usageState/" + response.data.usageState.id, {
              start_date: getDateAfterMonths(1, null),
            });
          });
        }
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const downgrade = (index: any, actual_amount: number, impUid: string) => {
    return axios
      .post("/usageState/usage", {
        subscription_id: subscriptions[index].id,
        imp_uid: impUid,
        subscription_check: "true",
        start_date: getDateAfterMonths(1, null),
      })
      .then((res) => {
        console.log(res);
        const usageStateId = res.data.id;
        const payment = {
          usageState: { id: usageStateId },
          imp_uid: impUid,
          subscription_id: subscriptions[index].id,
          origin_amount: subscriptions[index].price,
          payment_amount: actual_amount,
          pay_check: true,
        };
        try {
          axios.post("/payment/pay", payment);
          return doListAll();
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => console.log(err));
  };

  //console.log(thisMonthlist)
  //console.log(nextMonthlist)
  //console.log(payments)

  return (
    <div className="pass_component">
      <Header
        content={[{ link: "/main", name: "홈", type: "logo" }]}
      />
      <div className="pass_container">
        <h2>이용권</h2>
        <div className={"pass_type_container"}>
          {Array.isArray(subscriptions) &&
            subscriptions?.map((item: any, index: number) => (
              <div key={"subscriptions_list" + index}>
                <div className={"pass_type"}>
                  {thisMonthlist?.subscription_id === item?.id && (
                    <div className={"usage_pass"}>
                      <p>이용중</p>
                    </div>
                  )}
                  <p>{item.name}</p>

                  <button
                    onClick={() =>
                      // subscription?.price -> 기존 상품 가격 item.price -> 변경할 상품 가격
                      subscription?.price > item.price
                        ? handleDowngrade(index)
                        : subscription?.price < item.price
                        ? handleUpgrade(index)
                        : handleOnPay(index)
                    }
                    disabled={
                      thisMonthlist?.subscription_id === item.id ||
                      item.id === nextMonthlist?.subscription_id ||
                      (nextMonthlist?.subscription_id < item?.id &&
                        thisMonthlist?.subscription_id > item?.id)
                    }
                  >
                    <span>월간 이용권</span>
                    {item.price}원
                  </button>
                </div>
                {nextMonthlist?.subscription_id === item?.id ? (
                  <div className={"usage_pass_info"}>
                    <p>*다음달부터 적용됩니다.</p>
                  </div>
                ) : nextMonthlist?.subscription_id < item?.id &&
                  thisMonthlist?.subscription_id > item?.id ? (
                  <div className={"usage_pass_info"}>
                    <p>*다음달부터 적용된 상품이 이미 존재합니다.</p>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div>
  );
};

export default PassComponent;
