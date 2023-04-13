/*eslint-disable*/
import React from "react";
import axios from "axios/index";
import Endpoint from "./config/Endpoint";

const Header = (props:any) => {

  return (
    <header className={"header " + props.className}>
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
                <div key={"header-" + index} className={item.type}>
                    {item.img}
                </div>
        ))}
      </div>
        <div className={"my_menu_popup"}>
            {props.content.map((item:any,index:number) => (
                item.place &&
                <div key={"my_menu_popup"+index}>{item.list}</div>
            ))}
        </div>
    </header>
  );
};

export default Header;
