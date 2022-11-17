import { getSP } from "../../../pnpjsConfig";
import { Field, Fields } from "@pnp/sp/fields/types";
import { IMeetManagerProps } from "../IMeetManagerProps";
import { IItem, IItemAddResult, Item } from "@pnp/sp/items";
import { IGroupData } from "../models/IGroupData";
import { IAttachmentInfo } from "../models/IAttachmentInfo";

const LIST_ID = "a66f450c-4326-43b8-9fdf-9bdf47e0b820";

const getAllGroups = async (): Promise<IGroupData[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("*")
    .expand()();
  //console.log(groups);
  return result.map((item) => {
    return {
      ID: item.IDGrupo,
      Code: item.CodigoGrupo,
      SectorAssociated: item.SectorAsociado,
      Denomination: item.DenominacionGrupo,
      Description: item.DescripcionGrupo,
      CreationDate: new Date(item.FechaCreacionGrupo).toLocaleDateString(
        "es-ES"
      ),
      CompletionDate: new Date(item.FechaFinalizacionGrupo).toLocaleDateString(
        "es-ES"
      ),
      State: item.EstadoGrupo,
      Type: item.TipoGrupo,
      Topic: item.TematicaGrupo,
      Field: item.AmbitoGrupo,
      Country: item.PaisGrupo,
      City: item.CiudadGrupo,
    };
  });
};

const getGroupInfo = (GroupID: number) => async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("*")
    .getById(GroupID)
    .expand()();
  return result;
};

const getAttachedFilesGroup =
  (GroupID: number) => async (): Promise<IAttachmentInfo[]> => {
    const result = await getSP()
      .web.lists.getById(LIST_ID)
      .items.getById(GroupID)
      // .attachmentFiles()
      .expand()();
    return result;
  };

const getTopics = () => async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("TematicaGrupo")
    .select("Choices")();

  return result;
};

const getGroupTypes = () => async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("TipoGrupo")
    .select("Choices")();

  return result;
};

const createGroup = () => async (): Promise<IItemAddResult> => {
  const result = await getSP().web.lists.getById(LIST_ID).items.add({});
  return result;
};

const getGroupById = (GroupID: number) => (): IItem => {
  const result = getSP().web.lists.getById(LIST_ID).items.getById(GroupID);
  return result;
};

// const updateGroup =
//   (Group: IGroupData, newUpdatedData: any[]) =>
//   async (): Promise<IItemAddResult> => {
//     const ListItem = getGroupById(Group.ID);
//     const result = await ListItem.validateUpdateListItem(newUpdatedData);

//     // if (error.length >0){

//     // }
//     return result;
//   };
//, newUpdatedData: any[]

const updateGroup = (Group: IGroupData) => async () => {
  const items: any[] = await getSP()
    .web.lists.getByTitle("")
    .items.top(1)
    .filter("Title eq 'A Title'")();

  if (items.length > 0) {
    const result = await getSP()
      .web.lists.getByTitle("")
      .items.getById(items[0].Id)
      .update({
        IDGrupo: Group.ID,
        CodigoGrupo: Group.Code,
        DenominacionGrupo: Group.Denomination,
        FechaCreacionGrupo: Group.CreationDate,
        FechaFinalizacionGrupo: Group.CompletionDate,
      });

    return result;
  }
};

export {
  getAllGroups,
  getGroupInfo,
  getGroupById,
  updateGroup,
  createGroup,
  getAttachedFilesGroup,
  getGroupTypes,
  getTopics,
};
