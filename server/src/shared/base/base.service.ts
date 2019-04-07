import {
  Document,
  DocumentQuery,
  Model,
  ModelPopulateOptions,
  QueryFindOneAndRemoveOptions,
  QueryFindOneAndUpdateOptions,
  Types,
} from 'mongoose';
import { ObjectID, WriteOpResult } from 'mongodb';

/**
 * 分页器返回结果
 * @export
 * @interface Paginator
 * @template T
 */
export interface Paginator<T> {
  data: T[];
  total: number;
  limit: number;
  offset?: number;
  page?: number;
  pages?: number;
}

/**
 * 抽象CRUD操作基础服务
 * @export
 * @abstract
 * @class BaseService
 * @template T
 */
export abstract class BaseService<T extends Document> {
  constructor(private readonly _model: Model<T>) {}

  /**
   * 转换ObjectId
   * @private
   * @param {string} id
   * @returns {Types.ObjectId}
   * @memberof BaseService
   */
  private toObjectId(id: string): Types.ObjectId {
    if (!ObjectID.isValid(id)) {
      throw new Error('id is not a valid objectID');
    }
    return Types.ObjectId(id);
  }

  /**
   * 填充其他模型
   * @private
   * @param {*} docsQuery
   * @param {*} populates
   * @returns {(Promise<T | T[] | null>)}
   * @memberof BaseService
   */
  private populates<R>(docsQuery: any, populates?: any): Promise<R> {
    if (populates) {
      [].concat(populates).forEach((item: any) => {
        docsQuery.populate(item);
      });
    }
    return docsQuery.exec();
  }
  /**
   * 转化数据
   * @template K
   * @param {(Partial<T> | Partial<T>[])} object
   * @param {*} destinationKey
   * @returns {Promise<K>}
   * @memberof BaseService
   */
  // public async map<K>(
  //   object: Partial<T> | Partial<T>[],
  //   destinationKey: new () => K,
  // ): Promise<K | K[]> {
  //   const props = Object.keys(new destinationKey());
  //   if (Array.isArray(object)) {
  //     const destinations = object.map((item: T) =>
  //       basePick(item.toJSON(), props),
  //     );
  //     return Promise.resolve(destinations as K[]);
  //   }
  //   const destination = basePick(object.toJSON(), props);
  //   return Promise.resolve(destination as K);
  // }

  /**
   * 获取指定条件全部数据
   * @param {*} conditions
   * @param {(any | null)} [projection]
   * @param {({
   *         sort?: any;
   *         limit?: number;
   *         skip?: number;
   *         [key: string]: any;
   *     })} [options]
   * @returns {Promise<T[]>}
   * @memberof BaseService
   */
  public findAll(
    conditions: any,
    projection?: any | null,
    options: {
      sort?: any;
      limit?: number;
      skip?: number;
      populates?: ModelPopulateOptions[] | ModelPopulateOptions;
      [key: string]: any;
    } = {},
  ): Promise<T[]> {
    const { option, populates } = options;
    const docsQuery = this._model.find(conditions, projection, option);
    return this.populates<T[]>(docsQuery, populates);
  }

  /**
   * 获取带分页数据
   * @param {*} conditions
   * @param {(any | null)} [projection]
   * @param {({
   *         sort?: any;
   *         limit?: number;
   *         offset?: number;
   *         page?: number;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {Promise<Paginator<T>>}
   * @memberof BaseService
   */
  public async paginator(
    conditions: any,
    projection?: any | null,
    options: {
      sort?: any;
      limit?: number;
      offset?: number;
      page?: number;
      populates?: ModelPopulateOptions[] | ModelPopulateOptions;
      [key: string]: any;
    } = {},
  ): Promise<Paginator<T>> {
    const result: Paginator<T> = {
      data: [],
      total: 0,
      limit: options.limit ? options.limit : 10,
      offset: 0,
      page: 1,
      pages: 0,
    };
    const { offset, page, option } = options || {
      offset: 0,
      page: 1,
      option: {},
    };
    if (offset !== undefined) {
      result.offset = options.offset;
      options.skip = offset;
    } else if (page !== undefined) {
      result.page = page;
      options.skip = (page - 1) * result.limit;
      result.pages = Math.ceil(result.total / result.limit) || 1;
    } else {
      options.skip = 0;
    }
    result.data = await this.findAll(conditions, projection, option);
    result.total = await this.count(conditions);
    return Promise.resolve(result);
  }

  /**
   * 获取单条数据
   * @param {*} conditions
   * @param {*} [projection]
   * @param {({
   *         lean?: boolean;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {(Promise<T | null>)}
   * @memberof BaseService
   */
  public findOne(
    conditions: any,
    projection: any = {},
    options: {
      lean?: boolean;
      populates?: ModelPopulateOptions[] | ModelPopulateOptions;
      [key: string]: any;
    } = {},
  ): Promise<T | null> {
    const { option, populates } = options;
    const docsQuery = this._model.findOne(conditions, projection, option);
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * 根据id获取单条数据
   * @param {(string)} id
   * @param {*} [projection]
   * @param {({
   *         lean?: boolean;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {(Promise<T | null>)}
   * @memberof BaseService
   */
  public findById(
    id: string,
    projection?: any,
    options: {
      lean?: boolean;
      populates?: ModelPopulateOptions[] | ModelPopulateOptions;
      [key: string]: any;
    } = {},
  ): Promise<T | null> {
    const { option, populates } = options;
    const docsQuery = this._model.findById(
      this.toObjectId(id),
      projection,
      option,
    );
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * 获取指定查询条件的数量
   * @param {*} conditions
   * @returns {Promise<number>}
   * @memberof UserService
   */
  public count(conditions: any): Promise<number> {
    return this._model.countDocuments(conditions).exec();
  }

  /**
   * 创建一条数据
   * @param {T} docs
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async create(docs: Partial<T>): Promise<T> {
    return this._model.create(docs);
  }

  /**
   * 删除指定id数据
   * @param {(string)} id
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async delete(
    id: string,
    options: QueryFindOneAndRemoveOptions = {},
  ): Promise<T | null> {
    return this._model
      .findOneAndRemove({ _id: this.toObjectId(id) }, options)
      .exec();
  }

  /**
   * 更新指定对象数据
   * @param {Partial<T>} [item={}]
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  public async update(
    update: Partial<T>,
    options: QueryFindOneAndUpdateOptions = { new: true },
  ): Promise<T | null> {
    if (!update.id) {
      throw new Error('id not exist when update model');
    }
    return this._model.findByIdAndUpdate(this.toObjectId(update.id), update, options).exec();
  }

  /**
   * 删除所有匹配条件的文档集合
   * @param {*} [conditions={}]
   * @returns {Promise<WriteOpResult['result']>}
   * @memberof BaseService
   */
  public async clearCollection(
    conditions = {},
  ): Promise<WriteOpResult['result']> {
    return this._model.deleteMany(conditions).exec();
  }
}

export function basePick(object: object, props: string[]) {
  object = Object(object);
  return basePickBy(object, props, (value, key) => {
    return key in object;
  });
}

function basePickBy(
  object: { [p: string]: any },
  props: string[],
  predicate: (v: any, k: string) => boolean,
) {
  let index = -1;
  const length = props.length;
  const result: { [p: string]: any } = {};

  while (++index < length) {
    const key = props[index],
      value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}
