import * as React from "react";
import { getAllGroups } from "../../services/GroupService";
import { IGroupData } from "../../models/IGroupData";

import {
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from "@fluentui/react/lib/Styling";
import { Item } from "@pnp/sp/items";

//const theme: ITheme = getTheme();
//const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    //getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: "border-box",
      borderBottom: `1px solid`,
      display: "flex",
      selectors: {},
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: "hidden",
    flexGrow: 1,
  },
  itemName: [
    {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  ],
  itemIndex: {
    marginBottom: 10,
  },
});

function GroupsView(): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroupData[]>([]);

  React.useEffect(() => {
    getAllGroups()
      .then((groups: any) => {
        setGroups(groups);
      })
      .catch(console.error);
  }, []);

  function parseDescription(Description: string) {
    const find = "<[^<>]+>";
    const re = new RegExp(find, "g");
    const newDescription = Description.replace(re, "");

    return newDescription;
  }

  return (
    <>
      <section>
        <h1>Listado de grupos</h1>
        {groups.map((g: any) => (
          <div
            className={classNames.itemCell}
            data-is-focusable={true}
            key={g.id}
          >
            {console.log(g)}
            <div className={classNames.itemContent}>
              <div className={classNames.itemName}>{g.Denomination}</div>
              <div className={classNames.itemName}>
                {g.Topic}, {g.Type}
              </div>
              <div className={classNames.itemName}>{g.SectorAssociated}</div>
              <div className={classNames.itemIndex}>
                {g.CreationDate} - {g.CompletionDate}
              </div>

              <div className={classNames.itemName}> {g.newDescription}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
export default GroupsView;

/** <div className={classNames.itemIndex}>
              {g.City}, {g.Country}
            </div> */
