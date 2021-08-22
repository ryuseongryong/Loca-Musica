import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function BookmarkList() {
  let history = useHistory();
  // bookmarksData 정보 가져오기
  const bookmarksData = useSelector((state) => state.userReducer.bookmarksData);
  // console.log("마이페이지: 북마크리스트를 보여줘", bookmarksData);
  // 핸들러 함수
  //# 클릭하면 상세페이지로 이동
  const moveToDetailRequestHandler = (event) => {
    const title = event.target.alt;
    // console.log("보여줘", title);
    history.push(`/musical/${title}`);
  };

  return (
    <>
      {/* bookmarksData가 length === 0 이면 p태그, 아니면 배열을 map으로 리스트화해서 보여줌*/}
      <ul className="bookmarksDataWrap">
        {bookmarksData.length === 0 ? (
          <p>북마크한 뮤지컬이 없습니다.</p>
        ) : (
          bookmarksData.map((el, index) => (
            <li className="" key={index}>
              <img
                className="bookmarkimg"
                src={el.thumbnail}
                alt={el.title}
                onClick={moveToDetailRequestHandler}
              />
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default BookmarkList;
