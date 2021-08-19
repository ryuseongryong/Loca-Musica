import { useSelector } from "react-redux";

function BookmarkList() {
  // bookmarksData 정보 가져오기
  const bookmarksData = useSelector((state) => state.bookmarkReducer);
  // console.log("마이페이지: 북마크리스트를 보여줘", bookmarksData);

  return (
    <>
      {/* bookmarksData가 length === 0 이면 p태그, 아니면 배열을 map으로 리스트화해서 보여줌*/}
      <ul className="bookmarksDataWrap">
        {bookmarksData.length === 0 ? (
          <p>북마크한 뮤지컬이 없습니다.</p>
        ) : (
          bookmarksData.map((el, index) => (
            <li className="" key={index}>
              <img className="bookmarkimg" src={el.thumbnail} alt={el.title} />
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default BookmarkList;
