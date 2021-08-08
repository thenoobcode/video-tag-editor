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

  constructor() {
    this.onTagSelect = new EventEmitter<ITag>();
  }

  ngOnInit(): void {
  }

  selectTag(tag: ITag) {
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
