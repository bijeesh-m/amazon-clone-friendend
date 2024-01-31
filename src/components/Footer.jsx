import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="footer-main-div">
        <div className="footer-top cursor-pointer" onClick={scrollToTop}>
          Back to top
        </div>
        <div className="footer-mid">
          <div className="mt-5">
            <div className="mb-2" id="heading">
              Get to Know Us
            </div>
            <div className="mb-2">About Us</div>
            <div className="mb-2">Careers</div>
            <div className="mb-2">Press Releases</div>
            <div className="mb-2">Amazon Science</div>
          </div>
          <div className="footer-mid-text mt-5">
            <div className="mb-2" id="heading">
              Connect with Us
            </div>
            <div className="mb-2">Twitter</div>
            <div className="mb-2">Facebook</div>
            <div className="mb-2">Instagram</div>
          </div>
          <div className=" mt-5">
            <div className="mb-2" id="heading">
              Make Money with Us
            </div>
            <div className="mb-2">Sell on Amazon</div>
            <div className="mb-2">Sell under Amazon Acceleratoron</div>
            <div className="mb-2">Protect and Build Your Brand</div>
            <div className="mb-2">Amazon Global Selling</div>
            <div className="mb-2">Become an Affiliate</div>
            <div className="mb-2">Fulfilment by Amazon</div>
            <div className="mb-2">Amazon Pay on Merchants</div>
          </div>
          <div className="mt-5">
            <div className="mb-2" id="heading">
              Let Us Help You
            </div>
            <div className="mb-2">COVID-19 and Amazon</div>
            <div className="mb-2">Your Account</div>
            <div className="mb-2">Returns Centre</div>
            <div className="mb-2">100% Purchase Protection</div>
            <div className="mb-2">Amazon App Download</div>
            <div className="mb-2">Help</div>
          </div>
        </div>
        <hr />
        <div className="footer-down">
          <div className="footer-content">
            <img
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665506/amazon_6_ujssqw.png"
              width={74}
              alt="logo"
            />
            <div className="language">
              <img
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665515/glob_nkmjae.png"
                width={15}
                alt="glob"
              />
              <span className="language-drop">English</span>
              <img
                width={11}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665514/dropdown_dnnyh2.png"
                alt="dropdown"
              />
            </div>
          </div>
        </div>
        <div className="footer-down-main-div">
          <div className="footer-down-div">
            <div>Australia</div>
            <div>Brazil</div>
            <div>Canada</div>
            <div>China</div>
            <div>France</div>
            <div>Germany</div>
            <div>Italy</div>
            <div>Japan</div>
            <div>Mexico</div>
            <div>Netherlands</div>
            <div>Poland</div>
            <div>Singapore</div>
            <div>Spain</div>
            <div>Turkey</div>
            <div>United Arab Emirates</div>
          </div>
        </div>
        <div className="footer-down-main-div">
          <div className="footer-down-div-down">
            <div>United KIngdom</div>
            <div>United States</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
