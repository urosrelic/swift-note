import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className='landing-page'>
      <div id='landing-page-logo'>
        <div className='landing-page-logo-container'>
          <img src='/swift-note-logo.png' />
        </div>
      </div>
      <div className='landing-page-container'>
        <div className='landing-content'>
          <div id='landing-page-slogan'>
            <span id='slogan'>Where thoughts take flight effortlessly</span>
            <span id='sub-slogan'>
              Capture, organize, and soar with your ideas.
            </span>
          </div>
        </div>
      </div>
      <div className='landing-page-container'>
        <div className='landing-content'>
          <div className='app-examples'>
            <div className='app-example'>
              <img src='/iphone_example.png' alt='iPhone Example' />
              <div className='app-example-description'>
                <p>SwiftNote on iPhone</p>

                <svg
                  width='24px'
                  height='24px'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='#AAA'
                    fill-rule='evenodd'
                    d='M15.3007013,3.832 C16.1387013,2.818 16.7027013,1.405 16.5487013,0 C15.3407013,0.049 13.8797013,0.805 13.0137013,1.819 C12.2367013,2.717 11.5567013,4.154 11.7407013,5.531 C13.0867013,5.636 14.4627013,4.847 15.3007013,3.832 M18.3207013,12.75 C18.3547013,16.382 21.5067013,17.591 21.5417013,17.607 C21.5157013,17.692 21.0387013,19.329 19.8807013,21.02 C18.8807013,22.482 17.8427013,23.939 16.2067013,23.969 C14.5997013,23.998 14.0837013,23.016 12.2457013,23.016 C10.4097013,23.016 9.83570131,23.939 8.31370131,23.998 C6.73570131,24.058 5.53370131,22.417 4.52470131,20.961 C2.46370131,17.981 0.888701307,12.541 3.00370131,8.869 C4.05470131,7.045 5.93170131,5.89 7.96970131,5.861 C9.51970131,5.831 10.9827013,6.904 11.9307013,6.904 C12.8777013,6.904 14.6557013,5.614 16.5247013,5.803 C17.3077013,5.836 19.5037013,6.119 20.9147013,8.184 C20.8007013,8.254 18.2937013,9.714 18.3207013,12.75'
                  />
                </svg>
              </div>
            </div>
            <div className='app-example'>
              <img src='/android_example.png' alt='Android Example' />
              <div className='app-example-description'>
                <p>SwiftNote on android</p>

                <svg
                  width='24px'
                  height='24px'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.5915 3.88444C13.6002 3.32107 14.7626 3 16 3C17.2374 3 18.3998 3.32107 19.4085 3.88444L20.1464 3.14645C20.3417 2.95118 20.6583 2.95118 20.8536 3.14645C21.0488 3.34171 21.0488 3.65829 20.8536 3.85355L20.2612 4.44595C21.9266 5.72558 23 7.73743 23 10H9C9 7.73743 10.0734 5.72558 11.7388 4.44595L11.1464 3.85355C10.9512 3.65829 10.9512 3.34171 11.1464 3.14645C11.3417 2.95118 11.6583 2.95118 11.8536 3.14645L12.5915 3.88444ZM14 7C14 7.55228 13.5523 8 13 8C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7ZM19 8C19.5523 8 20 7.55228 20 7C20 6.44772 19.5523 6 19 6C18.4477 6 18 6.44772 18 7C18 7.55228 18.4477 8 19 8Z'
                    fill='#87C527'
                  />
                  <path
                    d='M5 12.5C5 11.6716 5.67157 11 6.5 11C7.32843 11 8 11.6716 8 12.5V18.5C8 19.3284 7.32843 20 6.5 20C5.67157 20 5 19.3284 5 18.5V12.5Z'
                    fill='#87C527'
                  />
                  <path
                    d='M12 24V27.5C12 28.3284 12.6716 29 13.5 29C14.3284 29 15 28.3284 15 27.5V24H17V27.5C17 28.3284 17.6716 29 18.5 29C19.3284 29 20 28.3284 20 27.5V24H21C22.1046 24 23 23.1046 23 22V11H9V22C9 23.1046 9.89543 24 11 24H12Z'
                    fill='#87C527'
                  />
                  <path
                    d='M24 12.5C24 11.6716 24.6716 11 25.5 11C26.3284 11 27 11.6716 27 12.5V18.5C27 19.3284 26.3284 20 25.5 20C24.6716 20 24 19.3284 24 18.5V12.5Z'
                    fill='#87C527'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='landing-page-container'>
        <div className='landing-content'>
          <Link to='/home' className='get-started-btn'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
