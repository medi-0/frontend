
import Navbar from "../components/navbar/Navbar";
import img from "../Lib/assets/eth.png";
// import ABI from "../"


export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="h-[800px] flex items-center justify-around px-32">
        <div>
          <h1 className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-500 to-orange-300">
            Protect your privacy <br />
            at all cost with <br />
            Zk Form
          </h1>
          <br />
          <h1 className="text-[#81AFDD] font-bold text-lg">
            Share the information that you want safely by <br />
            using Zero Knowledge Proof
          </h1>
          <br />
          <button className="pb-[5px] text-center border border-solid rounded-full w-[150px] h-[60px] bg-[#60DA9A] text-[#fff] text-2xl font-semibold">
            Open App
          </button>
        </div>
        <div>
          <h1>
            <img className="" src={img} alt=""  width={700} height={700} />
          </h1>
        </div>
      </div>
    </div>
  );
}
