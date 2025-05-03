import Navbar2 from '../components/Navbar2';
import { useNavigate } from 'react-router-dom';

export const AIassistant = () => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar2 />

        <div className="container-fluid" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
          <div className="row align-items-center">
            {/* Left Half */}
            <div className="col-md-6">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/65fd9dc3088caa9883857ceb/Future-financial-technology-controlled-by-AI-robot-using-machine-learning-and/960x0.jpg?format=jpg&width=960"
                alt="Home Illustration"
                className="img-fluid rounded"
                style={{ maxHeight: "80vh", objectFit: "cover", marginTop: "70px" }}
              />
            </div>

            {/* Right Half */}
            <div className="col-md-6 text-white">
              <h1 style={{ fontSize: "3.5rem", marginTop: "40px" , marginLeft: "50px"}}>
                AI Powered <br /> Full Account Analysis
              </h1>
              <p style={{ fontSize: "1.3rem", marginTop: "30px" , marginLeft: "50px" }}>
                InvestTrack is your all-in-one platform for managing investments. Seamlessly connect your brokerage accounts, execute trades with one click, and leverage AI-powered insights to make informed decisions. Start optimizing your portfolio today and achieve your financial goals with InvestTrack.
              </p>
              <div className="mt-4">
                <button
                  className="btn btn-light me-3"
                  style={{ padding: "10px 20px", fontSize: "1.1rem" ,marginLeft: "50px", backgroundColor: "white", border: "none", color: "black" }}
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
