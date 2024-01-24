import './Loading.css'

const Loading = () => {

  return (
    // Loading Animation.
    // They sure love using divs
    <div className="loading-container">
      <div className="loading-text">Loading...</div>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loading;