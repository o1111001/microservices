# Microservices

![diagram](asserts/diagram.png?raw=true "Title")


## Deploy

1. chmod +x start.sh
2. ./start.sh


## API

### POST /signup
```
{
	"password": "1",
	"name": "name",
	"role": "blogger",
	"email": "1@gmail.com"
}
```
 
### POST /signin
 ```
{
	"email": "1@gmail.com",
	"password": "1"
}
```

### DELETE /profile
```
{
	"token": "5e4405add4262a78111249b8"
}
```
### PATCH /profile/password
```
{
	"token": "5e4690f5bf67b315c94fdbee",
	"password": "123"
}
```

### PATCH /profile/name
```
{
	"token": "5e44078c620aad7848bbdd26",
	"name": "123123123"
}
```

### POST /auth
```
{
	"token": "5e44078c620aad7848bbdd26"
}
```

### POST /post
```
{
	"token": "5e46aa11078f5f5165e7fdb3",
	"content": "content"
}
```

### POST /thread
```
{
	"token": "5e45d9ea485da4061c810abb",
	"postId": "5e45f1090f91f81058893e94",
	"text": "TEXT"
}
```

### POST /likePost
```
{
	"token": "5e455d13485da4061c810ab9",
	"id": "5e45f1090f91f81058893e94"
}
```

### POST /likeComment
```
{
	"token": "5e455d13485da4061c810ab9",
	"id": "5e45f1130f91f81058893e95"
}
```

### POST /replyToComment
```
{
	"token": "5e455d13485da4061c810ab9",
	"commentId": "5e45f1130f91f81058893e95",
	"text": "replyy"
}
```

### POST /getLatestPosts
```
{
	"token": "5e4546720e3a4925a708ac3d",
	"name": "user2"
}
```
### POST /getPost
```
{
	"token": "5e455d13485da4061c810ab9",
	"postId": "5e45f1090f91f81058893e94"
}
```

### POST /getFullPost
```
{
	"token": "5e455d13485da4061c810ab9",
	"postId": "5e45f1090f91f81058893e94a"
}
```
