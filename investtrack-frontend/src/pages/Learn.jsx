import Navbar from '../components/Navbar';

export function Learn() {
  return (
    <>
      <div className="container-fluid mt-4" style={{ backgroundColor: "black" }}>
        <Navbar />
        <div
          className="background_image"
          style={{
            backgroundImage: `url("https://thumbs.dreamstime.com/b/ai-generated-laptop-screen-displaying-stock-market-charts-hand-holding-stylus-image-features-detailed-graphs-346279570.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', // Full viewport height for the image container
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '80px',
            flexGrow: 1, // Allows the section to grow if there’s more content
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              color: "white",
              textAlign: "center",
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Smarter Investment <br /> Management with <br /> InvestTrack
          </h1>

          <p
            style={{
              color: "white",
              fontSize: "1.4rem",
              textAlign: "center",
              marginTop: "40px"
            }}
          >
            InvestTrack simplifies investment management by integrating with <br/> multiple brokerage accounts. Execute trades with one click and gain AI<br/>-powered insights for informed decisions. View your detailed portfolio and <br/>leverage our proprietary ML model for enhanced data analysis.
          </p>
          
          <button
            className="btn btn-primary"
            style={{
              margin: "40px auto 0",
              backgroundColor: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1.2rem",
              color: "black",
              width: "fit-content",
              fontFamily: 'Roboto, sans-serif',
            }}
            onClick={() => window.location.href = '/signup'}
          >
            Sign Up
          </button>         
        </div>

        {/* Additional content below */}
        <div style={{ padding: '40px', color: 'white', backgroundColor: 'white' }}>
          <h2>Additional Content</h2>
          <p>Here is some more content that will make the page scrollable.</p>

          {/* Dividing the content into left and right halves */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* Left Half */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'white',
                backgroundImage: `url("https://aisite.10web.io/69/wp-content/uploads/sites/171/2025/05/tenweb_media_sfntodyua.webp")`,  // Corrected here
                backgroundSize: 'cover', // Ensures the image fully covers the div
                backgroundPosition: 'center', // Centers the image
                minHeight: '400px', // Adjusted height
                padding: '20px',
              }}
            >
            </div>

            {/* Right Half */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'white',
                padding: '20px',
              }}
            >
              <h1 style={{ fontWeight: 'bold', color: 'black', fontSize: '3rem', textAlign: 'left', marginLeft: '20px' }}>Key Benefits of InvestTrack</h1>
              <p style={{ color: 'black', fontSize: '1.4rem', textAlign: 'left', marginTop: '20px',marginLeft: '20px' }}>
                 InvestTrack offers a range of features designed to enhance your investment experience. From seamless integration with brokerage accounts to an AI assistant that provides personalized insights, our platform is built for efficiency and effectiveness.
              </p>
              {/* First Row */}
              <div style={{ display: 'flex', marginTop: '40px', marginLeft: '20px' }}>
                <div style={{ marginRight: '60px' }}>
                  <h2 style={{ fontWeight: 'bold', color: 'black', fontSize: '2rem' }}>100%</h2>
                  <p style={{ color: 'black', fontSize: '1rem' }}>Users can connect multiple accounts effortlessly.</p>
                </div>
                <div>
                  <h2 style={{ fontWeight: 'bold', color: 'black', fontSize: '2rem' }}>1000 orders</h2>
                  <p style={{ color: 'black', fontSize: '1rem' }}>Experience one-click order execution for hassle-free trading</p>
                </div>
              </div>

              {/* Second Row */}
              <div style={{ display: 'flex', marginTop: '40px', marginLeft: '20px' }}>
                <div style={{ marginRight: '60px' }}>
                  <h2 style={{ fontWeight: 'bold', color: 'black', fontSize: '2rem' }}>24 hours</h2>
                  <p style={{ color: 'black', fontSize: '1rem' }}>Our AI assistant is available 24/7 to assist you.</p>
                </div>
                <div>
                  <h2 style={{ fontWeight: 'bold', color: 'black', fontSize: '2rem' }}>100 accounts</h2>
                  <p style={{ color: 'black', fontSize: '1rem' }}>Easily manage up to 100 brokerage accounts in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
