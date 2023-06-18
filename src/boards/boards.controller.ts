import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { DeleteResult } from 'typeorm';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidationPipe';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // accessToken이 있어야 boards 관련 요청을 할 수 있음.
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get('/all')
  getAllBoards(): Promise<Board[]> {
    this.logger.verbose(`tryig to get all boards`);
    return this.boardsService.getAllBoards();
  }

  @Get()
  getAllBoardsFromUser(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(
      `User ${user.username} tryig to get ${user.username}'s boards`,
    );
    return this.boardsService.getAllBoardsFromUser(user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  async updateBoardStatusById(
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Board> {
    const res = await this.boardsService.updateBoardStatusById(id, status);
    console.log(`res`, res);
    return res;
  }
}
