# DevTinder APIs

authRouter

- POST /signup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/:status/:userId - interested, ignored

- POST /request/review/:status/:userId - accepted, rejected

userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platforms

Status: ignored, interested, accepted, rejected

toUser and fromUser not sending to eachother and again and again
toUserId exists in database
status is interested and ignored
schema pre - save for avoiding sending request to youself
