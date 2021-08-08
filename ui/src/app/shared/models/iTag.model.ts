import { ITagItem } from "./iTagItem.model";

export interface ITag {
    topItem: ITagItem;
    bottomItem?: ITagItem;
}