/*eslint-disable*/
import React, { useState } from "react";
import "./common.css";
import Header from "./Header";
import "./OnBoardingComponent.css";
import P001587321 from './img/P001587321.jpg'
import P001613931 from './img/P001613931.jpg'
import P001594130 from './img/P001594130.jpg'
import P001616289 from './img/P001616289.jpg'
import F_webp_720_1 from './img/F_webp_720_1.webp'
import F_webp_720_2 from './img/F_webp_720_2.webp'
import F_webp_720_3 from './img/F_webp_720_3.webp'
import F_webp_720_4 from './img/F_webp_720_4.webp'
import P001616584 from './img/P001616584.webp'
import P001624993 from './img/P001624993.webp'
import P001602837 from './img/P001602837.webp'
import P001616345 from './img/P001616345.webp'
import P001619462 from './img/P001619462.webp'
import P001637397 from './img/P001637397.webp'
import P001635511 from './img/P001635511.webp'
import P001627603 from './img/P001627603.webp'
import P001635813 from './img/P001635813.webp'
import quickss from './img/quickss.png'

const OnBoardingComponent = () => {
  let [faq_active, set_faq_active] = useState<Number>();
  let [wheel_active, set_wheel_active] = useState<String[]|String>([" "]);
  const handleToggle = (index: number) => {
    set_faq_active((prevIndex) => (prevIndex === index ? -1 : index));
  };

  /* wheel,scrtoll 이벤트 header */
  function scroll_slider(e: MouseEvent): void {
    const content_wrap1: HTMLElement | null =
        document.querySelector(".content_wrap1");
    const content_wrap2: HTMLElement | null =
        document.querySelector(".content_wrap2");

    if (content_wrap1 && content_wrap2) {
      const content_wrap1_height: number = content_wrap1.clientHeight;
      const content_wrap2_height: number = content_wrap2.clientHeight;
      const scrollPosition: number =
          window.scrollY || document.documentElement.scrollTop;

      e.preventDefault();
      e.stopPropagation();
      const thresholds: number[] = [0, 0.25, 0.33, 0.5, 0.67, 1];
      const wheel_active_classes: string[] = [
        "active0",
        "active1",
        "active2",
        "active3",
        "active4",
        "active5",
      ];

      for (let i = 0; i < thresholds.length; i++) {
        if (
            scrollPosition >
            content_wrap1_height + content_wrap2_height * thresholds[i]
        ) {
          set_wheel_active(wheel_active_classes[i]);
        }
      }
    }
  }

  window.addEventListener("scroll", (e: Event) =>
      scroll_slider(e as MouseEvent)
  );

  const faqData = [
    {
      question: "쉽고 편리하게 FAQ 이용하기",
      answer:
          "새롭게 바뀐 '티빙 챗봇 FAQ'로 궁금한 점을 해결해 보세요. 자주 찾는 질문 답변들을 한 눈에 빠르게 찾아보실 수 있어 편리하게 이용 가능니다.\n\n■ 티빙 챗봇 이용 방법 안내\n① PC 및 모바일에서 웹 브라우저 실행 (크롬, 사파리, 엣지 등)\n② t-chat.tving.com 주소로 접속\n③ 티빙 챗봇에서 궁금한 내용 선택하여 이용\n\n\n티빙 이용에 궁금한 내용이 있으신 경우 티빙 챗봇에서 관련 문항을 선택하여 확인해 보세요.\n\n\n\n* IE 브라우저는 지원되지 않습니다.",
    },
    {
      question: "티빙 회원가입 방법이 궁금해요.",
      answer:
          "TVING 회원가입은 TVING ID, SNS ID, CJ ONE ID를 통해 가입이 가능합니다.\n\n■ 회원가입 ID 종류\n1. TVING ID : TVING에서만 사용하는 TVING 전용 ID\n2. SNS ID : 사용하시는 SNS (네이버, 카카오, 페이스북, 트위터, Apple)의 계정을 연동하여 가입하는 ID\n3. CJ ONE ID : CJ ONE 통합 멤버십 ID\n\n■ 회원가입 방법\n1. WEB : 티빙 시작하기 → TVING 아이디, CJ ONE 아이디, SNS 아이디 (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 회원가입\n2. APP : 티빙 시작하기 → TVING 아이디, CJ ONE 아이디, SNS 아이디 (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 회원가입",
    },    {
      question: "티빙 로그인 방법이 궁금해요.",
      answer:
          "티빙 로그인은 TVING ID, SNS ID, CJ ONE ID를 통해 로그인이 가능합니다.\n\n■ 로그인 ID 종류\n1. TVING ID : TVING에서만 사용하는 TVING 전용 ID\n2. SNS ID : 사용하시는 SNS (네이버, 카카오, 페이스북, 트위터, Apple)의 계정을 연동하여 로그인하는 ID\n3. CJ ONE ID : CJ ONE 통합 멤버십 ID\n\n■ 로그인 방법\n1. WEB : 티빙 접속 → 상단 우측 '로그인' 클릭 → TVING ID, CJ ONE ID, SNS ID (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 로그인\n2. APP : 티빙 앱 실행 → 하단 'MY 티빙' 탭 선택 → '로그인' 버튼 클릭 → TVING ID, CJ ONE ID, SNS ID (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 로그인",
    },
  ];
  const wheelImgList = [
    {
      pcSrc: P001587321,
      mobileSrc: F_webp_720_1
    },
    {
      pcSrc: P001613931,
      mobileSrc: F_webp_720_2
    },    {
      pcSrc: P001594130,
      mobileSrc: F_webp_720_3
    },
    {
      pcSrc: P001616289,
      mobileSrc: F_webp_720_4
    },
  ];
  return (
    <div className="onboarding_component">
      <Header content={[{ link: "/", name: "홈", type: "logo" }]}  />

      <div className="content_wrap1">
        <div className="main_content">
          <p>티빙 오리지널 콘텐츠,</p>
          <p>방송, 영화, 해외시리즈까지!</p>
          <p>재미를 플레이해보세요.</p>
          <p>간편하게 가입하고, 원하실 때 해지할 수 있어요.</p>
          <a href={"/login"}>새로워진 티빙을 만나보세요!</a>
        </div>
      </div>

      <div className={"content_wrap2 "}>
        <div className="main_content">
          <p>티빙에만 있는 재미</p>
          <p>오리지널 콘텐츠를 만나보세요!</p>
          <p>차별화된 웰메이드 오리지널 콘텐츠</p>
        </div>
        <div className="wheel_wrap">
          <ul className={"wheel_img " + wheel_active}>
            {wheelImgList .map((item, index) => (
                <li key={"wheelImgList-"+index} className={"wheel_img_box " + wheel_active}>
                  <img src={item.pcSrc} alt=""/>
                  <img src={item.mobileSrc} alt=""/>
                </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content_wrap3">
        <div className="main_content">
          <p>내가 찾던 재미</p>
          <p>보고싶은 콘텐츠를 발견하세요!</p>
          <p>최신 인기 TV프로그램,영화,해외시리즈</p>
        </div>
        <div className="wrapper_wrap">
          <article className="wrapper">
            <div className="marquee">
              <div className="marquee__group">
                <img src={P001616584} alt=""/>
                <img src={P001624993} alt=""/>
                <img src={P001613931} alt=""/>
                <img src={P001602837} alt=""/>
                <img src={P001616345} alt=""/>
              </div>
              <div className="marquee__group" aria-hidden="true" >
                <img src={P001616584} alt=""/>
                <img src={P001624993} alt=""/>
                <img src={P001613931} alt=""/>
                <img src={P001602837} alt=""/>
                <img src={P001616345} alt=""/>
              </div>
            </div>
            <div className="marquee marquee--reverse">
              <div className="marquee__group">
                <img src={P001619462} alt=""/>
                <img src={P001637397} alt=""/>
                <img src={P001635511} alt=""/>
                <img src={P001627603} alt=""/>
                <img src={P001635813} alt=""/>
              </div>

              <div  className="marquee__group" aria-hidden="true">
                <img src={P001619462} alt=""/>
                <img src={P001637397} alt=""/>
                <img src={P001635511} alt=""/>
                <img src={P001627603} alt=""/>
                <img src={P001635813} alt=""/>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="content_wrap4">
        <div className="main_content">
          <p>똑똑하게 보는 재미</p>
          <p>최신 방송을 가장 빠르고 간편하게 시청하세요!</p>
          <p>실시간TV,퀵VOD,타임머신 기능으로 기다리지말고 편리하게 시청</p>
        </div>
        <div className="main_content_img">
          <video muted autoPlay loop>
            <source src="video/smart_all.mp4" type="video/mp4" />
          </video>
          <img src={quickss} alt=""/>
        </div>
      </div>

      <div className="content_wrap5">
        <div className="main_content">
          <p>함께 즐기는 재미</p>
          <p>다양한 기기로 즐겨보세요!</p>
          <p>
            스마트폰,태블릿,PC,TV,크롬캐스트에서 시청 <br />
            최대4명의 지인들과 함께 구독{" "}
          </p>
        </div>
        <div className="main_content_img">
          <video muted autoPlay loop >
            <source src="video/together_pc.mp4"  type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="content_wrap6">
        <div className="main_content">
          <img src="./img/tving_new_logo_pc.svg" alt=""/>
          <p>지금 시작해보세요</p>
          <a href={"/login"}>새로워진 티빙을 만나보세요!</a>
        </div>
      </div>
      <div className="content_wrap7">
        <div className="main_content">
          <p>자주 찾는 질문</p>
        </div>
        <ul>
          {faqData .map((faq, index) => (
              <li key={"faqData" + index}   className={`faq ${faq_active === index ? "active" : ""}`}>
                <h2
                    className={'faq_question'}
                    onClick={() => handleToggle(index)}
                >
                  {faq.question}
                </h2>
                <div className={'faq_answer'}>
                  <p>{faq.answer}</p>
                </div>
              </li>
          ))}
        </ul>
      </div>
      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div>
  );
}

export default OnBoardingComponent;
