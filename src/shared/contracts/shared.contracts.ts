/**Normalized entity: byId and allIds*/
export interface INormalizedEntity<TEntity> {

    /**Object instances*/
    byId: IEntity<TEntity>;

    /**Array instances id's*/
    allIds: Array<string>
}

export interface IEntity<TEntity>{
    [id: string]: TEntity;
}
