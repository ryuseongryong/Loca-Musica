function WordCloud({ hashtagsData }) {
  // console.log(hashtagsData);
  const dataForWordcloud = hashtagsData.map((el) => {
    return {
      text: el.name,
      value: el.likeCount,
    };
  });
  console.log("wordCloud를 위한 데이터", dataForWordcloud);
  return <div></div>;
}

export default WordCloud;
