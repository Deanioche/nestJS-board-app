# nestJS Board app

> [따라하며 배우는 nestJS](https://inf.run/kB1y)

- `@nestjs/typeorm`, `typeorm` 최신 버전에 작동하도록 Repository 수정.
- board repository delete 부분 수정.
  ```js
  // 방법 1
  const result = await this.boardRepository.delete({
    id,
    user: { id: user.id },
  });

  // 방법 2
  const result = await this.boardRepository
    .createQueryBuilder('board')
    .delete()
    .from(Board)
    .where('userId = :userId', { userId: user.id })
    .andWhere('id = :id', { id })
    .execute();
  ```

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