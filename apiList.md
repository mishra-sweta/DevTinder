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

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:userId
- POST /request/review/rejec ted/:userId

userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platforms

Status: ignore, interested, accepted, rejected
