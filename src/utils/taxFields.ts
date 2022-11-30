export interface ITaxField {
  guid: string;
  term: string;
}

const getTaxList = (item: any): any => {
  const taxAll: { ID: number; Term: string }[] = item?.TaxCatchAll;
  if (!taxAll) return;
  const taxAllEntries = taxAll.map(({ ID, Term }) => [ID, Term]);
  return Object.fromEntries(taxAllEntries);
};

export const getTaxField = (item: any, key: string): ITaxField => {
  const taxList = getTaxList(item);
  const { WssId, TermGuid } = item[key];
  return { guid: TermGuid, term: taxList[WssId] };
};

export const getMultiTaxField = (item: any, key: string): ITaxField[] => {
  const taxList = getTaxList(item);

  const multiTaxFieldData: { WssId: number; TermGuid: string }[] = item[key];
  return multiTaxFieldData.map(({ WssId, TermGuid }) => ({
    guid: TermGuid,
    term: taxList[WssId],
  }));
};

export interface IPickerTerm {
  name: string;
  key: string;
  path: string;
  TermSet: string;
  termsetName?: string;
}
