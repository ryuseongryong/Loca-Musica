const express = require('express');
const router = express.Router();

const { user, search, oauth, musical, admin } = require('../controllers');

router.post('/user/signin', user.signin.post);
router.post('/user/signup', user.signup.post);
router.post('/user/signout', user.signout.post);
router.get('/user/info', user.info.get);
router.get('/user/auth', user.auth.get);
router.patch('/user/editpassword', user.editpassword.patch);
router.patch('/user/editprofile', user.editprofile.patch);
router.patch('/user/editusername', user.editusername.patch);
router.patch('/user/delete', user.delete.patch);

router.post('/oauth/kakao', oauth.kakao.post);

router.get('/musical/main', musical.main.get);
router.get('/musical/:title', musical.musical.clickMusical);
router.get('/musical', musical.musical.searchByTitle);
router.post('/musical/bookmark', musical.bookmark.post);
router.delete('/musical/bookmark/:title', musical.bookmark.delete);

router.get('/search', search.search.get);

router.post('/admin/post', admin.post.post);
router.get('/admin/getKopisSearch', admin.getKopisSearch.get); // kopis 공연목록 조회
router.put('/admin/edit', admin.edit.put);
router.delete('/admin/delete/:title', admin.delete.delete);

module.exports = router;
