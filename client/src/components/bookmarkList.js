import { useSelector } from "react-redux";

function BookmarkList() {
  // bookmarkList 정보 가져오기
  const bookmarkList = useSelector(
    (state) => state.bookmarkReducer.bookmarkList
  );
  // console.log("마이페이지: 북마크리스트를 보여줘", bookmarkList);

  return (
    <div id="bookmarkListWrap">
      {/* 북마크리스트 length === 0 이면 p태그, 아니면 배열을 map으로 리스트화해서 보여줌*/}
      <ul>
        {bookmarkList.length === 0 ? (
          <p className="c_4D4D4D">북마크한 뮤지컬이 없습니다.</p>
        ) : (
          bookmarkList.map((performance) => (
            <li className="" key={performance.id}>
              {/* <img /> */}
              {performance}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BookmarkList;
