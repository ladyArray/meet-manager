export interface IAttachmentInfo {
  IItem: any;
  AttachmentFiles: any; //Foreign key
}

export interface IItem {
  AttachmentFiles: any; //Foreign key
  validateUpdateListItem: any;
}

export interface IItemAddResult {
  AttachmentFiles: any; //Foreign key
  validateUpdateListItem: any;
}
