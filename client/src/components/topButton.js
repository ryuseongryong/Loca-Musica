import { BiArrowToTop } from "react-icons/bi";
import "../css/TopButton.css";


export default function TopButton() {
	// top버튼 클릭 맨위 이동
	const gotoTop = (event) => {
		window.scrollTo(0, 0);
		// window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤이 올라감
	}

	return (
		<button className='top-btn' onClick={gotoTop}><BiArrowToTop className='top-btn-icon' /></button>
	);
}
