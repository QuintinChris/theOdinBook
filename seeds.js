const faker = require("faker");
const User = require("./models/Users");
const Post = require("./models/Posts");
const Comment = require("./models/Comments");

// Creates 5 users with random name, image, post, and comment
const seedDb = (req, res, next) => {
    for (let i = 0; i < 5; i++) {
        new User({
            name: faker.name.findName(),
            photoURL: faker.image.imageUrl(),
            githubId: faker.random.number(),
        }).save((err, user) => {
            if (err) {
                return next(err);
            }
            new Post({
                user: user.id,
                content: faker.lorem.paragraph(),
            }).save((err, post) => {
                if (err) {
                    return next(err);
                }
                new Comment({
                    post: post.id,
                    content: faker.lorem.paragraph(),
                    user: user.id,
                }).save((err, comment) => {
                    if (err) {
                        return next(err);
                    }
                });
            });
        });
    }
};

module.exports = seedDb;