import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema';
import { Book } from './schemas/book.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async createLibrary(): Promise<Library> {
    const book1 = new this.bookModel({
      title: 'Book 1',
      author: 'Author 1',
    });
    const book2 = new this.bookModel({
      title: 'Book 2',
      author: 'Author 2',
    });
    const library = new this.libraryModel({
      name: 'Library 1',
      books: [book1._id, book2._id],
    });
    return library.save();
  }

  async findAllLibraries(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
