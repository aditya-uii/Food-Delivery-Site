const Header = () => {
  return (
    <div className='header h-[50vw] md:h-[34vw] my-7 mx-auto bg-[url(/header_img.png)] bg-cover bg-no-repeat relative'>
      <div className="header-content absolute flex flex-col items-start gap-4 md:gap-[1.5vw] max-w-[90%] md:max-w-[50%] bottom-[10%] left-6 md:left-[6vw] px-5 md:px-0">
        
        <h2 className="font-semibold text-white text-[7vw] md:text-[4vw] leading-tight">
          Order your favourite food here
        </h2>

        <p className="text-white text-[4vw] md:text-[1.2vw]">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
        </p>

        <button className="border-none text-[4vw] md:text-[1vw] font-medium bg-white text-[#747474] rounded-xl py-2 md:py-[1vw] px-5 md:px-[2.3vw]">
          View menu
        </button>
      </div>
    </div>
  )
}

export default Header;
