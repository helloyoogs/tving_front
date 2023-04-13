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
  let [faq_active, set_faq_active] = useState<String[]|String>([" "]);
  let [header_active, set_header_active] = useState<String[]|String>([" "]);
  let [wheel_active, set_wheel_active] = useState<String[]|String>([" "]);
  /* wheel,scrtoll 이벤트 header */
  function scroll_slider(e:any) {
    const content_wrap1:any =
        document.querySelector(".content_wrap1")
    const content_wrap2:any =
        document.querySelector(".content_wrap2")
    const content_wrap1_height =
        content_wrap1.clientHeight;
    const content_wrap2_height =
        content_wrap2.clientHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    e.preventDefault();
    e.stopPropagation();

    if (scrollPosition > 0) {
      set_wheel_active((wheel_active = "active0"));
    }
    if (scrollPosition > content_wrap1_height + content_wrap2_height / 4) {
      set_wheel_active((wheel_active = "active1"));
    }
    if (scrollPosition > content_wrap1_height + content_wrap2_height / 3) {
      set_wheel_active((wheel_active = "active2"));
    }
    if (scrollPosition > content_wrap1_height + content_wrap2_height / 2) {
      set_wheel_active((wheel_active = "active3"));
    }
    if (scrollPosition > content_wrap1_height + content_wrap2_height / 1.5) {
      set_wheel_active((wheel_active = "active4"));
    }
    if (scrollPosition > content_wrap1_height + content_wrap2_height) {
      set_wheel_active((wheel_active = "active5"));
    }
  }
  window.addEventListener("scroll", scroll_slider);
  window.addEventListener("touchScroll", scroll_slider);

  function scroll_header() {
    if (scrollY > 0) {
      set_header_active(("active"));
    } else {
      set_header_active((" "));
    }
  }
  window.addEventListener("scroll", scroll_header);
  return (
    <div className="onboarding_component">
      <Header content={[{ link: "/", name: "홈", type: "logo" }]} className={header_active} />

      <div className="content_wrap1">
        <div className="main_content">
          <p>티빙 오리지널 콘텐츠,</p>
          <p>방송, 영화, 해외시리즈까지!</p>
          <p>재미를 플레이해보세요.</p>
          <p>간편하게 가입하고, 원하실 때 해지할 수 있어요.</p>
          <a href={"/login"}>새로워진 티빙을 만나보세요!</a>
        </div>
      </div>

      <div className={"content_wrap2 " + wheel_active}>
        <div className="main_content">
          <p>티빙에만 있는 재미</p>
          <p>오리지널 콘텐츠를 만나보세요!</p>
          <p>차별화된 웰메이드 오리지널 콘텐츠</p>
        </div>
        <div className="wheel_wrap">
          <ul className={"wheel_img " + wheel_active}>
            <li className={"wheel_img_box " + wheel_active}>
              <img src={P001587321} alt=""/>
              <img src={F_webp_720_1} alt=""/>
            </li>
            <li className={"wheel_img_box " + wheel_active}>
              <img src={P001613931} alt=""/>
              <img src={F_webp_720_2} alt=""/>
            </li>
            <li className={"wheel_img_box " + wheel_active}>
              <img src={P001594130} alt=""/>
              <img src={F_webp_720_3} alt=""/>
            </li>
            <li className={"wheel_img_box " + wheel_active}>
              <img src={P001616289} alt=""/>
              <img src={F_webp_720_4} alt=""/>
            </li>
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
              <div aria-hidden="true" className="marquee__group">
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

              <div aria-hidden="true" className="marquee__group">
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
          <li className="faq">
            <h2
              className={`${faq_active}`}
              onClick={() => {
                if (faq_active === "active0") {
                  set_faq_active((faq_active = " "));
                } else {
                  set_faq_active((faq_active = "active0"));
                }
              }}
            >
              쉽고 편리하게 FAQ 이용하기
            </h2>
            {faq_active === "active0" ? (
              <div>
                새롭게 바뀐 '티빙 챗봇 FAQ'로 궁금한 점을 해결해 보세요.
                <br />
                자주 찾는 질문 답변들을 한 눈에 빠르게 찾아보실 수 있어 편리하게
                이용 가능니다.
                <br />
                <br />■ 티빙 챗봇 이용 방법 안내
                <br />① PC 및 모바일에서 웹 브라우저 실행 (크롬, 사파리, 엣지
                등)
                <br />② t-chat.tving.com 주소로 접속
                <br />③ 티빙 챗봇에서 궁금한 내용 선택하여 이용
                <br />
                <br />
                <br />
                티빙 이용에 궁금한 내용이 있으신 경우 티빙 챗봇에서 관련 문항을
                선택하여 확인해 보세요.
                <br />
                <br />
                <br />* IE 브라우저는 지원되지 않습니다.
              </div>
            ) : null}
          </li>
          <li className="faq">
            <h2
              className={`${faq_active}`}
              onClick={() => {
                if (faq_active === "active1") {
                  set_faq_active((faq_active = " "));
                } else {
                  set_faq_active((faq_active = "active1"));
                }
              }}
            >
              티빙 회원가입 방법이 궁금해요.
            </h2>
            {faq_active === "active1" ? (
              <div>
                TVING 회원가입은 TVING ID, SNS ID, CJ ONE ID를 통해 가입이
                가능합니다.
                <br />
                <br />■ 회원가입 ID 종류 <br />
                1. TVING ID : TVING에서만 사용하는 TVING 전용 ID <br />
                2. SNS ID : 사용하시는 SNS (네이버, 카카오, 페이스북, 트위터,
                Apple)의 계정을 연동하여 가입하는 ID <br />
                3. CJ ONE ID : CJ ONE 통합 멤버십 ID <br />
                <br />■ 회원가입 방법 <br />
                1. WEB : 티빙 시작하기 → TVING 아이디, CJ ONE 아이디, SNS 아이디
                (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 회원가입{" "}
                <br />
                2. APP : 티빙 시작하기 → TVING 아이디, CJ ONE 아이디, SNS 아이디
                (네이버, 카카오, 페이스북, 트위터, Apple) 중 1개 선택 → 회원가입
              </div>
            ) : null}
          </li>
          <li className="faq">
            <h2
              className={`${faq_active}`}
              onClick={() => {
                if (faq_active === "active2") {
                  set_faq_active((faq_active = " "));
                } else {
                  set_faq_active((faq_active = "active2"));
                }
              }}
            >
              티빙 로그인 방법이 궁금해요.
            </h2>
            {faq_active === "active2" ? (
              <div>
                TVING WEB과 APP은 아래와 같은 방법으로 로그인이 가능합니다.
                <br />
                <br />■ TVING 로그인 방법
                <br />
                1) 티빙 WEB/APP 접속
                <br />
                2) '티빙 시작하기' 버튼 클릭
                <br />
                3) 계정 선택화면에서 회원가입하신 계정 유형 선택
                <br />
                4) 아이디, 비밀번호 입력 후 '로그인하기' 버튼 클릭
                <br />
                <br />
                혹시 일치하는 회원정보가 없다는 알림 메시지가 나오신다면 아래
                사항을 확인하여 주세요. <br />
                <br />■ TVING 로그인 안될 시 조치 방법
                <br />
                1) WEB 브라우저 또는 APP 좌측 상단의 '뒤로가기'를 클릭하여 계정
                유형 선택 화면으로 이동
                <br />
                2) 회원가입한 유형을 다시 확인하여 선택
                <br />- CJ ONE 통합회원이신 경우 'CJ ONE으로 시작하기' 선택
                (제일 밑에 위치)
                <br />- TVING ID로 가입하신 경우 'TVING ID로 시작하기' 선택
                <br />- 네이버, 카카오 등 SNS 연동 계정으로 가입하신 경우 '각
                SNS로 시작하기' 선택
                <br />
                3) 아이디, 비밀번호 입력 후 '로그인하기' 버튼 클릭하여 로그인
                <br />
                <br />* 'TVING ID'로 로그인 시도하셨는데 일치하는 회원정보가
                없다면 먼저 'CJ ONE으로 시작하기'를 선택하여 확인을
                부탁드립니다.
                <br />* 아이디가 이메일 형태의 계정인데 'TVING ID'로 로그인이
                안되시는 경우 SNS 연동 회원일 수 있으며, 네이버, 카카오 등 '각
                SNS로 시작하기'를 선택하여 확인을 부탁드립니다. <br />* 계정
                유형을 맞게 선택하신 경우 '아이디 찾기', '비밀번호 찾기'를
                진행해 주세요.
                <br />
                <br />
                지속해서 로그인이 되지 않으시는 경우 1:1 게시판 문의 또는
                tving@cj.net 으로 문의해 주시면,
                <br />
                신속하게 가입하신 계정 확인하여 답변드리겠습니다.
                <br />
              </div>
            ) : null}
          </li>
          <li className="faq">
            <h2
              className={`${faq_active}`}
              onClick={() => {
                if (faq_active === "active3") {
                  set_faq_active((faq_active = " "));
                } else {
                  set_faq_active((faq_active = "active3"));
                }
              }}
            >
              티빙 이용권 별 판매 가격과 혜택이 궁금해요.
            </h2>
            {faq_active === "active3" ? (
              <div>
                <div className="css-kg6wc6 e1bav4i39">
                  <p className="css-14fewbl e1bav4i38">
                    <div>
                      PC, 모바일웹, 스마트TV에서 구매 시 Google/Apple 인앱결제
                      이용권보다 저렴한 가격으로 티빙을 이용하실 수 있습니다.
                      <br />
                      <br />
                      티빙 이용권은 베이직, 스탠다드, 프리미엄 이용권으로 구성이
                      되어 있으며,
                      <br />
                      네이버 플러스 멤버쉽 가입 후, 디지털 서비스에서 티빙을
                      선택하시면 이용하실 수 있는 방송 무제한 이용권도 준비되어
                      있습니다. <br />
                      <br />※ 티빙 이용권 (PC, 모바일웹 구매 시)
                      <br />
                      1) 베이직 이용권 <br />- 실시간 + TV프로그램 +
                      영화(개별구매 제외), 720p HD 화질 이용 가능 (모바일 + PC){" "}
                      <br />- 동시 시청 1명 <br />- (월간) 7,900원 / (연간)
                      71,000원&nbsp;
                      <br />* 2022-05-18 ~ 06-30 기간동안 연간이용권 40% 할인
                      이벤트로 56,800원에 구매하실 수 있습니다.
                      <br />
                      <br />
                      2) 스탠다드 이용권 <br />- 실시간 + TV프로그램 +
                      영화(개별구매 제외), 1080p FHD 화질 이용 가능 (모든
                      디바이스) <br />- 동시 시청 2명 <br />- (월간) 10,900원 /
                      (연간) 98,000원 <br />* 2022-05-18 ~ 06-30 기간동안
                      연간이용권 40% 할인 이벤트로 78,400원에 구매하실 수
                      있습니다.
                      <br />
                      <br />
                      3) 프리미엄 이용권 <br />- 실시간 + TV프로그램 +
                      영화(개별구매 제외), 1080p FHD(모든 디바이스) + 4K
                      화질(스마트TV 일부 콘텐츠 한정) 이용 가능 <br />- 동시
                      시청 4명 <br />- (월간) 13,900원 / (연간) 125,000원
                      <br />
                      &nbsp;* 2022-05-18 ~ 06-30 기간동안 연간이용권 40% 할인
                      이벤트로 100,000원에 구매하실 수 있습니다.
                      <br />
                      <br />
                      4) 방송 무제한 (네이버플러스 멤버십) <br />- 실시간 + TV
                      프로그램 + T ONLY 콘텐츠 시청, 720p HD 화질 이용 가능{" "}
                      <br />
                      - T ORIGINAL 콘텐츠, 파라마운트+ 콘텐츠, 월정액 영화
                      콘텐츠는 시청 불가
                      <br />- 동시 시청 1명
                      <br />* 네이버플러스 멤버십 이용권의 가격은 네이버의
                      정책을 따릅니다.
                    </div>
                  </p>
                </div>
              </div>
            ) : null}
          </li>
        </ul>
      </div>

      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div>
  );
}

export default OnBoardingComponent;
