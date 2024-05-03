export namespace AssetTypes {
  export interface Asset {
    id: number | null;
    assetFileName: string;
    assetContentType: string;
    assetFileSize: number;
    assetFileUpdatedAt: Date;
    assetableId: number;
    assetableType: string;
    s3Url: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
}
