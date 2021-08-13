import '../css/Search.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Search({ setIsRecommend }) {
	// react-slider require object
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true
	};

	const replayRecommend = () => {
		setIsRecommend(true);
	}

	return (
		<div className='search-container'>
			<div className='search-main'>
				<div className='search-section1'></div>
				<div className='search-section2'>
					<div className='search-section2-top'>
						<div className='search-result-info-div'>
							<p className='search-result-info'>선택하신 결과에 따른 추천 작품입니다.</p>
						</div>
					</div>
					<div className='search-section2-middle'>
						<ul className='search-result-list'>
							<li className='search-result-musical'>
								<img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF156128_191015_094221.jpg"
									alt="musical-image" className='search-result-musical-image' />
							</li>
							<li className='search-result-musical'>
								<img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF171092_210119_100127.gif"
									alt="musical-image" className='search-result-musical-image' />
							</li>
							<li className='search-result-musical'>
								<img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF155057_190925_092515.gif"
									alt="musical-image" className='search-result-musical-image' />
							</li>
						</ul>
						{/* 추천결과가 없는 경우 */}
						{/* <ul className='search-result-list'>
                            <li className='search-result-musical'>
                                <p className='no-search-result'>이런! 추천결과가 없습니다.</p>
                            </li>
                        </ul> */}
					</div>
					<div className='search-section2-bottom'>
						<button className='search-replay-btn' onClick={replayRecommend}>다시 추천받기 &nbsp;{'>'}</button>
					</div>
				</div>
				<div className='search-section3'></div>
			</div>
		</div>
	)
}

export default Search;