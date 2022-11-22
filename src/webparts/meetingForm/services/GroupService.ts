import { getSP } from "../../../pnpjsConfig";
//import { Field, Fields } from "@pnp/sp/fields/types";
//import { IMeetingFormProps } from "../components/IMeetingFormProps";
import { IItem, IItemAddResult, Item } from "@pnp/sp/items";

import { IGroupData } from "../models/IGroupData";
import { IAttachmentInfo } from "../models/IAttachmentInfo";
import { getTaxField, getMultiTaxField } from "../../../utils/taxFields";

const LIST_ID = "a66f450c-4326-43b8-9fdf-9bdf47e0b820";

const getAllGroups = async (): Promise<IGroupData[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")();

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
      Field: getMultiTaxField(item, "AmbitoGrupo"),
      Country: getTaxField(item, "PaisGrupo"),
      City: getTaxField(item, "CiudadGrupo"),
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
  //esto no
  const result = await getSP().web.lists.getById(LIST_ID).items.add({});
  return result;
};

const getGroupById = async (groupId: number): Promise<IGroupData> => {
  //esto esta bien
  console.log(groupId);
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.getById(groupId)
    .select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")();
  console.log(result);
  const groupById: IGroupData = {
    ID: result.IDGrupo,
    Code: result.CodigoGrupo,
    SectorAssociated: result.SectorAsociado,
    Denomination: result.DenominacionGrupo,
    Description: result.DescripcionGrupo,
    CreationDate: new Date(result.FechaCreacionGrupo).toLocaleDateString(
      "es-ES"
    ),
    CompletionDate: new Date(result.FechaFinalizacionGrupo).toLocaleDateString(
      "es-ES"
    ),
    State: result.EstadoGrupo,
    Type: result.TipoGrupo,
    Topic: result.TematicaGrupo,
    Field: getMultiTaxField(result, "AmbitoGrupo"),
    Country: getTaxField(result, "PaisGrupo"),
    City: getTaxField(result, "CiudadGrupo"),
  };

  return groupById;
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
