const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// 테이블 객체 불러오기
const { User } = require('../models');
const { where } = require('sequelize');
// const {sequelize} = require('../models'); // Raw 쿼리를 직접 실행하거나, 트랜잭션을 수동으로 제어할 때 필요
// const { Op, Sequelize } = require('sequelize'); // 비교/논리 연산자가 조건에 들어갈 때 필요

const login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ // id 확인인
            where: {
                userId: userId,
                password: password
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "The ID or password does not match."
            });
        } else { // 로그인 성공
            const userInfo = user.dataValues; // user 객체의 필드값으로 이루어진 json

            // 토큰 발급
            const accessToken = generateAccessToken(userInfo);
            const refreshToken = generateRefreshToken();

            res.set('Authorization', 'Bearer ' + accessToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,       // HTTPS 환경에서만 전송
                sameSite: 'Strict', // XSS 대응
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
            });

            res.status(200).json({
                message: "Login success"
            })
        }

    } catch(err) {
        console.log(`error: ${err}`);
        res.status(500).json({
            error: err,
            message: "Internal Server Error"
        })
    }
}

const profile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findOne({
            where: {
                userId: userId
            }
        })

        if(!user){
            return res.status(401).json({
                message: "User not found for the provided user ID."
            });
        }
        res.status(200).json({
            message: "User retrieved successfully.",
            userId: user.userId,
            userName: user.userName
        })

    } catch(err) {
        console.log(`error: ${err}`);
        res.status(500).json({
            error: err,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    login,
    profile
}
