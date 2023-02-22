import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from 'src/entities/user.entity';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserGuard } from '../auth/guards/user.guard';

@Controller('quotes')
@UseInterceptors(ClassSerializerInterceptor)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto, @GetCurrentUser() user: User) {
    return this.quotesService.create(createQuoteDto, user);
  }

  @Get()
  async findAll() {
    return this.quotesService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findAllCurrUserQuotes(@GetCurrentUser() user: User) {
    return user.quotes;
  }

  @Get(':id')
  async findOne(@Param('id') quoteId: number) {
    return this.quotesService.findById(quoteId);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.quotesService.remove(id);
  }
}
