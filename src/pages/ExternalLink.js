import React from "react";
import { Image } from "antd";




export default function ExternalLink() {

  const externalLinks=[
    {
      'name':'강남맛집',
      'url':'https://xn--939au0g4vj8sq.net',
      'imageUrl':'/강남맛집.png'
    },
    {
      'name':'놀러와체험단',
      'url':'https://www.cometoplay.kr/index.php',
      'imageUrl':'/놀러와체험단.png'
    },
    {
      'name':'디너의여왕',
      'url':'https://dinnerqueen.net',
      'imageUrl':'/디너의여왕.png'
    },
    {
      'name':'데일리뷰',
      'url':'https://www.dailyview.kr',
      'imageUrl':'/데일리뷰.png'
    },
    {
      'name':'가보자체험단',
      'url':'http://xn--o39a04kpnjo4k9hgflp.com',
      'imageUrl':'/가보자체험단.png'
    },
    {
      'name':'미스터블로그',
      'url':'http://www.mrblog.net',
      'imageUrl':'/미스터블로그.png'
    },
    {
      'name':'오마이블로그',
      'url':'https://kormedia.co.k',
      'imageUrl':'/오마이블로그.png'
    },
    {
      'name':'서울오빠',
      'url':'https://www.seoulouba.co.kr',
      'imageUrl':'/서울오빠.png'
    },
    {
      'name':'레뷰',
      'url':'https://www.revu.net',
      'imageUrl':'/레뷰.png'
    },
    {
      'name':'리뷰플레이스',
      'url':'https://www.reviewplace.co.kr',
      'imageUrl':'/리뷰플레이스.png'
    },
    {
      'name':'체험뷰',
      'url':'https://chvu.co.kr/campaig',
      'imageUrl':'/체험뷰.png'
    },
    {
      'name':'리뷰노트',
      'url':'https://www.reviewnote.co.kr',
      'imageUrl':'/리뷰노트.png'
    },
    {
      'name':'클라우드뷰',
      'url':'https://www.cloudreview.co.kr',
      'imageUrl':'/클라우드뷰.png'
    },
  ]

  return (
    <div className="px-[5%] mt-10 grid grid-cols-3 lg:grid-cols-8 gap-2 justify-center text-xs md:text-lg ">
      {
        externalLinks.map( (elem)=>{
          return(
            <div
            type="button"
            class="hover:bg-gray-200 font-medium rounded-lg text-center flex items-center px-2 py-2 justify-center"
          >
            <a
              className="flex items-center no-underline"
              target="_blank"
              href={elem.url}
            >
              <div className="flex-col justify-center">
                <Image preview={false} src={elem.imageUrl}></Image>
                <span className="block ml-3 font-bold text-gray-600 ">{elem.name}</span>
              </div>
            </a>
          </div>
          )
        } )
      }


      
    </div>
  );
}
