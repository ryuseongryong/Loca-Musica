
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username varchar(255) not null,
	email varchar(255) not null UNIQUE,
	password varchar(255) not null,
	profile varchar(255),
  kakao boolean not null default false,
  resign boolean not null default false,
  admin boolean not null default false,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE musicals (
  id INT AUTO_INCREMENT,
	code varchar(255) not null UNIQUE,
  title varchar(255) not null,
  thumbnail varchar(255),
	contents varchar(255),
	state varchar(255),
	actors varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE hashtags (
  id INT AUTO_INCREMENT,
  name varchar(255) not null UNIQUE,
  totalLikeCount int default 1,
  musicalCount int default 1,
  PRIMARY KEY (id)
);

CREATE TABLE user_musical (
  id INT AUTO_INCREMENT,
  user_id INT not null,
  musical_id INT not null,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (musical_id) REFERENCES musicals(id),
  CONSTRAINT bookmark UNIQUE (user_id, musical_id)
);

CREATE TABLE musical_hashtag (
  id INT AUTO_INCREMENT,
  name varchar(255) not null UNIQUE,
  hashtag_id int not null,
  musical_id int not null,
  likeCount int default 1,
  PRIMARY KEY (id),
  FOREIGN KEY (hashtag_id) REFERENCES hashtags(id), 
  FOREIGN KEY (musical_id) REFERENCES musicals(id),
  CONSTRAINT musicalHashtag UNIQUE (hashtag_id, musical_id)
);

CREATE TABLE user_hashtag (
  id INT AUTO_INCREMENT, 
  user_id INT not null, 
  musical_hashtag_id INT not null, 
  PRIMARY KEY(id), 
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (musical_hashtag_id) REFERENCES musical_hashtag(id),
  CONSTRAINT userHashtag UNIQUE (user_id, musical_hashtag_id)
);

CREATE TABLE numbers (
  id INT auto_increment,
  musical_id INT not null, 
  title varchar(255),
  videoId varchar(255) not null,
  PRIMARY KEY (id),
  FOREIGN KEY (musical_id) REFERENCES musicals(id)
);

CREATE TABLE user_number (
  id INT auto_increment,
  user_id INT not null,
	number_id INT not null,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (number_id) REFERENCES numbers(id),
  CONSTRAINT userNumber UNIQUE (user_id, number_id)
);

/* mysql -u admin --host loca-musica-db.ct0ktlt3mttk.ap-northeast-2.rds.amazonaws.com -P 13306 -p
mysql -u admin --host loca-musica-db.ct0ktlt3mttk.ap-northeast-2.rds.amazonaws.com < server/schema.sql -P 13306 -p -Dtest
*/