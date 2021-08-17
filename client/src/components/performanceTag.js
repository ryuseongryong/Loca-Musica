function PerformanceTag() {
  return (
    <div>
      <div className="pfTagWrap">
        <p className="pfItem">태그</p>
        {/* 태그리스트 구현 필요 */}
        <form>
          <input
            className="inputHashtag"
            name="hashtag"
            type="text"
            placeholder="# 새 태그 등록"
          />
        </form>
      </div>
    </div>
  );
}
export default PerformanceTag;
