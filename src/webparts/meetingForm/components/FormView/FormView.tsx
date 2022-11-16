import * as React from "react";

import GroupsView from "../GroupsView/GroupsView";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import {
  updateGroup,
  createGroup,
  getAllGroups,
} from "../../services/GroupService";

function FormView(): React.ReactElement {
  // const field: IFieldAddResult = await sp.web.fields.addText("My Field", {
  //   MaxLength: 255,
  //   Group: "",
  // });

  // const field = await sp.web.fields.addDateTime("My Field", {
  //   DisplayFormat: DateTimeFieldFormatType.DateOnly,
  //   DateTimeCalendarType: CalendarType.Gregorian,
  //   FriendlyDisplayFormat: DateTimeFieldFriendlyFormatType.Disabled,
  //   Group: "My Group",
  // });

  return (
    <>
      <form />
    </>
  );
}
export default FormView;
