# nestJS Board app

> [따라하며 배우는 nestJS](https://www.inflearn.com/course/lecture?courseSlug=%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4&unitId=87237&category=questionDetail)

## Structure
```
.
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── boards
│   │   ├── board-status.enum.ts
│   │   ├── board.entity.ts
│   │   ├── board.repository.ts
│   │   ├── boardStatusValidationPipe.ts
│   │   ├── boards.controller.ts
│   │   ├── boards.module.ts
│   │   ├── boards.service.ts
│   │   └── dto
│   │       └── create-board.dto.ts
│   ├── configs
│   │   └── typeorm.config.ts
│   └── main.ts
├── tsconfig.build.json
└── tsconfig.json
```

## Dependencies
```js
@nestjs/common
@nestjs/config
@nestjs/core
@nestjs/platform-express
@nestjs/typeorm
class-transformer
class-validator
pg                 // postgresql
reflect-metadata
rxjs               // ?
typeorm
uuid               // 제거예정
```