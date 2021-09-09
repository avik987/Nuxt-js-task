const {users} = require('../database').models;
const md5 = require('md5');
const _ = require('lodash');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { requestError, ifEmail } = require('../helpers/Functions')

class UserController {
    static async signUp(req, res) {
        try {
            const { email, name, password } = req.body;

            if (!email || !password || !name) {
                return res.status(400).send({
                    status: 'fail',
                    message: 'Email, name, password required',
                });
            }
            const checkLogin = await users.findOne({email}).lean();
            if (checkLogin){
                return res.status(422).send({
                    status: 'fail',
                    message: 'This email is busy',
                });
            }
            if (!ifEmail(email)){
                return res.status(422).send({
                    status: 'fail',
                    message: 'Invalid email address',
                });
            }
            const psw = md5(password + 'safe_pass');
            await users.create({ email, password: psw, name });

            return res.status(200).send({
                status: 'success',
                message: 'Registration success'
            });
        } catch (e) {
            requestError(res, e);
        }
    }

    static async signIn(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password){
                return res.status(400).send({
                    status: 'fail',
                    message: 'Please enter your email and password',
                });
            }
            if (!ifEmail(email)){
                return res.status(422).send({
                    status: 'fail',
                    message: 'Invalid email address',
                });
            }

            const psw = md5(password + 'safe_pass');
            const user = await users.findOne({email, password: psw}).lean();
            if (!user) {
                return res.status(400).send({
                    status: 'fail',
                    message: 'Invalid email or password',
                });
            }

            const token = JWT.sign({id: user._id}, JWT_SECRET);

            return res.status(200).send({
                status: 'success',
                user,
                token,
            });
        } catch (e) {
            requestError(res, e);
        }
    }

    static async getList(req, res) {
        try {
            const { user } = req;
            const {search, page = 1, limit = 20} = req.query;
            const offset = (+page - 1) * +limit;
            if (!user) {
                return res.status(401).send({
                    status: 'fail',
                    message: 'unauthorized',
                });
            }
            let query = {};
            let count = await users.countDocuments();
            if (search) {
                query.$or = [
                    { email: {$regex : new RegExp("^" + search, 'i')}},
                    { name: {$regex : new RegExp("^" + search, 'i')}},
                ]
            }
            const userList = await users
                .find(query)
                .skip(+offset)
                .limit(+limit)
                .select('-password')
                .lean();

            count = search ? userList.length : count;
            return res.status(200).send({
                status: 'success',
                users: userList,
                count
            });

        } catch (e) {
            requestError(res, e);
        }
    }

    static async getOne(req, res) {
        try {
            const { user } = req;
            const { id } = req.params;
            if (!user) {
                return res.status(401).send({
                    code: 401,
                    status: 'fail',
                    message: 'unauthorized',
                });
            }

            const singleUser = await users.findById(id).select('-password').lean();
            if (!singleUser) {
                return res.status(404).send({
                    status: 'fail',
                    message: 'User not found',
                });
            }
            return res.status(200).send({
                status: "success",
                user: singleUser,
            });

        } catch (e) {
            requestError(res, e);
        }
    }
    static async current(req, res) {
        try {
            const { user } = req;
            if (!user) {
                return res.status(401).send({
                    status: 'fail',
                    message: 'unauthorized',
                });
            }
            return res.status(200).send({
                status: "success",
                user,
            });

        } catch (e) {
            requestError(res, e);
        }
    }
    static async deleteUser(req, res) {
        try {
            const { user } = req;
            const { id } = req.params;
            if (!user) {
                return res.status(401).send({
                    status: 'fail',
                    message: 'unauthorized',
                });
            }
            // if (user._id.toString() !== id) {
            //     return res.status(401).send({
            //         status: 'fail',
            //         message: 'unauthorized access',
            //     });
            // }
            const deleteUser = await users.findByIdAndDelete(id);
            if (!deleteUser) {
                return res.status(404).send({
                    status: 'fail',
                    message: 'User not found',
                });
            }
            return res.status(200).send({
                status: "success",
                message: 'User deleted',
            });

        } catch (e) {
            requestError(res, e);
        }
    }

    static async partialUpdate(req, res) {
        try {
            const { user } = req;
            const { id } = req.params;
            const { name, email, password } = req.body;
            if (!user) {
                return res.status(401).send({
                    status: 'fail',
                    message: 'unauthorized',
                });
            }
            // if (user._id.toString() !== id) {
            //     return res.status(401).send({
            //         status: 'fail',
            //         message: 'unauthorized access',
            //     });
            // }
            const data = {}
            if (name) {
                data.name = name;
            }
            if (email) {
                if (!ifEmail) {
                    return res.status(400).send({
                        status: 'fail',
                        message: 'Please enter your email address',
                    });
                }
                console.log(user._id);
                const alreadyEmail = await users.findOne({_id: {$ne: id}, email}).lean();
                console.log(alreadyEmail);
                if (alreadyEmail){
                    return res.status(400).send({
                        status: 'fail',
                        message: 'This email is busy',
                    });
                }
                data.email = email;
            }
            if (password) {
                data.password = md5(password + 'safe_pass');
            }

            if (_.isEmpty(data)) {
                return res.status(200).send({
                    status: "success",
                    message: 'User nothing updated',
                });
            }

            const updateUser = await users.findByIdAndUpdate(id, data, {new: true}).select('-password')

            return res.status(200).send({
                status: "success",
                message: 'User updated',
                user: updateUser,
            });

        } catch (e) {
            requestError(res, e);
        }
    }
}

module.exports = UserController;
