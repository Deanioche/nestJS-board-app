import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // async getBoardById(id: number): Promise<Board> {
  //   const board = await this.boardRepository.findOne(id);

  //   if (!board) {
  //     throw new NotFoundException(`Board not found by id ${id}`);
  //   }
  //   return board;
  // }

  // deleteBoardById(id: string): void {
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }

  // updateBoardStatusById(id: string, status: Board['status']): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
