import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from '../../models/iTag.model';
import { Currency } from '../../models/iTagItem.model';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {
  @Input() title: string;
  @Input() tags: ITag[];
  @Output() onTagSelect: EventEmitter<ITag>;

  selectedTag: ITag;
  selectedTagIndex: number;
  creationTimeStamp: string;

  constructor() {
    this.onTagSelect = new EventEmitter<ITag>();
    this.creationTimeStamp = new Date().getTime().toString();
  }

  ngOnInit(): void {
  }

  selectTag(tag: ITag, index: number) {
    this.selectedTagIndex = index;
    this.selectedTag = JSON.parse(JSON.stringify(tag));
    this.onTagSelect.emit(this.selectedTag);
  }

  public getCurrencyEnumValue(key: keyof typeof Currency) {
    return Currency[key];
  }

  public get CurrencyArray() {
    return <(keyof typeof Currency)[]>Object.keys(Currency);
  }

}
