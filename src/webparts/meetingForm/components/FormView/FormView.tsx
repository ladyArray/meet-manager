import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import { getGroupById } from "../../services/GroupService";

import { updateGroup } from "../../services/GroupService";
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
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);
  const [groupSelected, setGroupSelected] = React.useState<IGroupData>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const { id: groupId } = useParams();

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

  const onDropdownChange = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
      setFirstDayOfWeek(option.key as number);
    },
    []
  );

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
    { key: "Informativa", text: "Informativa" },
    { key: "Ejecutiva", text: "Ejecutiva" },
  ];

  function onChooseTax(terms: ITaxField) {
    console.log("Terms", terms);
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
              />
              <p>{groupSelected.SectorAssociated}</p>

              <TextField
                placeholder={groupSelected.Denomination}
                label="Denominación"
              />

              <TextField
                placeholder={groupSelected.Description}
                label="Descripción"
                multiline
                rows={3}
              />

              <DatePicker
                placeholder={groupSelected.CompletionDate}
                label="Fecha de Finalización"
                firstDayOfWeek={firstDayOfWeek}
                ariaLabel="Select a date"
                strings={defaultDatePickerStrings}
              />
            </Stack>

            <Stack {...columnProps}>
              <Toggle
                label="Estado"
                defaultChecked
                onText="Abierto"
                offText="Cerrado"
                onChange={() =>
                  alert(`Cambio de estado a  ${groupSelected.State}`)
                }
              />

              <Dropdown
                placeholder={groupSelected.Type}
                label="Tipo de Grupo"
                options={optionsGroupType}
                styles={dropdownStyles}
              />

              <Dropdown
                placeholder={groupSelected.Field.term}
                label="Temática"
                options={optionsTopic}
                styles={dropdownStyles}
              />

              {/* <TaxonomyPicker allowMultipleSelections={true}
                        // initialValues={null}
                        termsetNameOrID="Ambito"
                        panelTitle="Selecciona un ambito"
                        label="Ambito"
                        onChange={onChooseTax}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
              {/* <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
              {/* <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Ciudad"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
              {/* <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => handleEdit()} allowDisabledFocus /> */}
            </Stack>
          </Stack>
        </form>
      </section>
    </>
  );
}
export default FormView;
