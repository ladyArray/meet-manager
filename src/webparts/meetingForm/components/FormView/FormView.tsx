import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import {
  getGroupById,
  getGroupType,
  getTopic,
  updateGroup,
} from "../../services/GroupService";

import { ITaxField } from "../../../../utils/taxFields";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Link, useParams } from "react-router-dom";
import {
  TextField,
  MaskedTextField,
  ITextFieldStyles,
} from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useConst } from "@fluentui/react-hooks";
import {
  SelectableOptionMenuItemType,
  DatePicker,
  DayOfWeek,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
  defaultDatePickerStrings,
  themeRulesStandardCreator,
} from "@fluentui/react";
import { SPContext } from "../MeetingForm";
import { toInteger } from "lodash";
import { TaxonomyPicker } from "@pnp/spfx-controls-react";
import { addDays } from "office-ui-fabric-react";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function FormView(): React.ReactElement {
  const today = useConst(new Date(Date.now()));
  const [groupSelected, setGroupSelected] = React.useState<IGroupData>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const { id: groupId } = useParams();

  //choose states
  const [tax, setTax] = React.useState<any>("");
  const [description, setDescription] = React.useState<string>("");
  const [field, setField] = React.useState<any>("");
  const [denomination, setDenomination] = React.useState<string>("");

  const [sectorAssociated, setSectorAssociated] = React.useState<any>("");
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

  const [completionDate, setCompletionDate] = React.useState<Date | undefined>(
    new Date()
  );

  const context = React.useContext(SPContext);

  React.useEffect(() => {
    const getGroup = async () => {
      const groupToEdit: IGroupData = await getGroupById(toInteger(groupId));

      setGroupSelected(groupToEdit);
    };

    getGroup()
      .catch((error) => {
        setError("Error trayendo los datos");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [groupId]);

  const optionsSectorAssociated: IDropdownOption<any>[] = [
    { key: "Aereo", text: "Aereo" },
    { key: "Maritimo", text: "Maritimo" },
    { key: "Terrestre", text: "Terrestre" },
  ];

  const optionsGroupType: IDropdownOption<any>[] = [
    { key: "Grupo Ocasional", text: "Grupo Ocasional" },
    { key: "Grupo Temporal", text: "Grupo Temporal" },
    { key: "Grupo Estable", text: "Grupo Estable" },
  ];

  const optionsTopic: any[] = [
    {
      key: "TeamBuilding",
      text: "TeamBuilding",
    },
    {
      key: "Informativa",
      text: "Informativa",
    },
    {
      key: "Ejecutiva",
      text: "Ejecutiva",
    },
  ];

  const onChooseSectorAssociated = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const sectorAssociated = item;
    setSectorAssociated(sectorAssociated);
  };

  const onChooseDenomination = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const denomination = e.target.value; //input
    setDenomination(denomination);
  };

  const onChooseDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const description = e.target.value; //input
    setDescription(description);
  };

  const onSelectDate = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const tax = item;
    setTax(tax);
  };

  const onChooseState = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const tax = item;
    setTax(tax);
  };

  const onChooseType = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const tax = item;
    setTax(tax);
  };

  const onChooseTopic = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const tax = item;
    setTax(tax);
  };

  function onChooseTaxPicker(terms: ITaxField) {
    const tax = terms;
    setTax(tax);
  }

  function handleEdit() {
    alert("Elemento editado");
  }

  console.log(loading, groupSelected);
  if (loading) {
    return <>cargando</>;
  }
  if (error) {
    return <>{error}</>;
  }
  return (
    <>
      <section>
        <h2>Editar Grupo</h2>

        <form>
          <Stack horizontal horizontalAlign={"end"} {...columnProps}>
            <Link to="/">
              <PrimaryButton
                style={{ maxWidth: "100px" }}
                text="Volver al listado"
                allowDisabledFocus
              />
            </Link>
          </Stack>

          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <Dropdown
                placeholder={groupSelected.SectorAssociated}
                label="Sector Asociado"
                options={optionsSectorAssociated}
                styles={dropdownStyles}
                onChange={onChooseSectorAssociated}
              />
              <p>{groupSelected.SectorAssociated}</p>

              <TextField
                placeholder={groupSelected.Denomination}
                label="Denominación"
                onChange={onChooseDenomination}
              />

              <TextField
                placeholder={groupSelected.Description}
                label="Descripción"
                multiline
                rows={3}
                onChange={onChooseDescription}
              />

              <DatePicker
                placeholder={groupSelected.CompletionDate}
                label="Fecha de Finalización"
                firstDayOfWeek={firstDayOfWeek}
                ariaLabel="Select a date"
                strings={defaultDatePickerStrings}
                onSelectDate={
                  setCompletionDate as (date: Date | null | undefined) => void
                }
              />
            </Stack>

            <Stack {...columnProps}>
              <Toggle
                label="Estado"
                defaultChecked
                onText="Abierto"
                offText="Cerrado"
                onChange={() => onChooseState}
              />

              <Dropdown
                placeholder={groupSelected.Type}
                label="Tipo de Grupo"
                options={optionsGroupType}
                styles={dropdownStyles}
                onChange={onChooseType}
              />

              <Dropdown
                placeholder={groupSelected.Topic}
                label="Temática"
                options={optionsTopic}
                styles={dropdownStyles}
                onChange={onChooseTopic}
              />

              {/* <TaxonomyPicker
                allowMultipleSelections={true}
                // initialValues={null}
                termsetNameOrID="Ambito"
                panelTitle="Selecciona un ambito"
                label="Ambito"
                //onChange={onChooseTaxPicker}
                context={context}
                isTermSetSelectable={false}
              />
              <TaxonomyPicker
                allowMultipleSelections={false}
                termsetNameOrID="Pais"
                panelTitle="Selecciona un país"
                label="Pais"
                //onChange={onChooseTaxPicker}
                context={context}
                isTermSetSelectable={false}
              />
              <TaxonomyPicker
                allowMultipleSelections={false}
                termsetNameOrID="Ciudad"
                panelTitle="Selecciona una Ciudad"
                label="Ciudad"
                //onChange={onChooseTaxPicker}
                context={context}
                isTermSetSelectable={false}
              /> */}
              <PrimaryButton
                style={{ maxWidth: "100px" }}
                text="Modificar Datos"
                onClick={() => handleEdit()}
                allowDisabledFocus
              />
            </Stack>
          </Stack>
        </form>
      </section>
    </>
  );
}
export default FormView;
