/**Normalized string entity: byId and allIds*/
export interface IStringIndexable<TEntity> {

    /**Object instances*/
    byId: ISTringIndexEntity<TEntity>;

    /**Array instances id's*/
    allIds: Array<string>
}

/**
 * string index entity
 */
export interface ISTringIndexEntity<TEntity>{
    [id: string]: TEntity;
}

/**Normalized string entity: byId and allIds*/
export interface INumericIndexable<TEntity> {

    /**Object instances*/
    byId: INumericIndexEntity<TEntity>;

    /**Array instances id's*/
    allIds: Array<number>
}

/**
 * string index entity
 */
export interface INumericIndexEntity<TEntity>{
    [id: number]: TEntity;
}
