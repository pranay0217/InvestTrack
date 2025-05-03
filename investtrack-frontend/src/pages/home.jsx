import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLearn = () => {
        navigate('/learn');
    };

    return (
      <>
        <div className="container-fluid mt-4" style={{backgroundColor: "black"}}>
        <Navbar />
      <div className="row">
        {/* Left Half */}
        <div className="col-md-6">
        <img
            src="https://aisite.10web.io/69/wp-content/uploads/sites/171/2025/05/tenweb_media_rkzkpzev6.webp"  // Make sure this path is correct
            alt="Home Illustration"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Half */}
        <div className="col-md-6" style={{ marginTop: "50px" }}>
          <h1 style={{ fontSize: "4rem" , color : "white", marginTop: "50px"}}>Unlock Your Investment Potential with InvestTrack</h1>
          <p style={{ color: "white" , fontSize: "1.4rem" , marginTop: "40px"}}>InvestTrack is your all-in-one platform for managing investments. Seamlessly connect your brokerage accounts, execute trades with one click, and leverage AI-powered insights to make informed decisions. Start optimizing your portfolio today and achieve your financial goals with InvestTrack.</p>
          <div className="buttons" style={{ marginTop: "50px", color: "white" }}>
            <button className="btn btn-primary " onClick={handleLearn} style={{ marginRight: "20px", backgroundColor: "white", border: "none", padding: "10px 20px", fontSize: "1.2rem", color: "black" }}>Learn</button>
            <button className="btn btn-primary " onClick={handleSignUp} style={{ backgroundColor: "black", border: "2px solid white", padding: "10px 20px", fontSize: "1.2rem", color: "white", ':hover': { backgroundColor: 'white', color: 'black' } }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      </>
    ); 
  };