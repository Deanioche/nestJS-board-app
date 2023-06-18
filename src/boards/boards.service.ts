import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  async getAllBoardsFromUser(id: number): Promise<Board[]> {
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: id })
      .getMany(); // query.where로 필터링하고 남은 정보를 모두 반환.
    return result;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoardById(id: number, user: User): Promise<DeleteResult> {
    const result = await this.boardRepository.delete({
      id,
      user: { id: user.id },
    });

    // 이 방법도 사용 가능
    // const result = await this.boardRepository
    //   .createQueryBuilder('board')
    //   .delete()
    //   .from(Board)
    //   .where('userId = :userId', { userId: user.id })
    //   .andWhere('id = :id', { id })
    //   .execute();

    if (result.affected === 0)
      throw new NotFoundException(`No Boards are found with id ${id}`);

    return result;
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.getBoardById(id);
    if (!board) {
      throw new NotFoundException(`Board not found by id ${id}`);
    }
    return board;
  }

  async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.getBoardById(id);
    if (!board) throw new NotFoundException(`Board not found by id ${id}`);
    board.status = status;
    return await this.boardRepository.save(board);
  }
}
