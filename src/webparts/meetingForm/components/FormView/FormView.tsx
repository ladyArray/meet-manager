import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import { getGroupById } from "../../services/GroupService";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";

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

  const optionsSector: IDropdownOption[] = [
    {
      key: "Header1",
      text: "Sector Asociado",
      itemType: DropdownMenuItemType.Header,
    },
    { key: "A", text: "Option A" },
  ];
  const optionsGroupType: IDropdownOption[] = [
    {
      key: "Header1",
      text: "Tipo de Grupo",
      itemType: DropdownMenuItemType.Header,
    },
    { key: "A", text: "Option A" },
  ];
  const optionsTematica: any[] = [
    { key: "Header1", text: "Tematica", itemType: DropdownMenuItemType.Header },
    { key: "A", text: "Option A" },
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
                placeholder={groupSelected.Description}
                label="Sector"
                options={optionsSector}
                styles={dropdownStyles}
              />
              {/* <p>{groupSelected.SectorAsociado}</p> */}
              {/* <TextField placeholder={groupSelected.} label="Denominación" /> */}
              {/* <TextField placeholder={groupSelected.} label="Descripción" multiline rows={3} /> */}

              <DatePicker
                placeholder="" //{.CompletionDate}
                label="Fecha de Finalización"
                firstDayOfWeek={firstDayOfWeek}
                ariaLabel="Select a date"
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
              />
            </Stack>

            <Stack {...columnProps}>
              <Toggle
                label="Estado"
                defaultChecked
                onText="Abierto"
                offText="Cerrado"
                onChange={() => alert("Cambio de estado a {.State}")}
              />

              <Dropdown
                placeholder="" //{groupSelected.Type}
                options={optionsGroupType}
                styles={dropdownStyles}
              />

              <Dropdown
                placeholder="" //{groupSelected.Field}
                label="Temática"
                options={optionsTematica}
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
