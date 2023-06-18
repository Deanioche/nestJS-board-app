import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

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

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    return await this.save(board);
  }

  async deleteBoardById(id: number): Promise<DeleteResult> {
    return await this.delete({ id });
  }

  async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
    return await this.save({ id, status });
  }
}
