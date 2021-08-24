// 뮤지컬 상세페이지에서 해시태그 등록하기
const { getPool } = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { title, hashtag } = req.body;

    const abuseDB = [
      '⠀',
      '⠀',
      '---',
      '▪️',
      '――',
      '- -',
      '― ―',
      '^^ 7',
      '^ ^ 7',
      '^^7',
      '^7',
      ';;',
      '^노^',
      '￣',
      '⊥',
      '─ ─',
      '━ ━',
      '──',
      '━━',
      '┴',
      '้',
      ' ̆̈',
      '1빠',
      '==',
      '2빠',
      '910이',
      '910일',
      '910임',
      'D쥐고',
      'D지고',
      'JMT',
      'jonna',
      'jot같',
      'mi쳤',
      'ssㅑ',
      'tlqkf',
      'wlfkf',
      'ㄱㅇㄷ',
      '가지가지',
      '같은 새끼',
      '같은새끼',
      '개새끼',
      '개같',
      '개나소나',
      '개나대',
      '개넷',
      '개년',
      '개념빠가',
      '개독',
      '개돼지',
      '개련',
      '개련',
      '개마이',
      '개부랄',
      '개삼성',
      '개새기',
      '개새끼',
      '개섹',
      '개셈',
      '개소리',
      '개쓰래기',
      '개저씨',
      '거른다',
      '거지같',
      '그지',
      '계새끼',
      '골빈',
      '골1빈',
      '골빈',
      '공개처형',
      '괘새끼',
      '구1씹',
      '구씹',
      '그1켬',
      '그나물에',
      '그따구',
      '그따위',
      '그지같',
      '그켬',
      '극1혐',
      '극혐',
      '글러',
      '글러먹',
      '기레기',
      '기자레기',
      '김치녀',
      '한녀',
      '된장녀',
      '피싸개',
      '앙기모띠',
      '보이루',
      '퍄퍄',
      '방구석',
      '눈나',
      '김여사',
      '여적여',
      '보적보',
      '잼민',
      '삼일한',
      '보슬아치',
      '보징어',
      '엑윽',
      '헤으응',
      '이기야',
      '노무',
      '부왘',
      '보픈카',
      '보라니',
      '상폐녀',
      '배빵',
      '누보햄',
      '찌질',
      '자박꼼',
      '로린',
      '아몰랑',
      '업계포상',
      '쿵쾅',
      '쿵.쾅',
      '펨베',
      '펨코',
      '허벌',
      '쿰.척',
      '쿰척',
      'ㅗㅜㅑ',
      '오우야',
      '까내리',
      '껒여',
      '꺼지세요',
      '꺼져요',
      '꺼져',
      '로꺼져',
      '로꺼.져',
      '꺼.지',
      '꼬라지',
      '꼬라지',
      '꼴갑',
      '꼴값',
      '꼴깝',
      '꼴데',
      '꼴랑',
      '꼴보기',
      '꼴뵈기',
      '나빼썅',
      '나쁜새끼',
      '넌씨눈',
      '년놈',
      '노무노무',
      '노알라',
      '노인네',
      '노친네',
      '느그',
      '뇌1텅',
      '뇌에',
      '뇌텅',
      '뇌피셜',
      '눈깔',
      '눈깔파',
      '눈새',
      '늬믜',
      '늬미',
      '니년',
      '니믜',
      '니미럴',
      '닝기리',
      'ㄷㅇㅂ',
      '다꺼져',
      '닥1',
      '닥2',
      '닥전',
      '닥쳐라',
      '닥치세',
      '닥후',
      '대가리',
      '대갈',
      '더럽네',
      '덜떨어',
      '덬',
      '도라이',
      '도랏',
      '도랐',
      '도른',
      '돌앗구만',
      '돌앗나',
      '돌앗네',
      '돌았구만',
      '돌았나',
      '돌았네',
      '둄마',
      '뒈져',
      '뒤져라',
      '뒤져버',
      '뒤져야',
      '뒤져야지',
      '뒤져요',
      '뒤졌',
      '뒤지겠',
      '뒤지고싶',
      '뒤지길',
      '뒤진다',
      '뒤질',
      '듣보',
      '디져라',
      '디졌',
      '디지고',
      '디질',
      '딴년',
      '또라이',
      '또라인',
      '똘아이',
      '아재',
      '뚝배기',
      '뚤린입',
      '뚫린입',
      '라면갤',
      '런년',
      '럼들',
      '레1친',
      '레기같',
      '레기네',
      '레기다',
      '레친',
      '롬들',
      'ㅁ.ㄱ',
      'ㅁㅊ',
      'ㅁ친',
      '미새',
      '내뱉',
      '막내뱉',
      '맘충',
      '망돌',
      '망해라',
      '머갈',
      '머가리',
      '머리텅',
      '먹.금',
      '먹.끔',
      '먹1금',
      '먹금',
      '먹끔',
      '명존',
      '무개념',
      '뭐래는',
      '뭐임',
      '뭐저래',
      '뭔솔',
      '믜칀',
      '믜친',
      '미:놈',
      '미1친',
      '미놈',
      '미시친발',
      '미쳣네',
      '미쳤나',
      '미쳤니',
      '미췬',
      '미칀',
      '미친끼',
      '미친~',
      '미친개',
      '미친새',
      '미친색',
      '미친ㅋ',
      '미틴',
      '및힌',
      'ㅂㄹ',
      'ㅂㅁㄱ',
      'ㅂㅊ',
      'ㅂ크',
      '발놈',
      '별창',
      '병1신',
      '병1크',
      '병맛',
      '병신',
      '병크',
      '봊',
      '보전깨',
      '싸개',
      '븅신',
      '빠큐',
      '빡새끼',
      '빻았',
      '빻은',
      '뻐규',
      '뻐큐',
      '뻑유',
      '뻑큐',
      '뻨큐',
      '뼈큐',
      '뽄새',
      '뽄세',
      '삐걱',
      '쉰내',
      'ㅄ',
      'ㅅ',
      'ㅂ',
      'ㅅ.ㅂ',
      'ㅅ1ㅂ',
      'ㅅ1발',
      'ㅅㄲ네',
      'ㅅㄲ들',
      'ㅅ루',
      'ㅅㅋ',
      'ㅅㅌㅊ',
      'ㅅㅡ루',
      '사새끼',
      '새끼',
      '새1끼',
      '새1키',
      '새77ㅣ',
      '새끼라',
      '새끼야',
      '새퀴',
      '새킈',
      '새키',
      '색희',
      '색히',
      '샊기',
      '샊히',
      '샹년',
      '섀키',
      '서치해',
      '섬숭이',
      '성괴',
      '솔1친',
      '솔친',
      '수준하고는',
      '쉬발',
      '쉬버',
      '쉬이바',
      '쉬이이',
      '쉬이이이',
      '쉬펄',
      '슈1발',
      '슈레기',
      '슈발',
      '슈벌',
      '슈우벌',
      '슈ㅣ발',
      '스.루',
      '스ㄹㅜ',
      '스벌',
      '스죄',
      '스타죄국',
      '슨상님',
      '싑창',
      '시1발',
      '시미발친',
      '시미친발',
      '시바',
      '시바라지',
      '시바류',
      '시바시바',
      '시바알',
      '시바앙',
      '시발',
      '❌',
      '✖️',
      '🖕',
      '시방새',
      '시벌탱',
      '시볼탱',
      '시부럴',
      '시부렬',
      '시부울',
      '시뷰럴',
      '시뷰렬',
      '시빨',
      '시새발끼',
      '시이발',
      '시친발미',
      '시키가',
      '시팔',
      '시펄',
      '십창',
      '십팔',
      'ㅆ1ㄺ',
      'ㅆ1ㅂ',
      'ㅆㄹㄱ',
      'ㅆㄺ',
      'ㅆㅂ',
      '싸가지',
      '싸가지없',
      '싸물어',
      '쌉가',
      '쌍년',
      '쌍놈',
      '쌔끼',
      '썅',
      '썌끼',
      '쒸펄',
      '쓰1레기',
      '쓰래기같',
      '쓰레기',
      '쓰레기새',
      '쓰렉',
      '씝창',
      '씨1발',
      '씨바라',
      '씨바알',
      '씨발',
      '씨방새',
      '씨버럼',
      '씨벌',
      '씨벌탱',
      '씨볼탱',
      '씨부럴',
      '씨부렬',
      '씨뷰럴',
      '씨뷰렬',
      '씨빠빠',
      '씨빨',
      '씨뻘',
      '씨새발끼',
      '씨이발',
      '씨팔',
      '씹귀',
      '씹덕',
      '씹못',
      '씹뻐럴',
      '씹새끼',
      '씹쌔',
      '씹창',
      '씹치',
      '씹팔',
      '씹할',
      'ㅇㅍㅊㅌ',
      'ㅇㅒ쁜',
      '아가리',
      '아닥',
      '오타쿠',
      '오탁후',
      '오덕후',
      '오덕',
      '더쿠',
      '덬',
      '아오시바',
      '아오ㅅㅂ',
      '시바',
      '안물안궁',
      '애미',
      '앰',
      '앰창',
      '닥눈삼',
      '얘쁘',
      '얘쁜',
      '얪',
      '에라이',
      '퉤',
      '에라이퉤',
      '에라이퉷',
      '엠뷩신',
      '엠븽신',
      '엠빙신',
      '엠생',
      '엠창',
      '엿같',
      '엿이나',
      '예.질',
      '예1질',
      '예질',
      '옘병',
      '오크',
      '와꾸',
      '왜저럼',
      '외1퀴',
      '외퀴',
      '웅앵',
      '웅엥',
      '은년',
      '은새끼',
      '새끼',
      '이따위',
      '이새끼',
      '인간말종',
      '一 一',
      '一 ㅡ',
      '一一',
      '一ㅡ',
      '입털',
      'ㅈ.ㄴ',
      'ㅈ소',
      'ㅈㄴ',
      'ㅈㄹ',
      '자업자득',
      '작작',
      '잘또',
      '저따위',
      '지잡',
      '검머외',
      '절라',
      '정병',
      '정신나갓',
      '정신나갔',
      '젖',
      '젗같',
      '젼나',
      '젼낰',
      '졀라',
      '졀리',
      '졌같은',
      '졏',
      '조낸',
      '조녜',
      '조온',
      '조온나',
      '족까',
      '조온나',
      '존나',
      '존1',
      '존1나',
      '🚬',
      '존귀',
      '존귘',
      '존ㄴ나',
      '존나',
      '존낙',
      '존내',
      '존똑',
      '존맛',
      '존멋',
      '존버',
      '존싫',
      '존쎄',
      '존쎼',
      '존예',
      '존웃',
      '존잘',
      '존잼',
      '존좋',
      '존트',
      '졸귀',
      '졸귘',
      '졸라',
      '졸맛',
      '졸멋',
      '졸싫',
      '졸예',
      '졸웃',
      '졸잼',
      '졸좋',
      '좁밥',
      '조센징',
      '짱깨',
      '짱개',
      '짱꼴라',
      '꼴라',
      '착짱',
      '죽짱',
      '짱골라',
      '좃',
      '종나',
      '좆',
      '좆까',
      '좇같',
      '죠낸',
      '죠온나',
      '죤나',
      '죤내',
      '죵나',
      '죶',
      '죽어버려',
      '죽여버리고',
      '죽여불고',
      '죽여뿌고',
      '중립충',
      '줬같은',
      '쥐랄',
      '쥰나',
      '쥰내',
      '쥰니',
      '쥰트',
      '즤랄',
      '지1랄',
      '지1뢰',
      '지껄이',
      '지들이',
      '지랄',
      '지롤',
      '지뢰',
      '지인지조',
      'ㅉ',
      'ㅉ질한',
      '짱깨',
      '짱께',
      '쪼녜',
      '쪼다',
      '착짱죽짱',
      '섬숭이',
      '쪽본',
      '쪽1바리',
      '쪽바리',
      '쪽발',
      '쫀1',
      '쫀귀',
      '쫀맛',
      '쫂',
      '쫓같',
      '쬰잘',
      '쬲',
      '쯰질',
      '찌1질',
      '찌질한',
      '찍찍이',
      '찎찎이',
      '찝째끼',
      '창년',
      '창녀',
      '창놈',
      '창넘',
      '처먹',
      '凸',
      '첫빠',
      '쳐마',
      '쳐먹',
      '쳐받는',
      '쳐발라',
      '취ㅈ',
      '취좃',
      '친구년',
      '친년',
      '친노마',
      '친놈',
      '텐귀',
      '텐덕',
      '톡디',
      'ㅍㅌㅊ',
      '파1친',
      '파친',
      '피코',
      '피해자코스프레',
      '핑1프',
      '핑거프린세스',
      '핑끄',
      '핑프',
      'ㅎㅃ',
      'ㅎㅌㅊ',
      '할많하않',
      '할말하않',
      '헛소리',
      '손놈',
      '남미새',
      '여미새',
      '혐석',
      '호로새끼',
      '호로잡',
      '화낭년',
      '화냥년',
      '후1려',
      '후1빨',
      '후려',
      '후빨',
      'ㅗ',
      '졸',
      '존',
      '씹',
      '미친',
      '시발',
      '지랄',
      '개새끼',
      '또라이',
      '디질',
      '걸레',
      '닥쳐',
      '등신',
      '뇌텅텅',
      '대가리',
      '병신',
      '엠창',
      '조ㅈ',
      '염병',
      '쌍판',
      '쳐',
      '씹',
    ];

    const abuse = (hashtag) => {
      for (let i = 1; i < hashtag.length; i++) {
        for (let j = i + 1; j < hashtag.length + 1; j++) {
          if (abuseDB.includes(hashtag.slice(i, j))) {
            return true;
          }
        }
      }
      return false;
    };

    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }
    if (!title || !hashtag) {
      return res
        .status(422)
        .send({ message: 'insufficient data information!' });
    }

    if (abuse(hashtag)) {
      return res.status(422).send({ message: "let's use the right words" });
    }

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction();
      const [musicalData] = await connection.execute(
        `SELECT id FROM musicals WHERE title = ?`,
        [title]
      );
      if (musicalData.length === 0) {
        return res.status(404).send({ message: 'not found' });
      }
      const userId = accessTokenData.id;
      const musicalId = musicalData[0].id;

      //! hashtag 등록
      // 동일한 사용자의 동일한 해시태그 중복등록은 클라이언트에서 막아줌
      // 이미 등록된 hashtag 인지 검색
      const [existedHashtagData] = await connection.execute(
        `SELECT * from hashtags WHERE name = ?`,
        [hashtag]
      );
      // console.log('existedHashtagData: ', existedHashtagData);

      // 이미 등록된 hashtag 라면 totalLikeCount + 1
      if (existedHashtagData.length !== 0) {
        const hashtagId = existedHashtagData[0].id;
        const [existedMusicalHashtag] = await connection.execute(
          `SELECT * FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        // 새로운 뮤지컬에 등록되는 것이면 totalLikeCount + 1 AND musicalCount + 1
        if (existedMusicalHashtag.legnth === 0) {
          await connection.execute(
            `
              UPDATE hashtags 
              SET totalLikeCount = totalLikeCount + 1, musicalCount = musicalCount + 1
              WHERE name = ?`,
            [hashtag]
          );
        }
        // 이미 등록된 hashtag 중에 해당 뮤지컬에도 등록되어있는 것이면 totalLikeCount + 1
        await connection.execute(
          `
              UPDATE hashtags 
              SET totalLikeCount = totalLikeCount + 1
              WHERE name = ?`,
          [hashtag]
        );
        // 해당 musical의 hashtag likeCount를 1 증가
        await connection.execute(
          `UPDATE musical_hashtag SET likeCount = likeCount + 1 WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );

        // user_hashtag에 등록
        const [musicalHashtagIdData] = await connection.execute(
          `SELECT id FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        if (musicalHashtagIdData.length === 0) {
          return res.status(500).send({ message: 'internal server error(DB)' });
        }

        const musicalHashtagId = musicalHashtagIdData[0].id;

        await connection.execute(
          `INSERT IGNORE INTO user_hashtag (user_id, musical_hashtag_id) VALUES (?, ?)`,
          [userId, musicalHashtagId]
        );
      }
      // 해당 hashtag 가 등록되지 않았다면 등록
      else if (existedHashtagData.length === 0) {
        const [insertNew] = await connection.execute(
          `INSERT IGNORE INTO hashtags (name) VALUES (?)`,
          [hashtag]
        );

        const hashtagId = insertNew.insertId;
        // musical_hashtag 등록(musical 에 hashtag 부여)
        await connection.execute(
          `INSERT IGNORE INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
          [hashtagId, musicalId]
        );

        // user_hashtag에 등록
        const [musicalHashtagIdData] = await connection.execute(
          `SELECT id FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        if (musicalHashtagIdData.length === 0) {
          return res.status(404).send({ message: 'not found' });
        }

        const musicalHashtagId = musicalHashtagIdData[0].id;

        await connection.execute(
          `INSERT IGNORE INTO user_hashtag (user_id, musical_hashtag_id) VALUES (?, ?)`,
          [userId, musicalHashtagId]
        );
      }
      const [updatedHashtagData] = await connection.execute(
        `SELECT * FROM hashtags WHERE name = ?`,
        [hashtag]
      );

      const [hashtagsData] = await connection.execute(
        `SELECT DISTINCT musical_hashtag.id, hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount FROM ((hashtags INNER JOIN musical_hashtag ON hashtags.id = musical_hashtag.hashtag_id) INNER JOIN musicals ON musical_hashtag.musical_id = ?)`,
        [musicalId]
      );

      const [userHashtagUpdatedData] = await connection.execute(
        `SELECT users.username, users.profile, users.email, musicals.title, hashtags.name FROM ( ( ( users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id ) INNER JOIN musical_hashtag ON user_hashtag.musical_hashtag_id = musical_hashtag.id) INNER JOIN hashtags ON hashtag_id = hashtags.id) INNER JOIN musicals ON musical_hashtag.musical_id = musicals.id WHERE user_hashtag.user_id = ? AND musicals.id = ?`,
        [userId, musicalId]
      );

      const [musicalHashtagData] = await connection.execute(
        `SELECT musical_hashtag.id, musicals.title FROM musical_hashtag INNER JOIN musicals ON musicals.id = ?`,
        [musicalId]
      );

      for (let i = 0; i < hashtagsData.length; i++) {
        hashtagsData[i].userInfo = [];
      }

      const userHashtags = [];
      for (let i = 0; i < musicalHashtagData.length; i++) {
        const [userHashtagData] = await connection.execute(
          `SELECT musical_hashtag.id, hashtags.name, users.email, users.username, users.profile FROM ((users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id) INNER JOIN musical_hashtag ON musical_hashtag.id = user_hashtag.musical_hashtag_id) INNER JOIN hashtags ON musical_hashtag.hashtag_id = hashtags.id WHERE musical_hashtag.id = ?`,
          [musicalHashtagData[i].id]
        );
        if (userHashtagData.length !== 0) {
          for (let j = 0; j < hashtagsData.length; j++) {
            for (let k = 0; k < userHashtagData.length; k++) {
              if (hashtagsData[j].id === userHashtagData[k].id) {
                userHashtags.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
                hashtagsData[j].userInfo.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
              }
            }
          }
        }
      }
      const userHashtag = [];
      userHashtags.reduce(function (acc, cur) {
        if (acc.findIndex(({ email }) => email === cur.email) === -1) {
          acc.push(cur);
          userHashtag.push(cur);
        }
        return acc;
      }, []);

      await connection.commit();
      res.status(201).json({
        data: {
          updatedHashtagData,
          userHashtagUpdatedData,
          hashtagsData,
          userHashtag,
        },
      });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
  delete: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { title, hashtag } = req.params;

    console.log(title, hashtag);
    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }
    if (!title || !hashtag) {
      return res
        .status(422)
        .send({ message: 'insufficient data information!' });
    }

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction();

      const [hashtagData] = await connection.execute(
        `SELECT * FROM hashtags WHERE name = ?`,
        [hashtag]
      );

      const [musicalsData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );

      if (musicalsData.length === 0 || hashtagData.length === 0) {
        return res.status(404).send({ message: 'data not found' });
      }
      const hashtagId = hashtagData[0].id;
      const musicalId = musicalsData[0].id;
      const userId = accessTokenData.id;

      const [musicalHashtagsData] = await connection.execute(
        `SELECT * FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
        [hashtagId, musicalId]
      );

      if (musicalHashtagsData.length === 0) {
        return res.status(404).send({ message: 'data not found' });
      }
      const musicalHashtagId = musicalHashtagsData[0].id;

      const [userHashtags] = await connection.execute(
        `SELECT * FROM user_hashtag WHERE user_id = ? AND musical_hashtag_id = ?`,
        [userId, musicalHashtagId]
      );

      if (userHashtags.length === 0) {
        return res.status(404).send({ message: 'data not found' });
      }
      const userHashtagId = userHashtags[0].id;
      // 1단계
      // musical_hashtag의 likeCount -1
      // hashtags의 totalLikeCount -1
      // user_hashtag 삭제
      const [userHashtagUpdatedData] = await connection.execute(
        `SELECT users.username, users.profile, users.email, musicals.title, hashtags.name FROM ( ( ( users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id ) INNER JOIN musical_hashtag ON user_hashtag.musical_hashtag_id = musical_hashtag.id) INNER JOIN hashtags ON hashtag_id = hashtags.id) INNER JOIN musicals ON musical_hashtag.musical_id = musicals.id WHERE user_hashtag.user_id = ? AND musicals.id = ?`,
        [userId, musicalId]
      );

      await connection.execute(
        `UPDATE musical_hashtag SET likeCount = likeCount - 1 WHERE id = ?`,
        [musicalHashtagId]
      );

      await connection.execute(
        `UPDATE hashtags SET totalLikeCount = totalLikeCount - 1 WHERE id = ?`,
        [hashtagId]
      );

      await connection.execute(`DELETE FROM user_hashtag WHERE id = ?`, [
        userHashtagId,
      ]);

      // 2단계
      // musical_hashtag의 숫자가 0인 경우, musical_hashtag에서 삭제
      // hashtags의 musicalCount -1
      const [deleteResultMusicalHashtag] = await connection.execute(
        `DELETE FROM musical_hashtag WHERE id = ? AND likeCount < 1`,
        [musicalHashtagId]
      );
      if (deleteResultMusicalHashtag.affectedRows === 1) {
        await connection.execute(
          `UPDATE hashtags SET musicalCount = musicalCount - 1 WHERE id = ?`,
          [hashtagId]
        );
      } else if (deleteResultMusicalHashtag.affectedRows > 1) {
        await connection.rollback();
        res.status(500).send({ message: 'internal server error' });
      }

      // 3단계
      // hashtags의 totalLikeCount가 0 또는 musicalCount가 0인 경우 hashtags에서 삭제(1보다 작은 경우)
      const [deleteResultHashtags] = await connection.execute(
        `DELETE FROM hashtags WHERE id = ? AND (totalLikeCount < 1 OR musicalCount < 1)`,
        [hashtagId]
      );

      const [hashtagsData] = await connection.execute(
        `SELECT DISTINCT musical_hashtag.id, hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount FROM ((hashtags INNER JOIN musical_hashtag ON hashtags.id = musical_hashtag.hashtag_id) INNER JOIN musicals ON musical_hashtag.musical_id = ?)`,
        [musicalId]
      );

      const [musicalHashtagData] = await connection.execute(
        `SELECT musical_hashtag.id, musicals.title FROM musical_hashtag INNER JOIN musicals ON musicals.id = ?`,
        [musicalId]
      );

      for (let i = 0; i < hashtagsData.length; i++) {
        hashtagsData[i].userInfo = [];
      }

      const userHashtags2 = [];
      for (let i = 0; i < musicalHashtagData.length; i++) {
        const [userHashtagData] = await connection.execute(
          `SELECT musical_hashtag.id, hashtags.name, users.email, users.username, users.profile FROM ((users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id) INNER JOIN musical_hashtag ON musical_hashtag.id = user_hashtag.musical_hashtag_id) INNER JOIN hashtags ON musical_hashtag.hashtag_id = hashtags.id WHERE musical_hashtag.id = ?`,
          [musicalHashtagData[i].id]
        );
        if (userHashtagData.length !== 0) {
          for (let j = 0; j < hashtagsData.length; j++) {
            for (let k = 0; k < userHashtagData.length; k++) {
              if (hashtagsData[j].id === userHashtagData[k].id) {
                userHashtags2.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
                hashtagsData[j].userInfo.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
              }
            }
          }
        }
      }
      const userHashtag = [];
      userHashtags2.reduce(function (acc, cur) {
        if (acc.findIndex(({ email }) => email === cur.email) === -1) {
          acc.push(cur);
          userHashtag.push(cur);
        }
        return acc;
      }, []);

      await connection.commit();
      res.status(200).json({
        data: {
          updatedHashtagData: hashtagData,
          userHashtagUpdatedData,
          hashtagsData,
          userHashtag,
        },
        message: 'ok',
      });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
