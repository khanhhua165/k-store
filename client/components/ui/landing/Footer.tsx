import {
  GrFacebookOption,
  GrTwitter,
  GrYoutube,
  GrInstagram,
} from "react-icons/gr";

const Footer = () => {
  return (
    <div className="flex flex-col w-full pb-2 bg-blue-800 text-gray-50 pt-7">
      <div className="flex justify-center mb-2 text-2xl font-bold">
        Real Food Lives on Grass
      </div>
      <div className="mb-5 text-center">
        V-mart brings you high quality, nutrient dense animal foods at an
        affordable price.
      </div>
      <div className="flex justify-center mb-2 text-2xl font-bold">
        Keep in Touch
      </div>
      <div className="flex items-center justify-center space-x-3">
        <div className="px-2 py-2 rounded-full cursor-pointer text-gray-600 bg-white hover:text-gray-50 hover:bg-[#3b5998] border border-gray-400">
          <GrFacebookOption />
        </div>
        <div className="px-2 py-2 rounded-full cursor-pointer text-gray-600 bg-white hover:text-gray-50 hover:bg-[#00acee] border border-gray-400">
          <GrTwitter />
        </div>
        <div className="px-2 py-2 rounded-full cursor-pointer text-gray-600 bg-white hover:text-gray-50 hover:bg-[#FF0000] border border-gray-400">
          <GrYoutube />
        </div>
        <div className="px-2 py-2 rounded-full cursor-pointer text-gray-600 bg-white hover:text-gray-50 hover:bg-[#e95950] border border-gray-400">
          <GrInstagram />
        </div>
      </div>
      <div className="flex justify-center mt-4">© 2021 V-mart</div>
    </div>
  );
};

export default Footer;
