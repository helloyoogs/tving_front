/*eslint-disable*/
import React, {useState} from "react";
import axios from "axios/index";
import Endpoint from "./config/Endpoint";

const Header = (props:any) => {
    let [header_active, set_header_active] = useState<String[]|String>([" "]);

    function scroll_header() {
        if (scrollY > 0) {
            set_header_active(("active"));
        } else {
            set_header_active((" "));
        }
    }
    window.addEventListener("scroll", scroll_header);
  return (
    <header className={"header " + header_active} >
      <div className={'header_left'}>
      {props.content.map((item:any,index:number) => (
          !item.place &&
          item.type === 'logo' ?
              <a href={item.link} key={"header-" + index} className={item.type}>
                <h1 className={'logo'}>{item.name}</h1>
              </a>:
              !item.place &&
              <a href={item.link} key={"header-" + Math.random()} className={item.type}>
                {item.name}
              </a>
      ))}
      </div>
      <div className={'header_right'}>
        {props.content.map((item:any,index:number) => (
            item.place &&
                <div key={"header-" + index} className={item.type} onClick={item.clinkEventName ? item.clinkEventName : null}>
                    {item.img}
                </div>
        ))}

      </div>
            {props.content.map((item:any,index:number) => (
                item.place && item.list &&
                <div className={item.type === "search"? "search_popup" :"my_menu_popup"  }>
                <div key={"my_menu_popup"+index}>{item.list}</div>
                </div>
            ))}
    </header>
  );
};

export default Header;
