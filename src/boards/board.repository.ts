import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager);
  }

  async getBoardById(id: number): Promise<Board> {
    return await this.findOneBy({ id });
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    return await this.save(board);
  }
}

// export interface BoardRepository extends Repository<Board> {
//   getById(id: number): Promise<Board>;
//   getAllBoards(): Promise<Board[]>;
//   createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
// }

// export const BoardRepositoryFactory = (dataSource: DataSource) =>
//   dataSource.getRepository(Board).extend({
//     getById(id: number) {
//       return this.findOneBy({ id });
//     },

//     getAllBoards() {
//       return this.findAll();
//     },

//     createBoard(createBoardDto: CreateBoardDto) {
//       const { title, description } = createBoardDto;
//       const board = this.create({
//         title,
//         description,
//         status: BoardStatus.PUBLIC,
//       });
//       return this.save(board);
//     },
//   });
