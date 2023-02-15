import { QueryBuilder } from 'objection';

class SearchBuilder extends QueryBuilder {
  orWhereILike(fieldName, value) {
    return this.orWhere(fieldName, 'ILIKE', `%${value}%`);
  }

  whereILike(fieldName, value) {
    return this.where(fieldName, 'ILIKE', `%${value}%`);
  }

  orWhereLike(fieldName, value) {
    return this.orWhere(fieldName, 'LIKE', `%${value}%`);
  }

  whereLike(fieldName, value) {
    return this.where(fieldName, 'LIKE', `%${value}%`);
  }
}

export default SearchBuilder;
