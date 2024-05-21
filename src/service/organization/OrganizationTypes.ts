import { AssetTypes } from "service/asset/AssetTypes";
import { ProjectTypes } from "service/Project/ProjectTypes";
export namespace OrganizationTypes{
    export type Organization = {
        id: number;
        name: string;
        description: string;
        location: string;
        website: string;
        projects: ProjectTypes.Project[];
        userId: number;
        profilePhoto?: AssetTypes.Asset;
    };
}